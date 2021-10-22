import { Page } from "@playwright/test";
import { ActivitiesPage } from "./Activities.page";
import { LoginPage } from "./Login.page";
import { PortfolioPage } from "./Portfolio.page";

export class App {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get activitiesPage(): ActivitiesPage {
    return new ActivitiesPage(this.page);
  }

  get loginPage(): LoginPage {
    return new LoginPage(this.page);
  }

  get portfolioPage(): PortfolioPage {
    return new PortfolioPage(this.page);
  }
}
