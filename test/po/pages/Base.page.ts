import { Page, Locator, expect } from "@playwright/test";
import { Header } from "../components/general/header.component";
import { Profile } from "../components/general/profile.component";
import { Logger } from "../../logger/logger";
import { Notifications } from "../components/general/notifications.component";
import { TwoFactor } from "../components/general/twoFactor.component";
import { ACCOUNTS, ACCOUNT_GROUP, ACCOUNT_GROUPS, CURRENCIES, REPORT_TYPES, TWO_FA_DATA, URLs } from "../../config";
import { Modal } from "../components/general/modals/modal.component";
import {
  expectElementToHaveText,
  expectElementVisibility,
  expectReportValid,
  getDocAsJson,
  waitSeveralSec,
} from "../../utils";
import { AccountModal } from "../components/general/modals/accountModal.component";
import { Api } from "../api/api";
import { Pagination } from "../components/general/pagination.component";
const logger = new Logger("Base Page");

export abstract class BasePage {
  readonly page: Page;

  readonly api: Api;

  readonly header: Header;

  readonly profile: Profile;

  readonly notifications: Notifications;

  readonly quickLinks: Locator;

  readonly priceTicker: Locator;

  readonly tooltip: Locator;

  readonly otpForm: TwoFactor;

  readonly yubiForm: TwoFactor;

  readonly twoFactorForm: TwoFactor;

  readonly twoFactorModal: TwoFactor;

  readonly iframe: Locator;

  readonly verifyDialog: Modal;

  readonly chooseAccount: AccountModal;

  readonly stagingModeLabel: Locator;

  readonly subAccountIndicator: Locator;

  readonly pagination: Pagination;

  readonly maintenanceBanner: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = new Header(this.page.locator("header[data-test-id='application-header']"));
    this.profile = new Profile(this.page.locator("[data-test-id='profile'] ul"));
    this.notifications = new Notifications(this.page.locator("[data-test-id='notifications-popup']"));
    this.quickLinks = this.page.locator("nav[data-test-id='quick-links']");
    this.priceTicker = this.page.locator("div[data-test-id='price-ticker']");
    this.tooltip = this.page.locator("div.MuiSnackbarContent-message, div[role='tooltip'], div[role='alert']").first();
    this.otpForm = new TwoFactor(this.page.locator("[aria-labelledby='two-factor-dialog']"));
    this.yubiForm = new TwoFactor(this.page.locator("[aria-labelledby='two-factor-dialog']"));
    this.twoFactorForm = new TwoFactor(this.page.locator("[data-test-id*='two-factor-form-wrapper']"));
    this.twoFactorModal = new TwoFactor(this.page.locator("div[aria-labelledby='two-factor-reminder-dialog']"));
    this.iframe = this.page.locator("iframe[title='MGUI']");
    this.verifyDialog = new Modal(this.page.locator("[data-test-id='verify-dialog']"), this.page);
    this.chooseAccount = new AccountModal(this.page.locator("div[role='dialog']"), this.page);
    this.stagingModeLabel = this.page.locator("span", { hasText: "Staging Mode" });
    this.subAccountIndicator = this.page.locator("div.MuiPaper-rounded button");
    this.pagination = new Pagination(
      this.page.locator(
        "[data-test-id='transaction-list-pagination'], [data-test-id='portfolio-accounts-view-pagination']"
      )
    );
    this.maintenanceBanner = this.page.locator("div:has(>svg[data-testid='ErrorIcon']~span)");
    this.api = new Api(this.page);
  }

  async closeMaintenanceBanner(): Promise<void> {
    await waitSeveralSec(2000);
    if (await this.maintenanceBanner.isVisible()) {
      await this.page.locator("svg[data-testid='ErrorIcon']~button").click();
    }
  }

  async setHTTPHeaders(): Promise<void> {
    await this.page.setExtraHTTPHeaders({});
  }

  async goto(url: string) {
    await this.page.goto(url);
    await this.page.waitForURL(new RegExp(url), {
      waitUntil: "networkidle",
    });
  }

  async getClipboardText(): Promise<string> {
    const clipboardText: string = await this.page.evaluate("navigator.clipboard.readText()");
    logger.debug(clipboardText);
    return clipboardText;
  }

  allowClipboardPermissions(): Promise<void> {
    return this.page.context().grantPermissions(["clipboard-write", "clipboard-read"]);
  }

  getQuickLink(link: string): Locator {
    link = link.split(" ")[0];
    return this.quickLinks.locator(`a[href*=${link}]`);
  }

  async expectUrlContains(urlToCheck: string | RegExp): Promise<void> {
    await expect(this.page).toHaveURL(urlToCheck);
  }

  async expectTitleContains(title: string | RegExp): Promise<void> {
    await expect(this.page).toHaveTitle(title);
  }

  async pause(): Promise<void> {
    await this.page.pause();
  }

  async getNewTab(action: Promise<void>): Promise<Page> {
    const [newTab] = await Promise.all([this.page.context().waitForEvent("page"), action]);
    await newTab.waitForLoadState();
    return newTab;
  }

  pressEscape(): Promise<void> {
    return this.page.keyboard.press("Escape");
  }

  async closeVerifyDialog(): Promise<void> {
    await waitSeveralSec(5000);
    const visibility = await this.verifyDialog.rootEl.isVisible();

    if (visibility) {
      await this.verifyDialog.buttonClose.click();
    }
  }

  async switchUserAccount(account: ACCOUNT_GROUPS): Promise<void> {
    await this.header.profileButton.click();
    await this.profile.switchAccount.click();
    await this.chooseAccount.clickButtonByText(account);
  }

  async mock2FAresponse(config: any): Promise<void> {
    const body = { ...TWO_FA_DATA };
    body.twoFactor.actions = config;
    await this.page.route(URLs.LOGIN, (route) => {
      route.fulfill({
        status: 401,
        body: JSON.stringify(body),
      });
    });
  }

  async showTwoFA(enabled: boolean, showDisableButton = true): Promise<void> {
    const data = {
      twofa: {
        enabled,
        showDisableButton,
      },
    };

    return this.api.mockConfig(data);
  }

  async checkTooltip(text?: string, isVisible = true): Promise<void> {
    await expectElementVisibility(this.tooltip, isVisible);
    if (text) await expectElementToHaveText(this.tooltip, text);
  }

  async checkReport(action: Promise<void>, field: string, type: REPORT_TYPES): Promise<void> {
    const report = await getDocAsJson(this.page, action);
    logger.debug(`Report for: ${JSON.stringify(report)}`);

    const currency: string[] = report.map((item) => item[field]);
    currency.forEach((item) => expect(item).toEqual(CURRENCIES.BTC));
    expectReportValid(type, report);
  }

  async mockAccountGroups(accountGroup = ACCOUNT_GROUP): Promise<any> {
    await this.api.mockUser({
      accountGroups: [accountGroup],
      cashCcy: "USD",
    });
    await this.api.mockCurrent({
      accountGroups: [
        {
          accounts: ACCOUNTS,
          accountGroup: accountGroup,
        },
      ],
      event: "account",
      totalAccountGroups: 1,
    });
  }

  async mockUserPermissions(permissions: string[]): Promise<void> {
    await this.page.addInitScript(() => {
      window.localStorage.setItem("currentSubaccount", "");
    });
    const newAccountGroup = { ...ACCOUNT_GROUP };
    newAccountGroup.owned = false;
    newAccountGroup.permissions = permissions;
    await this.mockAccountGroups(newAccountGroup);
  }
}
