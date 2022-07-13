import { Locator, Page } from "@playwright/test";
import { BasePage } from "./Base.page";
import { Element } from "../components/basic/element";
import { Widget } from "./../components/general/widget.component";
import { Modal } from "../components/general/modals/modal.component";
import { Bar } from "../components/funds/bar.component";
import { List } from "../components/funds/list.component";
import { Transaction } from "../components/funds/transaction.component";
import { Form } from "../components/funds/forms/form.component";
import { TransferFunds } from "../components/funds/forms/transferFunds.form.component";
import { Transfer } from "../components/funds/forms/transfer.form.component";
import { BankAccounts } from "../components/funds/forms/bankAccounts.form.component";
import { AddBank } from "../components/funds/forms/addBank.form.component";
import { ConfirmationModal } from "../components/general/modals/confirmationModal.component";
import {
  CURRENCIES,
  BANK_TRANSFER_FORMS,
  URLs,
  SG_DEPOSIT_METADATA,
  BANK_DATA_MODALS,
  WITHDRAWAL_DATA,
  BANK_DATA,
  SG_SUBMIT_MIN_ERROR,
  SG_SUBMIT_MAX_ERROR,
  SG_TRANSACTION_METADATA,
  BANK_DATA_EMPTY,
  BASE_URL,
  SG_CONFIG,
} from "../../config";
import { Logger } from "../../logger/logger";
import { generateRandomString } from "../../utils";
const logger = new Logger("Funds Page");

export class FundsPage extends BasePage {
  readonly url: string;

  readonly quickTipsLocator: Locator;

  readonly quickTips: Element;

  readonly feesScheduleLink: Locator;

  readonly activityLink: Locator;

  readonly expandQuckTipsButton: Element;

  readonly paymentIn: Widget;

  readonly paymentOut: Widget;

  readonly transferFunds: Widget;

  readonly menuBar: Bar;

  readonly currencyList: List;

  readonly recentTransactions: Transaction;

  readonly transactionsHeader: Locator;

  readonly selectedPayment: Form;

  readonly fiatCard: Form;

  readonly digitalCard: Form;

  readonly questionButton: Locator;

  readonly modal: Modal;

  readonly placeholder: Locator;

  readonly verificationMessage: Locator;

  readonly verificationLink: Locator;

  readonly paymentInForm: Form;

  readonly transferFundsForm: TransferFunds;

  readonly transferOutToWalletForm: Transfer;

  readonly bankTransferForm: Transfer;

  readonly confirmationModal: ConfirmationModal;

  readonly bankAccountsForm: BankAccounts;

  readonly bankAccountForm: Form;

  readonly addBankForm: AddBank;

  constructor(page: Page, url = "/funds") {
    super(page);
    this.url = url;
    this.quickTipsLocator = this.page.locator("div[data-test-id='funds-quick-tips']");
    this.quickTips = new Element(this.quickTipsLocator.locator("div[aria-expanded]"));
    this.feesScheduleLink = this.quickTipsLocator.locator("a[href*='fees']");
    this.activityLink = this.quickTipsLocator.locator("a[href*='activity']");
    this.expandQuckTipsButton = new Element(this.quickTips.rootEl.locator("div:has(> svg[data-test-id*='expand'])"));
    this.paymentIn = new Widget(this.page.locator("div[data-test-id='funds-payment-in']"));
    this.paymentOut = new Widget(this.page.locator("div[data-test-id='funds-payment-out']"));
    this.transferFunds = new Widget(this.page.locator("div[data-test-id='funds-transfer-funds']"));
    this.menuBar = new Bar(this.page.locator("div[data-test-id='funds-menu-bar']"));
    this.currencyList = new List(this.page.locator("div[data-test-id='funds-currencies-list']"));
    this.recentTransactions = new Transaction(this.page.locator("div[data-test-id$='recent-transactions']"));
    this.transactionsHeader = this.page.locator("span[data-test-id='funds-tab-header-title']");
    this.questionButton = this.page.locator("button", { has: this.page.locator("svg[data-testid='HelpIcon']") });
    this.selectedPayment = new Form(this.page.locator("[data-test-id*='card'], [data-test-id='funds-payment-form']"));
    this.fiatCard = new Form(this.page.locator("div[data-test-id*='fiat-card']"));
    this.digitalCard = new Form(this.page.locator("div[data-test-id*='digital-card']"));
    this.paymentInForm = new Form(this.page.locator("form[data-test-id='fiats-payment-in-form']"));
    this.transferFundsForm = new TransferFunds(
      this.page.locator("div[data-test-id='funds-transfer-funds-form']"),
      this.page
    );
    this.transferOutToWalletForm = new Transfer(
      this.page.locator("div[data-test-id='funds-payment-out-digital-transfer']")
    );
    this.bankTransferForm = new Transfer(this.page.locator("div[data-test-id='payment-out-bank-transfer']"));
    this.modal = new Modal(this.page.locator("div[aria-labelledby='funds-payment-in-info-dialog']"), this.page);
    this.placeholder = this.page.locator("[data-test-id*='placeholder']");
    this.verificationMessage = this.page.locator("div[data-test-id='funds-verification-message']");
    this.verificationLink = this.verificationMessage.locator("a.verifylink");
    this.confirmationModal = new ConfirmationModal(
      this.page.locator("div[aria-labelledby='funds-confirmation-dialog'], div[role='dialog']"),
      this.page
    );
    this.bankAccountsForm = new BankAccounts(
      this.page.locator("div[data-test-id='funds-payment-out-fiat-card']", {
        has: this.page.locator("div[data-test-id*='list']"),
      })
    );
    this.addBankForm = new AddBank(this.page.locator("div[data-test-id='add-bank-form']"), this.page);
    this.bankAccountForm = new Form(this.page.locator("[data-test-id='funds-payment-out-fiat-card']"));
  }

  async chooseBankTransferForm(currency: CURRENCIES, form: BANK_TRANSFER_FORMS): Promise<void> {
    await this.currencyList.chooseCurrency(currency);
    await this.fiatCard.bankTransferButton.click();
    await this.bankAccountsForm.addBankButton.click();
    await this.addBankForm.method.clickByText(form);
  }

  async goto() {
    await super.goto(this.url);
  }

  async mockBankData(data: any): Promise<void> {
    await this.api.mockData(data, URLs.BANK_METADATA);
  }

  async mockTransactionData(): Promise<void> {
    await this.api.mockData(SG_DEPOSIT_METADATA, URLs.DEPOSIT_METADATA);
    await this.paymentIn.click();
  }

  async mockModalData(): Promise<void> {
    await this.api.mockData(BANK_DATA_MODALS, URLs.BANK_INFO);
    await this.goto();
    await this.paymentOut.click();
  }

  async mockBankInfo(data: "full" | "empty"): Promise<void> {
    const bankData = data === "full" ? BANK_DATA : BANK_DATA_EMPTY;
    await this.api.mockData(bankData, URLs.BANK_INFO);
  }

  async mockTransferData(): Promise<void> {
    await this.api.mockData(WITHDRAWAL_DATA, URLs.WITHDRAWAL_METADATA);
    await this.mockBankInfo("full");
    await this.goto();
    await this.paymentOut.click();
  }

  async emulateTransferError(error: "min" | "max"): Promise<void> {
    const transferError = error === "max" ? SG_SUBMIT_MAX_ERROR : SG_SUBMIT_MIN_ERROR;
    await this.api.emulateNetworkError(transferError, URLs.SUBMIT_CASH_WITHDRAWAL);
    await this.fiatCard.bankTransferButton.click();
  }

  async mockSuccessfulTransaction(currency: "cash" | "coin"): Promise<void> {
    const transactionCurrency = currency === "cash" ? URLs.SUBMIT_CASH_WITHDRAWAL : URLs.SUBMIT_COIN_WITHDRAWAL;
    await this.api.mockData(SG_TRANSACTION_METADATA, transactionCurrency);
  }

  async mockConfig(config: any, account: any): Promise<void> {
    await this.api.mockConfig(config);
    await this.api.mockUser(account);
    await this.goto();
  }

  async createBankWithRandomName(): Promise<string> {
    const bankName: string = generateRandomString(10);
    logger.info(`Random Bank Name is ${bankName}`);

    await this.currencyList.chooseCurrency(CURRENCIES.HKD);
    await this.fiatCard.bankTransferButton.click();
    await this.bankAccountsForm.addBankButton.click();
    await this.addBankForm.submitBankForm({
      beneficiary: bankName,
      swiftCode: "BOFAUS3N",
      accountNumber: "GB29 NWBK 6016 1331 9268 19",
      beneficiaryAddress: "Test address",
      beneficiaryName: bankName,
      recipientAddress: "Test address",
      optionalReference: "Test reference",
      bankNickname: "Test nickname",
    });
    return bankName;
  }

  async checkIfBalanceIsEnough(): Promise<void> {
    const fiatBalance = await this.bankTransferForm.getFiatBalance();
    if (fiatBalance < 20) {
      await this.goto();
      await this.transferFunds.click();
      await this.currencyList.chooseCurrency(CURRENCIES.USD);
      await this.transferFundsForm.makeTransfer("Exchange", "Primary");
      await this.goto();
      await this.paymentOut.click();
      await this.currencyList.chooseCurrency(CURRENCIES.USD);
      await this.fiatCard.bankTransferButton.click();
      await this.bankAccountsForm.getBankCard(0).click();
      await this.bankAccountForm.continueButton.click();
    }
  }

  async makeTransferBTC(amount: number): Promise<void> {
    await this.page.goto(`${BASE_URL}/funds`);
    await this.transferFunds.click();
    await this.currencyList.chooseCurrency(CURRENCIES.BTC);
    logger.info("Making Exchange->Primary transfer using BTC");
    await this.transferFundsForm.makeTransfer("Exchange", "Primary", amount);
  }

  async hideAddBankButton(option: boolean): Promise<void> {
    await this.api.mockConfig({
      site: {
        payoutAddBankDisable: option,
      },
    });
  }

  async showUtilizedBalance(option: boolean): Promise<void> {
    const config = JSON.parse(JSON.stringify(SG_CONFIG));
    config.features.funds.withdrawal.balance.utilized.enabled = option;
    await this.api.mockConfig({
      features: config.features,
    });
  }
}
