import { SUCCESSFUL_REGISTRATION_MESSAGE, EXISTING_EMAIL_ERROR, registrationMap, USER_DATA } from "../config";
import { test } from "../po/pages";
import { expectElementToHaveText, expectElementVisibility, useState } from "../utils";

test.describe.parallel("Registration Page", () => {
  useState("clean");

  test("should open registration form by clicking header's button @smoke @jira(XRT-288)", async ({
    landingPage,
    registrationPage,
  }) => {
    await landingPage.goto();
    await landingPage.header.registerButton.click();
    await registrationPage.expectUrlContains(registrationPage.url);
  });

  test("should display registration form @smoke @jira(XRT-289)", async ({ registrationPage }) => {
    await registrationPage.goto();
    await expectElementVisibility(registrationPage.registrationForm, true);
    await expectElementVisibility(registrationPage.emailField, true);
    await expectElementVisibility(registrationPage.phoneNumberField, true);
    await expectElementVisibility(registrationPage.countriesList.rootEl, true);
    await expectElementVisibility(registrationPage.acceptanceCheckbox, true);
    await expectElementVisibility(registrationPage.registerButton, true);
  });

  test("should register a user with resending email @criticalPath @jira(XRT-291) @jira(XRT-294)", async ({
    registrationPage,
  }) => {
    await registrationPage.mockRegistrationData();
    await registrationPage.emailField.fill(USER_DATA.email);
    await registrationPage.phoneNumberField.fill(USER_DATA.phoneNumber);
    await registrationPage.selectRandomCountry();
    await registrationPage.acceptanceCheckbox.click();
    await registrationPage.registerButton.click();
    await expectElementVisibility(registrationPage.notificationHeader, true);
    await expectElementToHaveText(registrationPage.notificationHeader, SUCCESSFUL_REGISTRATION_MESSAGE);

    await registrationPage.resendButton.click();
    await expectElementToHaveText(registrationPage.notificationHeader, /Resend confirmation/);
  });

  test("should not register with already submited email @criticalPath @jira(XRT-293)", async ({ registrationPage }) => {
    await registrationPage.goto();
    await registrationPage.submitForm(USER_DATA);
    await expectElementVisibility(registrationPage.errorMessage, true);
    await expectElementToHaveText(registrationPage.errorMessage, EXISTING_EMAIL_ERROR);
  });

  test("should not register with already registered email @criticalPath @jira(XRT-297)", async ({
    registrationPage,
  }) => {
    await registrationPage.emulateRegistrationError();
    await registrationPage.submitForm(USER_DATA);
    await expectElementVisibility(registrationPage.errorMessage, true);
    await expectElementToHaveText(
      registrationPage.errorMessage,
      /This email address has already been registered and activated./
    );
  });

  registrationMap.forEach(({ name, email, phoneNumber, country, accept }) => {
    test(`${name} @criticalPath @jira(XRT-290)`, async ({ registrationPage }) => {
      await registrationPage.goto();
      await registrationPage.submitForm({
        email,
        phoneNumber,
        country,
        accept,
      });
      await registrationPage.registerButton.click();
      await expectElementVisibility(registrationPage.errorMessage, true);
    });
  });

  test("should disable the possibility to register a new user @extended @jira(XRT-525)", async ({
    landingPage,
    registrationPage,
  }) => {
    await landingPage.goto();
    await expectElementVisibility(landingPage.header.registerButton, true);

    await registrationPage.hideFeatures(false);
    await landingPage.goto();
    await expectElementVisibility(landingPage.header.registerButton, false);
  });

  test("should turn on/off username field @extended @jira(XRT-526)", async ({ registrationPage }) => {
    await registrationPage.hideFeatures(true, false);
    await registrationPage.goto();
    await expectElementVisibility(registrationPage.usernameField, false);

    await registrationPage.hideFeatures(true, true);
    await registrationPage.goto();
    await expectElementVisibility(registrationPage.usernameField, true);
  });
});
