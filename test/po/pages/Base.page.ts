import { Page, Locator, expect } from "@playwright/test";
import { Header } from "../components/general/header.component";
import { Profile } from "../components/general/profile.component";
import { Logger } from "../../logger/logger";
import { Notifications } from "../components/general/notifications.component";
import { TwoFactor } from "../components/general/twoFactor.component";
import { ACCOUNT_GROUPS, CLIENT_HEADERS } from "../../config";
import { Modal } from "../components/general/modals/modal.component";
import { waitSeveralSec } from "../../utils";
import { AccountModal } from "../components/general/modals/accountModal.component";
const logger = new Logger("Base Page");

export abstract class BasePage {
  readonly page: Page;

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

  constructor(page: Page) {
    this.page = page;
    this.header = new Header(this.page.locator("header[data-test-id='application-header']"));
    this.profile = new Profile(this.page.locator("[data-test-id='profile'] ul"));
    this.notifications = new Notifications(this.page.locator("[data-test-id='notifications-popup']"));
    this.quickLinks = this.page.locator("nav[data-test-id='quick-links']");
    this.priceTicker = this.page.locator("div[data-test-id='price-ticker']");
    this.tooltip = this.page.locator("div.MuiSnackbarContent-message");
    this.otpForm = new TwoFactor(this.page.locator("[data-test-id*='two-factor-form-otp']"));
    this.yubiForm = new TwoFactor(this.page.locator("[data-test-id*='two-factor-form-yubi']"));
    this.twoFactorForm = new TwoFactor(this.page.locator("[data-test-id*='two-factor-form-wrapper']"));
    this.twoFactorModal = new TwoFactor(this.page.locator("div[aria-labelledby='two-factor-reminder-dialog']"));
    this.iframe = this.page.locator("iframe[title='MGUI']");
    this.verifyDialog = new Modal(this.page.locator("[data-test-id='verify-dialog']"), this.page);
    this.chooseAccount = new AccountModal(this.page.locator("div[role='dialog']"), this.page);
  }

  async setHTTPHeaders(): Promise<void> {
    await this.page.setExtraHTTPHeaders(CLIENT_HEADERS);
  }

  async goto(url: string) {
    await this.setHTTPHeaders();
    await this.page.goto(url);
    await this.page.waitForURL(new RegExp(url), {
      waitUntil: "commit",
    });
    await this.page.waitForSelector("div#root");
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
    const visibility = await this.verifyDialog.el.isVisible();

    if (visibility) {
      await this.verifyDialog.buttonClose.click();
    }
  }

  async switchUserAccount(account: ACCOUNT_GROUPS): Promise<void> {
    await this.header.profileButton.click();
    await this.profile.switchAccount.click();
    await this.chooseAccount.clickButtonByText(account);
  }
}
