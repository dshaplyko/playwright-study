import { test } from "../po/pages";
import { expectElementVisibility, expectElementToHaveText, useState } from "../utils";
import { landingPageFooterMap, landingPageMaintenanceMap, SCHEDULED_MAINTENANCE_MESSAGE } from "../config";

test.describe.parallel("Landing Page @jira(PWU-313)", () => {
  useState("clean");

  test.beforeEach(async ({ landingPage }) => await landingPage.goto());

  test("should render Landing Page for non-authorized users @smoke @jira(XRT-67) @jira(XRT-264) @jira(XRT-266) @jira(XRT-276)", async ({
    landingPage,
  }) => {
    await expectElementVisibility(landingPage.priceTicker, true);
    await expectElementVisibility(landingPage.header.logo, true);
    await expectElementVisibility(landingPage.header.loginButton, true);
    await expectElementVisibility(landingPage.header.registerButton, true);
    await expectElementVisibility(landingPage.header.languageSelector, true);
    await expectElementVisibility(landingPage.orderBook, true);
  });

  test("should turn off Order Book Component on the Landing Page @criticalPath @jira(XRT-277)", async ({
    landingPage,
  }) => {
    await landingPage.disableOrderBook();
    await expectElementVisibility(landingPage.orderBook, false);
  });

  landingPageFooterMap.forEach(({ config, name }) => {
    test(name, async ({ landingPage }) => {
      await landingPage.mockLandingPage(config);
      await expectElementVisibility(landingPage.footer, true);
      await expectElementVisibility(landingPage.getDisclaimer(config.disclaimer), true);
      await expectElementVisibility(landingPage.getFooterLink("about"), config.aboutUs);
      await expectElementVisibility(landingPage.getFooterLink("faq"), config.faq);
      await expectElementVisibility(landingPage.getFooterLink("security"), config.security);
      await expectElementVisibility(landingPage.getFooterLink("privacy"), config.privacy);
      await expectElementVisibility(landingPage.getFooterLink("terms"), config.terms);
      await expectElementVisibility(landingPage.marketInsights, config.marketInsight);
      await expectElementVisibility(landingPage.announcements, config.announcements);
    });
  });

  landingPageMaintenanceMap.forEach(({ name, config, message }) => {
    test(name, async ({ landingPage }) => {
      await landingPage.api.mockFeaturesSiteData(config);
      await landingPage.goto();
      await expectElementVisibility(landingPage.maintenanceBanner, true);
      await expectElementToHaveText(landingPage.maintenanceBanner, message);
    });
  });

  test("should display banner when maintenance is scheduled @extended @jira(XRT-281)", async ({ landingPage }) => {
    await landingPage.mockMaintenancePeriod();
    await expectElementVisibility(landingPage.maintenanceBanner, true);
    await expectElementToHaveText(landingPage.maintenanceBanner, SCHEDULED_MAINTENANCE_MESSAGE);
  });
});
