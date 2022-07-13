import { Locator } from "@playwright/test";
import { getValueAsNumber } from "../../../../utils";
import { Element } from "../../basic/element";
import { Table } from "../../general/table.component";

export class Form extends Element {
  readonly header: Locator;

  readonly bankWireButton: Locator;

  readonly errorMessage: Locator;

  readonly infoMessage: Locator;

  readonly qrCode: Locator;

  readonly createNewAddressButton: Locator;

  readonly alertMessage: Locator;

  readonly destinationAddress: Locator;

  readonly balance: Locator;

  readonly bankTransferButton: Locator;

  readonly transferOutButton: Locator;

  readonly networkFee: Locator;

  readonly maximumFee: Locator;

  readonly utilizedBalance: Locator;

  readonly amountField: Element;

  readonly paymentInButton: Locator;

  readonly percentControls: Locator;

  readonly continueButton: Locator;

  readonly deleteButton: Locator;

  readonly bankWireNotification: Table;

  constructor(locator: Locator) {
    super(locator);
    this.header = this.rootEl.locator("[data-test-id*='methods-header'], [data-test-id*='title']");
    this.bankWireButton = this.rootEl.locator("[data-test-id='funds-payment-method-button-bank-wire']");
    this.errorMessage = this.rootEl.locator(
      "[data-test-id='fiat-payment-in-method-error-disabled'], span[data-test-id='payment-error-cannot-create'], span[data-test-id='fiat-payment-in-form-error']"
    );
    this.infoMessage = this.rootEl.locator("span[data-test-id='payment-info-message']");
    this.qrCode = this.rootEl.locator("[data-test-id='payment-qr-code']");
    this.createNewAddressButton = this.rootEl.locator("button[data-test-id*='create-new-address']");
    this.alertMessage = this.rootEl.locator("span[data-test-id='payment-alert-message']");
    this.destinationAddress = this.rootEl.locator("span[data-test-id='payment-destination-address']");
    this.balance = this.rootEl.locator("[data-test-id$='balance']");
    this.bankTransferButton = this.rootEl.locator("[data-test-id='funds-payment-method-button-bank']");
    this.transferOutButton = this.rootEl.locator("[data-test-id='funds-payment-method-button-wallet']");
    this.networkFee = this.rootEl.locator("span[data-test-id='funds-payment-out-balance-network-fee']");
    this.maximumFee = this.rootEl.locator("span[data-test-id='funds-payment-out-balance-max']");
    this.utilizedBalance = this.rootEl.locator("span[data-test-id='funds-payment-out-balance-utilized']");
    this.amountField = new Element(this.rootEl.locator("input[placeholder*='0']"));
    this.paymentInButton = this.rootEl.locator("button[type='submit']");
    this.percentControls = this.rootEl.locator(
      "input[name='percentControls'], input[name='percentageChoiceRadioGroup'], input[name='bankTransferPercentControls']"
    );
    this.continueButton = this.rootEl.locator("text='Continue'");
    this.deleteButton = this.rootEl.locator("text='Delete'");
    this.bankWireNotification = new Table(this.rootEl.locator(".MuiTableContainer-root"));
  }

  async calculateFeesSum(): Promise<number> {
    const networkFeeText = await this.networkFee.textContent();
    const maximumFeeText = await this.maximumFee.textContent();
    const sum = parseFloat(networkFeeText) + parseFloat(maximumFeeText);
    return Number(sum.toFixed(2));
  }

  async getFiatBalance(): Promise<number> {
    const fiatBalance = await this.balance.textContent();
    return parseInt(fiatBalance.match(/[\d,.]/g).join(""));
  }

  async getTotalBalance(): Promise<number> {
    return Number(parseFloat(await this.balance.innerText()).toFixed(2));
  }

  async choosePercentControl(percent: number): Promise<void> {
    if (percent === 25) {
      await this.percentControls.nth(0).click();
    } else if (percent === 50) {
      await this.percentControls.nth(1).click();
    } else if (percent === 75) {
      await this.percentControls.nth(2).click();
    } else if (percent === 100) {
      await this.percentControls.nth(3).click();
    }
  }

  async getValueFromAmount(): Promise<string> {
    const value = await this.amountField.getValue();
    return String(getValueAsNumber(value));
  }
}
