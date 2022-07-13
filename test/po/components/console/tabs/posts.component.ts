import { Locator, Page } from "@playwright/test";
import { Dropdown } from "../../basic/dropdown";
import { Form } from "../form.component";
import { Main } from "./main.component";

export class Posts extends Main {
  readonly postsFilter: Dropdown;

  readonly editForm: Form;

  constructor(locator: Locator, page: Page) {
    super(locator, page);
    this.postsFilter = new Dropdown(this.rootEl.locator("[data-test-id='postTypes-select']"), this.page);
    this.editForm = new Form(this.rootEl.locator("form"), this.page);
  }
}
