import { Locator } from "@playwright/test";
import { Form } from "./form.component";
import { BankCard } from "../bankCard.component";
import { expectElementVisibility } from "../../../../utils";

export class BankAccounts extends Form {
  readonly addBankButton: Locator;

  readonly bankCards: Locator;

  readonly noBankAccountsMessage: Locator;

  constructor(locator: Locator) {
    super(locator);
    this.addBankButton = this.el.locator("button[data-test-id='add-bank-button']");
    this.bankCards = this.el.locator("div[data-test-id*='funds-banks-list-item']");
    this.noBankAccountsMessage = this.el.locator("span[data-test-id='funds-no-bank-accounts']");
  }

  getBankCardsCount(): Promise<number> {
    return this.bankCards.count();
  }

  getBankCard(index: number): BankCard {
    return new BankCard(this.bankCards.nth(index));
  }

  async verifyBankCards(): Promise<void> {
    const bankCardsCount: number = await this.getBankCardsCount();

    for (let i = 0; i < bankCardsCount; i++) {
      await expectElementVisibility(this.getBankCard(i).name, true);
      await expectElementVisibility(this.getBankCard(i).transferMethod, true);
      await expectElementVisibility(this.getBankCard(i).alias, true);
    }
  }
}
