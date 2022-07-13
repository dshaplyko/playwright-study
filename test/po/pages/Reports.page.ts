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
      this.page.locator("div[data-test-id^='reports-container']", { has: this.page.locator("div", { hasText: form }) }),
      this.page
    );
  }

  async goto() {
    await super.goto(this.url);
  }

  async enablePage(option: boolean): Promise<void> {
    await this.api.mockConfig({
      features: {
        reports: {
          enabled: option,
        },
      },
    });
  }
}
