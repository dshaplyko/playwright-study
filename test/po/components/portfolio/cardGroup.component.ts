import { Locator } from "@playwright/test";
import { expectElementVisibility } from "../../../utils";
import { CURRENCIES } from "../../../config";
import { Element } from "../basic/element";

export class CardGroup extends Element {
  constructor(locator: Locator) {
    super(locator);
  }

  getCardGroup(index: number): Locator {
    return this.rootEl.nth(index);
  }

  async checkCardsVisibility() {
    const groupsCount = await this.rootEl.count();

    for (let i = 0; i < groupsCount; i++) {
      await expectElementVisibility(this.getCardGroup(i).locator(".MuiCard-root[data-test-id^='card']"), true);
    }
  }

  async clickCardByCurrency(group: number, currency: CURRENCIES): Promise<void> {
    return this.getCardGroup(group).locator("[data-test-id*='-total']", { hasText: currency }).click();
  }
}
