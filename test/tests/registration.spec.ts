import {
  SUCCESS_REGISTRATION,
  SUCCESSFUL_REGISTRATION_MESSAGE,
  URLs,
  EXISTING_EMAIL_ERROR,
  ALREADY_REGISTERED_EMAIL,
  registrationMap,
  USER_DATA,
} from "../config";
import { test } from "../po/pages";
import { expectElementToHaveText, expectElementVisibility, useState } from "../utils";
import { Logger } from "../logger/logger";
const logger = new Logger("Registration Test Suite");

test.describe.parallel("Registration Page", () => {
  useState("clean");

  test("should open registration form by clicking header's button @smoke @jira(BCTGWEBPWU-752)", async ({
    landingPage,
    registrationPage,
  }) => {
    await landingPage.goto();
    await landingPage.header.registerButton.click();
    await registrationPage.expectUrlContains(registrationPage.url);
  });

  test("should display registration form @smoke @jira(BCTGWEBPWU-753)", async ({ registrationPage }) => {
    await registrationPage.goto();
    await expectElementVisibility(registrationPage.registrationForm, true);
    await expectElementVisibility(registrationPage.emailField, true);
    await expectElementVisibility(registrationPage.phoneNumberField, true);
    await expectElementVisibility(registrationPage.countriesList.el, true);
    await expectElementVisibility(registrationPage.acceptanceCheckbox, true);
    await expectElementVisibility(registrationPage.registerButton, true);
  });

  test("should register a user with resending email @criticalPath @jira(BCTGWEBPWU-759) @jira(BCTGWEBPWU-763)", async ({
    registrationPage,
    api,
  }) => {
    await api.mockData(SUCCESS_REGISTRATION, URLs.REGISTER);
    await registrationPage.goto();
    await registrationPage.emailField.fill(USER_DATA.email);
    await registrationPage.phoneNumberField.fill(USER_DATA.phoneNumber);
    const country = await registrationPage.countriesList.chooseAndRememberRandomOption();
    logger.info(`Chosen Country is ${country}`);

    await registrationPage.acceptanceCheckbox.click();
    await registrationPage.registerButton.click();
    await expectElementVisibility(registrationPage.notificationHeader, true);
    await expectElementToHaveText(registrationPage.notificationHeader, SUCCESSFUL_REGISTRATION_MESSAGE);

    await registrationPage.resendButton.click();
    await expectElementToHaveText(registrationPage.notificationHeader, /Resend confirmation/);
  });

  test("should not register with already submited email @criticalPath @jira(BCTGWEBPWU-761)", async ({
    registrationPage,
  }) => {
    await registrationPage.goto();
    await registrationPage.submitForm(USER_DATA);
    await expectElementVisibility(registrationPage.errorMessage, true);
    await expectElementToHaveText(registrationPage.errorMessage, EXISTING_EMAIL_ERROR);
  });

  test("should not register with already registered email @criticalPath @jira(BCTGWEBPWU-778)", async ({
    registrationPage,
    api,
  }) => {
    await api.emulateNetworkError(ALREADY_REGISTERED_EMAIL, URLs.REGISTER);
    await registrationPage.goto();
    await registrationPage.submitForm(USER_DATA);
    await expectElementVisibility(registrationPage.errorMessage, true);
    await expectElementToHaveText(
      registrationPage.errorMessage,
      /This email address has already been registered and activated./
    );
  });

  registrationMap.forEach(({ name, email, phoneNumber, country, accept }) => {
    test(`${name} @criticalPath @jira(BCTGWEBPWU-754)`, async ({ registrationPage }) => {
      await registrationPage.goto();
      await registrationPage.submitForm({
        email,
        phoneNumber,
        country,
        accept,
      });
      await registrationPage.registerButton.click();
      await expectElementVisibility(registrationPage.errorMessage, true);
      // await expectElementToHaveText(registrationPage.errorMessage, message);
    });
  });
});
