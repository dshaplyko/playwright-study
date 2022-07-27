import { Locator, Page } from "@playwright/test";
import { Form } from "./form.component";
import { Dropdown } from "../../basic/dropdown";
import { Element } from "../../basic/element";
import { TransactionTypes } from "../../../../config";
import { getValueAsNumber } from "../../../../utils";
export class TransferFunds extends Form {
  readonly page: Page;

  readonly primaryBalance: Locator;

  readonly exchangeBalance: Locator;

  readonly zmBalance: Locator;

  readonly brokerageBalance: Locator;

  readonly balances: Locator;

  readonly buckets: Locator;

  readonly hints: Locator;

  readonly primaryHint: Element;

  readonly exchangeHint: Element;

  readonly brokerageHint: Element;

  readonly transferFrom: Dropdown;

  readonly transferTo: Dropdown;

  readonly transferFundsButton: Locator;

  readonly successMessage: Locator;

  readonly currency: Locator;

  readonly doneButton: Locator;

  constructor(locator: Locator, page: Page) {
    super(locator);
    this.page = page;
    this.balances = this.rootEl.locator("span[data-test-id='funds-transfer-funds-balance']");
    this.buckets = this.rootEl.locator("span.MuiTypography-H14");
    this.primaryBalance = this.balances.nth(0);
    this.exchangeBalance = this.balances.nth(1);
    this.zmBalance = this.balances.nth(1);
    this.brokerageBalance = this.balances.nth(2);
    this.hints = this.rootEl.locator("button>svg[data-testid='InfoOutlinedIcon']");
    this.primaryHint = new Element(this.hints.nth(0));
    this.exchangeHint = new Element(this.hints.nth(1));
    this.brokerageHint = new Element(this.hints.nth(2));
    this.transferFrom = new Dropdown(
      this.rootEl.locator("[data-test-id='funds-transfer-funds-form-from-account']"),
      this.page
    );
    this.transferTo = new Dropdown(
      this.rootEl.locator("[data-test-id='funds-transfer-funds-form-to-account']"),
      this.page
    );
    this.transferFundsButton = this.rootEl.locator("button[data-test-id='funds-transfer-funds-form-submit-btn']");
    this.successMessage = this.rootEl.locator("div[data-test-id='funds-transfer-funds-form-success-message']");
    this.currency = this.rootEl.locator("span[data-test-id='funds-transfer-funds-form-currency']");
    this.doneButton = this.rootEl.locator("button", {
      hasText: "Done",
    });
  }

  async getBalance(balance: TransactionTypes) {
    let balanceString: string | number;

    switch (balance) {
      case "Primary":
        balanceString = await this.primaryBalance.innerText();
        break;
      case "Exchange":
        balanceString = await this.exchangeBalance.innerText();
        break;
      case "Brokerage":
        balanceString = await this.brokerageBalance.innerText();
        break;
      case "ExtTradeVenue-ZM":
        balanceString = await this.zmBalance.innerText();
        break;
    }
    return getValueAsNumber(balanceString);
  }

  getBucket(index: number): Locator {
    return this.buckets.nth(index - 1);
  }

  async makeTransferFrom(selectedOption: TransactionTypes): Promise<void> {
    await this.transferFrom.clickByText(selectedOption);
  }

  async makeTransferTo(selectedOption: TransactionTypes): Promise<void> {
    await this.transferTo.clickByText(selectedOption);
  }

  async makeTransfer(from: TransactionTypes, to: TransactionTypes, amount: number | "half"): Promise<void> {
    await this.makeTransferFrom(from);
    await this.makeTransferTo(to);
    await this.amountField.typeText(`${amount}`);
    if (amount === "half") await this.choosePercentControl(50);
    await this.transferFundsButton.click();
    await this.doneButton.click();
  }
}
