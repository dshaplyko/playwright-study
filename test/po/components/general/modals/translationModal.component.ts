import { Locator, Page } from "@playwright/test";
import { Dropdown } from "../../basic/dropdown";
import { Modal } from "./modal.component";

export class TranslationModal extends Modal {
  readonly website: Dropdown;

  readonly keyInput: Locator;

  readonly categoryInput: Locator;

  readonly descriptionInput: Locator;

  readonly defaultValueInput: Locator;

  readonly saveButton: Locator;

  readonly englishKey: Locator;

  constructor(locator: Locator, page: Page) {
    super(locator, page);
    this.website = new Dropdown(this.rootEl.locator("#create-translation-platform"), this.page);
    this.keyInput = this.rootEl.locator("input#create-key");
    this.categoryInput = this.rootEl.locator("input#create-category");
    this.descriptionInput = this.rootEl.locator("input#create-description");
    this.defaultValueInput = this.rootEl.locator("input#create-defaultValue");
    this.saveButton = this.rootEl.locator("button", {
      hasText: "Save",
    });
    this.englishKey = this.rootEl.locator("#edit-translation-en_US");
  }
}
