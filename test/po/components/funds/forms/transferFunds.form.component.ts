import { Locator, Page } from "@playwright/test";
import { Form } from "./form.component";
import { getValueAsNumber } from "../../../../utils";
import { Dropdown } from "../../basic/dropdown";
import { BALANCE_ENUM } from "../../../../config";
import { Element } from "../../basic/element";
import { TransactionTypes } from "../../../../config";
export class TransferFunds extends Form {
  readonly page: Page;

  readonly primaryBalance: Locator;

  readonly exchangeBalance: Locator;

  readonly brokerageBalance: Locator;

  readonly balances: Locator;

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
    this.primaryBalance = this.balances.nth(0);
    this.exchangeBalance = this.balances.nth(1);
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

  async findNonZeroBalance(): Promise<TransactionTypes> {
    const texts = (await this.balances.allInnerTexts()).map((balance) => getValueAsNumber(balance));
    const nonZeroIndex = texts.findIndex((item) => item > 0);
    return BALANCE_ENUM[nonZeroIndex] as TransactionTypes;
  }

  async chooseTransferTo(selectedOption: string): Promise<TransactionTypes> {
    if (selectedOption === "Primary") {
      await this.transferTo.clickByText("Exchange");
      return "Exchange" as TransactionTypes;
    } else {
      await this.transferTo.clickByText("Primary");
      return "Primary" as TransactionTypes;
    }
  }

  async makeTransferFrom(selectedOption: TransactionTypes): Promise<void> {
    await this.transferFrom.clickByText(selectedOption);
  }

  async makeTransferTo(selectedOption: TransactionTypes): Promise<void> {
    await this.transferTo.clickByText(selectedOption);
  }

  async makeTransfer(from: TransactionTypes, to: TransactionTypes, amount = 50): Promise<void> {
    await this.makeTransferFrom(from);
    await this.makeTransferTo(to);
    await this.choosePercentControl(amount);
    await this.transferFundsButton.click();
    await this.doneButton.click();
  }

  async executeTransferFromNonZeroBalance(): Promise<{
    balanceFrom: TransactionTypes;
    balanceTo: TransactionTypes;
  }> {
    const balanceFrom = await this.findNonZeroBalance();
    await this.makeTransferFrom(balanceFrom);
    const balanceTo = await this.chooseTransferTo(balanceFrom);
    return { balanceFrom, balanceTo };
  }
}
