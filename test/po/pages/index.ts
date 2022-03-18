import { test as baseTest, Page } from "@playwright/test";
import { LoginPage } from "./Login.page";
import { PortfolioPage } from "./Portfolio.page";
import { FundsPage } from "./Funds.page";
import { ActivitiesPage } from "./Activities.page";
import { LandingPage } from "./Landing.page";
import { ContactsPage } from "./Contacts.page";
import { BrokeragePage } from "./Brokerage.page";
import { SettingsPage } from "./Settings.page";
import { RegistrationPage } from "./Registration.page";
import { ReportsPage } from "./Reports.page";
import { Api } from "../api/api";

export const test = baseTest.extend<{
  api: Api;
  activitiesPage: ActivitiesPage;
  fundsPage: FundsPage;
  loginPage: LoginPage;
  portfolioPage: PortfolioPage;
  landingPage: LandingPage;
  contactsPage: ContactsPage;
  brokeragePage: BrokeragePage;
  settingsPage: SettingsPage;
  registrationPage: RegistrationPage;
  reportsPage: ReportsPage;
}>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  portfolioPage: async ({ page }, use) => {
    await use(new PortfolioPage(page));
  },
  activitiesPage: async ({ page }, use) => {
    await use(new ActivitiesPage(page));
  },
  fundsPage: async ({ page }, use) => {
    await use(new FundsPage(page));
  },
  landingPage: async ({ page }, use) => {
    await use(new LandingPage(page));
  },
  contactsPage: async ({ page }, use) => {
    await use(new ContactsPage(page));
  },
  brokeragePage: async ({ page }, use) => {
    await use(new BrokeragePage(page));
  },
  settingsPage: async ({ page }, use) => {
    await use(new SettingsPage(page));
  },
  registrationPage: async ({ page }, use) => {
    await use(new RegistrationPage(page));
  },
  reportsPage: async ({ page }, use) => {
    await use(new ReportsPage(page));
  },
  api: async ({ page }, use) => {
    await use(new Api(page));
  },
});

export class Application {
  readonly loginPage: LoginPage;

  readonly fundsPage: FundsPage;

  readonly api: Api;

  readonly portfolioPage: PortfolioPage;

  readonly activitiesPage: ActivitiesPage;

  readonly contactsPage: ContactsPage;

  readonly brokeragePage: BrokeragePage;

  readonly settingsPage: SettingsPage;

  readonly registrationPage: RegistrationPage;

  readonly reportsPage: ReportsPage;

  constructor(page: Page) {
    this.loginPage = new LoginPage(page);
    this.api = new Api(page);
    this.portfolioPage = new PortfolioPage(page);
    this.fundsPage = new FundsPage(page);
    this.activitiesPage = new ActivitiesPage(page);
    this.contactsPage = new ContactsPage(page);
    this.brokeragePage = new BrokeragePage(page);
    this.settingsPage = new SettingsPage(page);
    this.registrationPage = new RegistrationPage(page);
    this.reportsPage = new ReportsPage(page);
  }
}
