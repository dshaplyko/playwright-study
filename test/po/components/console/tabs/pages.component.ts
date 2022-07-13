import { Locator, Page } from "@playwright/test";
import { Dropdown } from "../../basic/dropdown";
import { Form } from "../form.component";
import { Main } from "./main.component";

export class Pages extends Main {
  readonly editForm: Form;

  readonly languageSelector: Dropdown;

  constructor(locator: Locator, page: Page) {
    super(locator, page);
    this.editForm = new Form(this.rootEl.locator("form"), this.page);
    this.languageSelector = new Dropdown(this.rootEl.locator("#sections-languages-button"), this.page);
  }

  async changeAboutPageTitle(title: string): Promise<void> {
    await this.waitForItems();
    await this.languageSelector.clickByText("English");
    await this.waitForItems();
    await this.selectItemByText("About");
    await this.editForm.titleInput.fill(title);
  }
}
