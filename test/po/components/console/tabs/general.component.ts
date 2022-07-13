import { Locator, Page } from "@playwright/test";
import { Dropdown } from "../../basic/dropdown";
import { Main } from "./main.component";

export class General extends Main {
  readonly textInputs: Locator;

  readonly titleInput: Locator;

  readonly defaultLanguage: Dropdown;

  constructor(locator: Locator, page: Page) {
    super(locator, page);
    this.textInputs = this.rootEl.locator("textarea[id*='input']");
    this.titleInput = this.rootEl.locator("#title-input");
    this.defaultLanguage = new Dropdown(this.rootEl.locator("#language-select"), this.page);
  }
}
