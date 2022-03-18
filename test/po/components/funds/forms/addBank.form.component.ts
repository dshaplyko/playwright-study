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
    this.formInstructions = this.el.locator("p[data-test-id='add-bank-form-instructions']");
    this.method = new Dropdown(this.el.locator("#form-methods-select"), this.page);
    this.bank = new Dropdown(this.el.locator("#add-bank-field-bankId"), this.page);
    this.accountType = new Dropdown(this.el.locator("#add-bank-field-account-type"), this.page);
    this.walletAddressInput = this.el.locator("#add-bank-walletAddress");
    this.currencyInput = this.el.locator("#form-ccy-select");
    this.accountNameInput = this.el.locator("#add-bank-accountName");
    this.optionalReferenceInput = this.el.locator("#add-bank-optionalReference");
    this.bankNicknameInput = this.el.locator("#add-bank-alias, #funds-add-bank-nickname");
    this.submitButton = this.el.locator("button[data-test-id='dialog-primary-btn']");
    this.cancelButton = this.el.locator("button[data-test-id='dialog-secondary-btn']");
    this.beneficiaryBankNameInput = this.el.locator("input[id*='beneficiary-bank-name'], #add-bank-nameOfBank");
    this.swiftCodeInput = this.el.locator("#funds-add-bank-swift-code, #add-bank-swift, #add-bank-swiftCode");
    this.bankRoutingNumberInput = this.el.locator("#funds-add-bank-routing-number");
    this.accountNumberInput = this.el.locator("#funds-add-bank, #add-bank-accountNumber");
    this.branchNameInput = this.el.locator("input[id*='branch'], #add-bank-nameOfBankBranch");
    this.beneficiaryBankAddress = this.el.locator(
      "#funds-add-bank-beneficiary-bank-address, #add-bank-beneficiaryAddress"
    );
    this.beneficiaryNameInput = this.el.locator(
      "#funds-add-bank-beneficiary-bank-recipient, #add-bank-beneficiaryName"
    );
    this.recipientAddressInput = this.el.locator("#add-bank-bankAddress");
    this.optionalReferenceInput = this.el.locator("#funds-add-bank-optional-reference, #add-bank-optionalReference");
    this.addIntermediaryBankButton = this.el.locator("button", {
      has: this.page.locator("svg[data-testid='AddBoxIcon']"),
    });
    this.intermediaryBankNameInput = this.el.locator("#add-bank-intermediaryBankName");
    this.intermediaryBankSwiftCodeInput = this.el.locator("#add-bank-intermediaryBankSwift");
    this.intermediaryBankAccountNumberInput = this.el.locator("#add-bank-intermediaryBankAccountNumber");
    this.intermediaryBankAddressInput = this.el.locator("#add-bank-intermediaryBankAddress");
    this.intermediaryBankOptionalReferenceInput = this.el.locator("#add-bank-intermediaryBankOptionalReference");
    this.abaBankNumberInput = this.el.locator("#add-bank-abaBankNumber");
    this.bankNameInput = this.el.locator("#add-bank-bankName");
    this.bankAddressInput = this.el.locator("#add-bank-bankAddress");
    this.bsbInput = this.el.locator("#add-bank-accountBSB");
    this.bankClearingNumberInput = this.el.locator("#add-bank-accountBankClearingNumber");
    this.accountTypeInput = this.el.locator("#add-bank-accountType");
  }
}
