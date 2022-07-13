import { Locator } from "@playwright/test";
import { Form } from "./form.component";
import { BankCard } from "../bankCard.component";
import { Logger } from "../../../../logger/logger";
import { expectElementVisibility } from "../../../../utils";
const logger = new Logger("Bank Accounts");

export class BankAccounts extends Form {
  readonly addBankButton: Locator;

  readonly bankCards: Locator;

  readonly noBankAccountsMessage: Locator;

  constructor(locator: Locator) {
    super(locator);
    this.addBankButton = this.rootEl.locator("button[data-test-id='add-bank-button']");
    this.bankCards = this.rootEl.locator("div[data-test-id*='funds-banks-list-item']");
    this.noBankAccountsMessage = this.rootEl.locator("span[data-test-id='funds-no-bank-accounts']").first();
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

  async getBankNames(): Promise<string[]> {
    await this.rootEl.waitFor();
    await this.addBankButton.waitFor();
    const bankCardsCount: number = await this.getBankCardsCount();
    const names = [];

    if (bankCardsCount === 0) return names;

    for (let i = 0; i < bankCardsCount; i++) {
      names.push(await this.getBankCard(i).name.nth(1).textContent());
    }

    logger.debug(`Bank Name are: ${JSON.stringify(names)}`);
    return names;
  }

  async openBankByName(name: string): Promise<void> {
    const names = await this.getBankNames();

    const bankIndex = names.indexOf(name);
    await this.getBankCard(bankIndex).click();
  }
}
