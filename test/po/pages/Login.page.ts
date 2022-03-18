import { Page, Locator } from "@playwright/test";
import { BasePage } from "./Base.page";
import { TEST_USERS, BASE_URL } from "../../config";
import { Logger } from "../../logger/logger";
const logger = new Logger("Global Pre-Hook");

export class LoginPage extends BasePage {
  readonly url: string;

  readonly emailField: Locator;

  readonly passwordField: Locator;

  readonly loginButton: Locator;

  readonly errorMessage: Locator;

  readonly forgotPasswordLink: Locator;

  readonly forgotEmailInput: Locator;

  readonly resetPasswordButton: Locator;

  readonly notificationBody: Locator;

  constructor(page: Page, url = "/signin") {
    super(page);
    this.url = url;
    this.emailField = this.page.locator("#sign-in-username");
    this.passwordField = this.page.locator("#sign-in-password");
    this.loginButton = this.page.locator("[data-test-id='button-login']");
    this.errorMessage = this.page.locator("[data-test-id='sign-in-submit-errors']");
    this.forgotPasswordLink = this.page.locator("span", { hasText: "Forgot Password?" });
    this.forgotEmailInput = this.page.locator("#forgot-password-email-input");
    this.resetPasswordButton = this.page.locator("[data-test-id='button-forgot-password']");
    this.notificationBody = this.page.locator("[data-test-id='register-notification-body']");
  }

  async login(obj: { email: string; password: string } = TEST_USERS.MAIN): Promise<void> {
    await this.emailField.type(obj.email);
    await this.passwordField.type(obj.password);
    await this.loginButton.click();
    await this.page.waitForURL(/portfolio/, {
      waitUntil: "commit",
    });
  }

  async goto() {
    await super.goto(this.url);
  }

  async globalGoto(): Promise<void> {
    await this.setHTTPHeaders();
    await this.page.goto(`${BASE_URL}/signin`);
  }

  async loginAsUser(): Promise<void> {
    try {
      await this.globalGoto();
      await this.login();
      logger.info("customerdemo+epam@osl.com is logged in");
    } catch (e) {
      throw new Error(`Was not able to login using customerdemo+epam@osl.com creds, ${e}`);
    }
  }

  async loginAsTrader(): Promise<void> {
    try {
      await this.globalGoto();
      await this.login(TEST_USERS.SPECIFIC);
      logger.info("andy.wong@osl.com is logged in");
    } catch (e) {
      throw new Error(`Was not able to login using andy.wong@osl.com creds, ${e}`);
    }
  }
}
