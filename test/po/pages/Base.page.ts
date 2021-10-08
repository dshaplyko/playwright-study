// playwright-dev-page.ts
import { Page } from "@playwright/test";
import Header from "../components/header.component";
import LeftPanel from "../components/leftPanel.component";

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get header() {
    return new Header(this.page.locator("[ng-controller='TradeAsSideMenuController as sidemenu']"));
  }

  get leftPanel() {
    return new LeftPanel(this.page, ".side-bar");
  }

  async goto(url: string) {
    await this.page.goto(url);
  }
}
