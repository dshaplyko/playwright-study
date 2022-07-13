import { Locator } from "@playwright/test";
import { Element } from "../basic/element";

export class GroupHead extends Element {
  readonly accountName: Locator;

  readonly groupName: Locator;

  constructor(locator: Locator) {
    super(locator);
    this.accountName = this.rootEl.locator("[data-test-id*='account-info'] span.MuiTypography-BODY_BOLD");
    this.groupName = this.rootEl.locator("[data-test-id*='account-info'] span.MuiTypography-SUBTEXT_SECONDARY").first();
  }

  async getCount(): Promise<number> {
    await this.rootEl.first().waitFor();
    return this.rootEl.count();
  }

  async expandCollapseAll(option: "expand" | "collapse"): Promise<void> {
    let i = option === "expand" ? 1 : 0;
    const groupsCount: number = await this.getCount();

    for (i; i < groupsCount; i++) {
      await this.rootEl.nth(i).click();
    }
  }
}
