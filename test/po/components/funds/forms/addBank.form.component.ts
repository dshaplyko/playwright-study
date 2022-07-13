import { Locator, Page } from "@playwright/test";
import { Form } from "./form.component";
import { Dropdown } from "../../basic/dropdown";

export class AddBank extends Form {
  readonly page: Page;

  readonly formInstructions: Locator;

  readonly method: Dropdown;

  readonly bank: Dropdown;

  readonly accountType: Dropdown;

  readonly walletAddressInput: Locator;

  readonly currencyInput: Locator;

  readonly accountNameInput: Locator;

  readonly optionalReferenceInput: Locator;

  readonly bankNicknameInput: Locator;

  readonly submitButton: Locator;

  readonly cancelButton: Locator;

  readonly beneficiaryBankNameInput: Locator;

  readonly swiftCodeInput: Locator;

  readonly bankRoutingNumberInput: Locator;

  readonly accountNumberInput: Locator;

  readonly branchNameInput: Locator;

  readonly beneficiaryBankAddress: Locator;

  readonly beneficiaryNameInput: Locator;

  readonly recipientAddressInput: Locator;

  readonly addIntermediaryBankButton: Locator;

  readonly intermediaryBankNameInput: Locator;

  readonly intermediaryBankNameError: Locator;

  readonly intermediaryBankSwiftCodeInput: Locator;

  readonly intermediaryBankAccountNumberInput: Locator;

  readonly intermediaryBankAddressInput: Locator;

  readonly intermediaryBankOptionalReferenceInput: Locator;

  readonly abaBankNumberInput: Locator;

  readonly bankNameInput: Locator;

  readonly bankAddressInput: Locator;

  readonly bsbInput: Locator;

  readonly bankClearingNumberInput: Locator;

  readonly accountTypeInput: Locator;

  constructor(locator: Locator, page: Page) {
    super(locator);
    this.page = page;
    this.formInstructions = this.rootEl.locator("p[data-test-id='add-bank-form-instructions']");
    this.method = new Dropdown(this.rootEl.locator("#form-methods-select"), this.page);
    this.bank = new Dropdown(this.rootEl.locator("#add-bank-field-bankId"), this.page);
    this.accountType = new Dropdown(this.rootEl.locator("#add-bank-field-account-type"), this.page);
    this.walletAddressInput = this.rootEl.locator("#add-bank-walletAddress");
    this.currencyInput = this.rootEl.locator("#form-ccy-select");
    this.accountNameInput = this.rootEl.locator("#add-bank-accountName");
    this.optionalReferenceInput = this.rootEl.locator("#add-bank-optionalReference");
    this.bankNicknameInput = this.rootEl.locator("#add-bank-alias, #funds-add-bank-nickname");
    this.submitButton = this.rootEl.locator("button[data-test-id='dialog-primary-btn']");
    this.cancelButton = this.rootEl.locator("button[data-test-id='dialog-secondary-btn']");
    this.beneficiaryBankNameInput = this.rootEl.locator("input[id*='beneficiary-bank-name'], #add-bank-nameOfBank");
    this.swiftCodeInput = this.rootEl.locator("#funds-add-bank-swift-code, #add-bank-swift, #add-bank-swiftCode");
    this.bankRoutingNumberInput = this.rootEl.locator("#funds-add-bank-routing-number");
    this.accountNumberInput = this.rootEl.locator("#funds-add-bank, #add-bank-accountNumber");
    this.branchNameInput = this.rootEl.locator("input[id*='branch'], #add-bank-nameOfBankBranch");
    this.beneficiaryBankAddress = this.rootEl.locator(
      "#funds-add-bank-beneficiary-bank-address, #add-bank-beneficiaryAddress"
    );
    this.beneficiaryNameInput = this.rootEl.locator(
      "#funds-add-bank-beneficiary-bank-recipient, #add-bank-beneficiaryName"
    );
    this.recipientAddressInput = this.rootEl.locator("#add-bank-bankAddress");
    this.optionalReferenceInput = this.rootEl.locator(
      "#funds-add-bank-optional-reference, #add-bank-optionalReference"
    );
    this.addIntermediaryBankButton = this.rootEl.locator("button", {
      has: this.page.locator("svg[data-testid='AddBoxIcon']"),
    });
    this.intermediaryBankNameInput = this.rootEl.locator("#add-bank-intermediaryBankName");
    this.intermediaryBankNameError = this.rootEl.locator("p[data-test-id='add-bank-field-error-intermediaryBankName']");
    this.intermediaryBankSwiftCodeInput = this.rootEl.locator("#add-bank-intermediaryBankSwift");
    this.intermediaryBankAccountNumberInput = this.rootEl.locator("#add-bank-intermediaryBankAccountNumber");
    this.intermediaryBankAddressInput = this.rootEl.locator("#add-bank-intermediaryBankAddress");
    this.intermediaryBankOptionalReferenceInput = this.rootEl.locator("#add-bank-intermediaryBankOptionalReference");
    this.abaBankNumberInput = this.rootEl.locator("#add-bank-abaBankNumber");
    this.bankNameInput = this.rootEl.locator("#add-bank-bankName");
    this.bankAddressInput = this.rootEl.locator("#add-bank-bankAddress");
    this.bsbInput = this.rootEl.locator("#add-bank-accountBSB");
    this.bankClearingNumberInput = this.rootEl.locator("#add-bank-accountBankClearingNumber");
    this.accountTypeInput = this.rootEl.locator("#add-bank-accountType");
  }

  async submitBankForm(obj: {
    beneficiary: string;
    swiftCode: string;
    accountNumber: string;
    beneficiaryAddress: string;
    beneficiaryName: string;
    recipientAddress: string;
    optionalReference: string;
    intermediaryBankName?: string;
    intermediarySwiftCode?: string;
    intermediaryBankAccount?: string;
    intermediaryBankAddress?: string;
    intermediaryOptionalReference?: string;
    bankNickname: string;
  }): Promise<void> {
    await this.beneficiaryBankNameInput.fill(obj.beneficiary);
    await this.swiftCodeInput.fill(obj.swiftCode);
    await this.accountNumberInput.fill(obj.accountNumber);
    await this.beneficiaryBankAddress.fill(obj.beneficiaryAddress);
    await this.beneficiaryNameInput.fill(obj.beneficiaryName);
    await this.recipientAddressInput.fill(obj.recipientAddress);
    await this.optionalReferenceInput.fill(obj.optionalReference);
    if (obj.intermediaryBankName) await this.addIntermediaryBankButton.click();
    if (obj.intermediaryBankName) await this.intermediaryBankNameInput.fill(obj.intermediaryBankName);
    if (obj.intermediarySwiftCode) await this.intermediaryBankSwiftCodeInput.fill(obj.intermediarySwiftCode);
    if (obj.intermediaryBankAddress) await this.intermediaryBankAddressInput.fill(obj.intermediaryBankAddress);
    if (obj.intermediaryBankAccount) await this.intermediaryBankAccountNumberInput.fill(obj.intermediaryBankAccount);
    if (obj.intermediaryOptionalReference)
      await this.intermediaryBankOptionalReferenceInput.fill(obj.intermediaryOptionalReference);
    await this.bankNicknameInput.fill(obj.bankNickname);
  }
}
