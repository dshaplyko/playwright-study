import { Locator } from "@playwright/test";
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

  readonly amountField: Element;

  readonly paymentInButton: Locator;

  readonly percentControls: Locator;

  readonly continueButton: Locator;

  readonly deleteButton: Locator;

  readonly bankWireNotification: Table;

  constructor(locator: Locator) {
    super(locator);
    this.header = this.el.locator("[data-test-id*='methods-header'], [data-test-id*='title']");
    this.bankWireButton = this.el.locator("[data-test-id='funds-payment-method-button-bank-wire']");
    this.errorMessage = this.el.locator(
      "[data-test-id='fiat-payment-in-method-error-disabled'], span[data-test-id='payment-error-cannot-create'], span[data-test-id='fiat-payment-in-form-error']"
    );
    this.infoMessage = this.el.locator("span[data-test-id='payment-info-message']");
    this.qrCode = this.el.locator("[data-test-id='payment-qr-code']");
    this.createNewAddressButton = this.el.locator("button[data-test-id*='create-new-address']");
    this.alertMessage = this.el.locator("span[data-test-id='payment-alert-message']");
    this.destinationAddress = this.el.locator("span[data-test-id='payment-destination-address']");
    this.balance = this.el.locator("[data-test-id$='balance']");
    this.bankTransferButton = this.el.locator("[data-test-id='funds-payment-method-button-bank']");
    this.transferOutButton = this.el.locator("[data-test-id='funds-payment-method-button-wallet']");
    this.networkFee = this.el.locator("span[data-test-id='funds-payment-out-balance-network-fee']");
    this.maximumFee = this.el.locator("span[data-test-id='funds-payment-out-balance-max']");
    this.amountField = new Element(this.el.locator("input[placeholder*='0']"));
    this.paymentInButton = this.el.locator("button[type='submit']");
    this.percentControls = this.el.locator(
      "input[name='percentControls'], input[name='percentageChoiceRadioGroup'], input[name='bankTransferPercentControls']"
    );
    this.continueButton = this.el.locator("text='Continue'");
    this.deleteButton = this.el.locator("text='Delete'");
    this.bankWireNotification = new Table(this.el.locator("[aria-label='Deposit Notification Table']"));
  }

  async calculateFeesSum(): Promise<number> {
    const networkFeeText = await this.networkFee.textContent();
    const maximumFeeText = await this.maximumFee.textContent();
    const sum = parseFloat(networkFeeText) + parseFloat(maximumFeeText);
    return Number(sum.toFixed(2));
  }

  async getFiatBalance(): Promise<string> {
    return this.balance.textContent();
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
}
