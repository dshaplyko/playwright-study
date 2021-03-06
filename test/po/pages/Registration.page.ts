import { Page, Locator } from "@playwright/test";
import { ALREADY_REGISTERED_EMAIL, SUCCESS_REGISTRATION, URLs } from "../../config";
import { Dropdown } from "../components/basic/dropdown";
import { BasePage } from "./Base.page";
import { Logger } from "../../logger/logger";
const logger = new Logger("Registration Page");

type FORM_DATA = {
  email: string;
  phoneNumber: string;
  country: string;
  accept: boolean;
};
export class RegistrationPage extends BasePage {
  readonly url: string;

  readonly registrationForm: Locator;

  readonly emailField: Locator;

  readonly phoneNumberField: Locator;

  readonly usernameField: Locator;

  readonly countriesList: Dropdown;

  readonly registerButton: Locator;

  readonly acceptanceCheckbox: Locator;

  readonly notificationHeader: Locator;

  readonly resendButton: Locator;

  readonly errorMessage: Locator;

  constructor(page: Page, url = "/register") {
    super(page);
    this.url = url;
    this.registrationForm = this.page.locator("[data-test-id='register-form-container']");
    this.emailField = this.registrationForm.locator("#register-form-email");
    this.phoneNumberField = this.registrationForm.locator("#register-form-phoneNumber");
    this.usernameField = this.registrationForm.locator("#register-form-userName");
    this.countriesList = new Dropdown(this.registrationForm.locator("#register-form-countries"), this.page);
    this.registerButton = this.registrationForm.locator("[data-test-id='register-button']");
    this.acceptanceCheckbox = this.registrationForm.locator("input[type='checkbox']");
    this.notificationHeader = this.page.locator("[data-test-id='register-notification-header']");
    this.resendButton = this.page.locator("[data-test-id='register-notification-resend-button']");
    this.errorMessage = this.registrationForm.locator("[data-test-id='register-form-error']:nth-child(1)");
  }

  async submitForm({ email, phoneNumber, country, accept }: FORM_DATA): Promise<void> {
    if (email) await this.emailField.fill(email);
    if (phoneNumber) await this.phoneNumberField.fill(phoneNumber);
    if (country) await this.countriesList.clickByText(country);
    if (accept) await this.acceptanceCheckbox.click();
    await this.registerButton.click();
  }

  async goto() {
    await super.goto(this.url);
  }

  async mockRegistrationData(): Promise<void> {
    await this.api.mockData(SUCCESS_REGISTRATION, URLs.REGISTER);
    await this.goto();
  }

  async emulateRegistrationError(): Promise<void> {
    await this.api.emulateNetworkError(ALREADY_REGISTERED_EMAIL, URLs.REGISTER);
    await this.goto();
  }

  async selectRandomCountry(): Promise<string> {
    const country = await this.countriesList.chooseAndRememberRandomOption();
    logger.info(`Chosen Country is ${country}`);
    return country;
  }

  async hideFeatures(page: boolean, username = false): Promise<void> {
    await this.api.mockConfig({
      features: {
        registration: {
          enabled: page,
          username: username,
        },
      },
    });
  }
}
