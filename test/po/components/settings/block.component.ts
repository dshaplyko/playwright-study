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
    this.addNewButton = this.el.locator("button[data-test-id='add-new-method-button']");
    this.existingKeys = this.el.locator("div[data-test-id*='method-key-']");
    this.saveButton = this.el.locator("button", { hasText: "Save" });
    this.resetSecretButton = this.el.locator("button", { hasText: "Reset Secret" });
    this.deleteButton = this.el.locator("button", { hasText: "Delete" });
    this.apiKey = this.el.locator("[data-test-id*='settings-api-key-displayApiKey']");
    this.secret = this.el.locator("span", { hasText: "Secret" });
    this.accountGroup = this.el.locator("[data-test-id*='settings-api-key-accountGroupUuid']");
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
