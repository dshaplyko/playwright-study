import { Page, Locator } from "@playwright/test";
import { BasePage } from "./Base.page";
import { Widget } from "../components/general/widget.component";
import { HoldingList } from "../components/portfolio/holdingList.component";
import { FeatureHighlight } from "../components/portfolio/featureHighlight.component";
import { TradingButtons } from "../components/portfolio/tradingButtons.component";
import { WIDGETS, FEATURE_HIGHLIGHT, DECIMAL_PART, NOTIFICATIONS_DATA, URLs, SG_CONFIG_OLD } from "../../config";
import { Logger } from "../../logger/logger";
import { GroupHead } from "../components/portfolio/groupHead.component";
import { CardGroup } from "../components/portfolio/cardGroup.component";
import { Element } from "../components/basic/element";
import { Dropdown } from "../components/basic/dropdown";
import { expectElementVisibility } from "../../utils";
const logger = new Logger("Portfolio Page");

export class PortfolioPage extends BasePage {
  readonly url: string;

  readonly totalBalance: Locator;

  readonly holdingList: HoldingList;

  readonly quickTips: Locator;

  readonly quickTipsLink: Locator;

  readonly tradingButtons: TradingButtons;

  readonly cardsView: Locator;

  readonly rowsView: Locator;

  readonly currencyFilter: Dropdown;

  readonly loadMoreButton: Element;

  readonly tableGroupHead: GroupHead;

  readonly cardGroupHead: GroupHead;

  readonly cardGroups: CardGroup;

  readonly tableGroups: Locator;

  readonly accountList: Dropdown;

  constructor(page: Page, url = "/portfolio") {
    super(page);
    this.url = url;
    this.holdingList = new HoldingList(this.page.locator("table[data-test-id='holding-list']"));
    this.tradingButtons = new TradingButtons(this.page.locator("div[data-test-id='trading-related-area']"));
    this.quickTips = this.page.locator("div[data-test-id='quick-tips']");
    this.quickTipsLink = this.quickTips.locator("a[href*=funds]").first();
    this.cardsView = this.page.locator("button[data-test-id='toggle-cards-view-button']");
    this.rowsView = this.page.locator("button[data-test-id='toggle-rows-view-button']");
    this.currencyFilter = new Dropdown(this.page.locator("[data-test-id='ccy-type-filter-switch']"), this.page);
    this.loadMoreButton = new Element(
      this.page.locator("button[data-test-id='portfolio-load-more-pagination-next-page-btn']")
    );
    this.tableGroupHead = new GroupHead(this.page.locator("tr[data-test-id^='collapsable-group-head-wrapper']"));
    this.cardGroupHead = new GroupHead(this.page.locator("div[data-test-id='card-group-header']"));
    this.cardGroups = new CardGroup(this.page.locator("div[data-test-id='cards-group']"));
    this.tableGroups = this.page.locator("[data-test-id^='group-collapsable-rows']");
    this.accountList = new Dropdown(this.page.locator("div.MuiAutocomplete-hasPopupIcon"), this.page);
  }

  getGroupTable(index: number) {
    return new HoldingList(this.tableGroups.nth(index));
  }

  getUserAccountTablesCount(): Promise<number> {
    return this.tableGroupHead.getCount();
  }

  async getTotalBalance() {
    let sum = 0;
    const userGroupsCount = await this.getUserAccountTablesCount();

    await this.tableGroupHead.expandCollapseAll("expand");

    for (let i = 0; i < userGroupsCount; i++) {
      sum += await this.getGroupTable(i).calculateTotalBalance();
    }
    return sum;
  }

  getWidget(widget: WIDGETS): Widget {
    return new Widget(this.page.locator(`div[data-test-id='${widget}']`));
  }

  getFeatureHighlight(item: FEATURE_HIGHLIGHT): FeatureHighlight {
    return new FeatureHighlight(this.page.locator(`div[data-test-id*='${item}']`));
  }

  async calculateTotalBalance(): Promise<number> {
    const digitalAssets: number = await this.getWidget(WIDGETS.DIGITAL_ASSETS).getWidgetValue("totalBalance");
    const fiatCurrencies: number = await this.getWidget(WIDGETS.FIAT_CURRENCIES).getWidgetValue("totalBalance");
    const sum: number = parseFloat((digitalAssets + fiatCurrencies).toFixed(DECIMAL_PART));
    logger.debug(`Digital Assets Balance: ${digitalAssets}`);
    logger.debug(`Fiat Currencies Balance: ${fiatCurrencies}`);
    logger.debug(`Sum: ${sum}`);
    return sum;
  }

  async goto() {
    await super.goto(this.url);
  }

  async mockNotificationsData(): Promise<void> {
    await this.api.mockData(NOTIFICATIONS_DATA, URLs.DEPOSIT_NOTIFICATIONS);
    await this.goto();
  }

  async mockFeatureHighlight(config: any): Promise<void> {
    await this.api.mockConfig(SG_CONFIG_OLD);
    await this.api.mockUser({
      roles: ["ROLE_USER"],
      isPtsEnabled: true,
    });
    await this.api.mockNextSteps(config);
    await this.goto();
  }

  async mockAdminUser(): Promise<void> {
    await this.api.mockUser({
      roles: ["ROLE_WHITELABEL_ADMIN", "ROLE_USER"],
    });
  }

  async showAccountBox(): Promise<void> {
    await this.api.mockConfig({
      portfolio: {
        showAccountBox: true,
      },
    });
    await this.mockAdminUser();
    await this.goto();
  }

  async showUpgradeAction(): Promise<void> {
    await this.api.mockConfig({
      portfolio: {
        showUpgradeAction: true,
      },
    });
    await this.api.mockUser({
      isVerified: true,
      isTrusted: false,
      isVIP: false,
      isPartner: false,
    });
    await this.goto();
  }

  async hideBrokerageColumn(): Promise<void> {
    await this.api.mockConfig({
      features: {
        otcTrade: {
          enabled: false,
        },
        simpleTrade: {
          enabled: false,
        },
      },
    });
  }

  async enableTrading(option: boolean): Promise<void> {
    await this.api.mockConfig({
      site: {
        displayUnsettled: {
          enabled: option,
        },
      },
    });
    await this.goto();
  }

  async enableDigitalAddress(): Promise<void> {
    await this.api.mockConfig({
      features: {
        contacts: false,
      },
    });
    await this.goto();
  }

  async isTableExpanded(option = true): Promise<void> {
    const tablesCount = await this.getUserAccountTablesCount();

    for (let i = 0; i < tablesCount; i++) {
      await expectElementVisibility(this.getGroupTable(i).currencyRows.first(), option);
    }
  }
}
