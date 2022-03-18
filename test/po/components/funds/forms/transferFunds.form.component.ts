import { Locator, Page } from "@playwright/test";
import { Form } from "./form.component";
import { getValueAsNumber } from "../../../../utils";
import { Dropdown } from "../../basic/dropdown";
import { BALANCE_ENUM } from "../../../../config";

export class TransferFunds extends Form {
  readonly page: Page;

  readonly primaryBalance: Locator;

  readonly exchangeBalance: Locator;

  readonly brokerageBalance: Locator;

  readonly balances: Locator;

  readonly transferFrom: Dropdown;

  readonly transferTo: Dropdown;

  readonly transferFundsButton: Locator;

  readonly successMessage: Locator;

  readonly currency: Locator;

  constructor(locator: Locator, page: Page) {
    super(locator);
    this.page = page;
    this.balances = this.el.locator("span[data-test-id='funds-transfer-funds-balance']");
    this.primaryBalance = this.balances.nth(0);
    this.exchangeBalance = this.balances.nth(1);
    this.brokerageBalance = this.balances.nth(2);
    this.transferFrom = new Dropdown(
      this.el.locator("[data-test-id='funds-transfer-funds-form-from-account']"),
      this.page
    );
    this.transferTo = new Dropdown(this.el.locator("[data-test-id='funds-transfer-funds-form-to-account']"), this.page);
    this.transferFundsButton = this.el.locator("button[data-test-id='funds-transfer-funds-form-submit-btn']");
    this.successMessage = this.el.locator("div[data-test-id='funds-transfer-funds-form-success-message']");
    this.currency = this.el.locator("span[data-test-id='funds-transfer-funds-form-currency']");
  }

  async findNonZeroBalance(): Promise<string> {
    const texts = (await this.balances.allInnerTexts()).map((balance) => getValueAsNumber(balance));
    const nonZeroIndex = texts.findIndex((item) => item > 0);
    return BALANCE_ENUM[nonZeroIndex];
  }

  async chooseTransferTo(selectedOption: string): Promise<string> {
    if (selectedOption === "Primary") {
      await this.transferTo.selectByText("Exchange");
      return "Exchange";
    } else {
      await this.transferTo.selectByText("Primary");
      return "Primary";
    }
  }

  async makeTransferFrom(selectedOption: string): Promise<void> {
    await this.transferFrom.selectByText(selectedOption);
  }
}
