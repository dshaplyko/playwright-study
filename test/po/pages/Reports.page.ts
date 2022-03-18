import { Page } from "@playwright/test";
import { REPORT_FORM } from "../../config";
import { ReportForm } from "../components/reports/report.form.component";
import { BasePage } from "./Base.page";

export class ReportsPage extends BasePage {
  readonly url: string;

  constructor(page: Page, url = "/reports") {
    super(page);
    this.url = url;
  }

  getReportForm(form: REPORT_FORM): ReportForm {
    return new ReportForm(
      this.page.locator("div.css-17h381t", { has: this.page.locator("div", { hasText: form }) }),
      this.page
    );
  }

  async goto() {
    await super.goto(this.url);
  }
}
