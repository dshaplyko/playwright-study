import { Locator, Page } from "@playwright/test";
import { Checkbox } from "../basic/checkbox";
import { Element } from "../basic/element";
import { Calendar } from "../general/calendar.component";

export class Form extends Element {
  readonly page: Page;

  readonly editForm: Locator;

  readonly saveAsDraftButton: Locator;

  readonly deleteButton: Locator;

  readonly titleInput: Locator;

  readonly contentArea: Locator;

  readonly externalLink: Checkbox;

  readonly cancelButton: Locator;

  readonly urlInput: Locator;

  readonly startDate: Calendar;

  readonly endDate: Calendar;

  constructor(locator: Locator, page: Page) {
    super(locator);
    this.page = page;
    this.titleInput = this.rootEl.locator("#sections-page-title, #post-title");
    this.saveAsDraftButton = this.rootEl.locator("button", { hasText: "Save as draft" });
    this.contentArea = this.rootEl.locator(".jodit-react-container");
    this.externalLink = new Checkbox(this.rootEl.locator("input[type='checkbox']"));
    this.cancelButton = this.rootEl.locator("button", { hasText: "Cancel" });
    this.deleteButton = this.rootEl.locator("button", { hasText: "Delete" });
    this.urlInput = this.rootEl.locator("#sections-page-url");
    this.startDate = new Calendar(
      this.rootEl.locator("div:has(>[data-test-id='form-date-time-input'])").nth(0),
      this.page
    );
    this.endDate = new Calendar(
      this.rootEl.locator("div:has(>[data-test-id='form-date-time-input'])").nth(1),
      this.page
    );
  }
}
