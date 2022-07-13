import { Locator } from "@playwright/test";
import { Element } from "../basic/element";

export class Block extends Element {
  readonly addNewButton: Locator;

  readonly existingKeys: Locator;

  readonly saveButton: Locator;

  readonly resetSecretButton: Locator;

  readonly deleteButton: Locator;

  readonly apiKey: Locator;

  readonly secret: Locator;

  readonly accountGroup: Locator;

  constructor(locator: Locator) {
    super(locator);
    this.addNewButton = this.rootEl.locator("button[data-test-id='add-new-method-button']");
    this.existingKeys = this.rootEl.locator("div[data-test-id*='method-key-']");
    this.saveButton = this.rootEl.locator("button", { hasText: "Save" });
    this.resetSecretButton = this.rootEl.locator("button", { hasText: "Reset Secret" });
    this.deleteButton = this.rootEl.locator("button", { hasText: "Delete" });
    this.apiKey = this.rootEl.locator("[data-test-id*='settings-api-key-displayApiKey']");
    this.secret = this.rootEl.locator("span", { hasText: "Secret" });
    this.accountGroup = this.rootEl.locator("[data-test-id*='settings-api-key-accountGroupUuid']");
  }

  getExistingKey(index: number): Locator {
    return this.existingKeys.nth(index - 1);
  }

  getExistingKeyHeading(index: number): Locator {
    return this.getExistingKey(index).locator("[data-test-id='method-key-alias']");
  }

  deleteExistingKey(index: number): Promise<void> {
    return this.getExistingKey(index).locator("[data-test-id='method-key-delete-button']").click();
  }
}
