// playwright-dev-page.ts
import { Page, Locator } from "@playwright/test";
import { BasePage } from "./Base.page";
import { Element } from "../components/basic/element";
import { Field } from "../components/basic/field";

export class LoginPage extends BasePage {
  readonly url: string;

  readonly emailField: Field;

  readonly passwordField: Field;

  readonly loginButton: Locator;

  readonly someButton: Element;

  constructor(page: Page, url = "/signin") {
    super(page);
    this.url = url;
    this.emailField = new Field(this.page.locator("#email"));
    this.passwordField = new Field(this.page.locator("#password"));
    this.loginButton = this.page.locator("button[type='submit']");
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailField.type(email);
    await this.passwordField.type(password);
    await this.loginButton.click();
  }

  async goto() {
    await super.goto(this.url);
  }
}
