// playwright-dev-page.ts
import { Page, Locator } from "@playwright/test";
import { BasePage } from "./Base.page";
import { TEST_USER } from "../../config";

export class LoginPage extends BasePage {
  readonly url: string;

  readonly emailField: Locator;

  readonly passwordField: Locator;

  readonly loginButton: Locator;

  constructor(page: Page, url = "/signin") {
    super(page);
    this.url = url;
    this.emailField = this.page.locator("#sign-in-username");
    this.passwordField = this.page.locator("#sign-in-password");
    this.loginButton = this.page.locator("[data-test-id='button-login']");
  }

  async login(email: string = TEST_USER.email, password: string = TEST_USER.password): Promise<void> {
    await this.goto();
    await this.emailField.type(email);
    await this.passwordField.type(password);
    await this.loginButton.click();
    await this.page.waitForURL(/portfolio/, {
      waitUntil: "domcontentloaded",
    });
  }

  async goto() {
    await super.goto(this.url);
  }
}
