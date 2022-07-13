import { Locator, Page } from "@playwright/test";
import { BasePage } from "./Base.page";
import { NavigationMenu } from "../components/console/navigation.component";
import { TranslationModal } from "../components/general/modals/translationModal.component";
import { ManageLanguagesModal } from "../components/general/modals/manageLanguagesModal.component";
import { Modal } from "../components/general/modals/modal.component";
import { Main } from "../components/console/tabs/main.component";
import { ConsoleHeader } from "../components/console/console.header.component";
import { CONSOLE_ITEMS, URLs } from "../../config";
import { Features } from "../components/console/tabs/features.component";
import { Pages } from "../components/console/tabs/pages.component";
import { General } from "../components/console/tabs/general.component";
import { Images } from "../components/console/tabs/images.component";
import { Media } from "../components/console/tabs/media.component";
import { SocialMedia } from "../components/console/tabs/socialMedia.component";
import { Posts } from "../components/console/tabs/posts.component";
import { Theming } from "../components/console/tabs/theming.component";
import { Translation } from "../components/console/tabs/translation.component";

export class ConsolePage extends BasePage {
  readonly url: string;

  readonly navigationMenu: NavigationMenu;

  readonly consoleHeader: ConsoleHeader;

  readonly mainTab: Main;

  readonly translationModal: TranslationModal;

  readonly manageLanguagesModal: ManageLanguagesModal;

  readonly modal: Modal;

  constructor(page: Page, url = "/admin") {
    super(page);
    this.url = url;
    this.navigationMenu = new NavigationMenu(this.page.locator(".MuiDrawer-docked"));
    this.consoleHeader = new ConsoleHeader(this.page.locator("header.MuiAppBar-positionFixed"), this.page);
    this.mainTab = new Main(this.page.locator("main"), this.page);
    this.modal = new Modal(this.page.locator("div[role='dialog']"), this.page);
    this.translationModal = new TranslationModal(this.modal.rootEl, this.page);
    this.manageLanguagesModal = new ManageLanguagesModal(this.modal.rootEl, this.page);
  }

  private initTab<T extends Main>(Tab: new (locator: Locator, page: Page) => T): T {
    return new Tab(this.mainTab.rootEl, this.page);
  }

  public getTab(name: CONSOLE_ITEMS.FEATURES): Features;
  public getTab(name: CONSOLE_ITEMS.PAGES): Pages;
  public getTab(name: CONSOLE_ITEMS.GENERAL): General;
  public getTab(name: CONSOLE_ITEMS.IMAGES): Images;
  public getTab(name: CONSOLE_ITEMS.MEDIA): Media;
  public getTab(name: CONSOLE_ITEMS.SOCIAL_MEDIA): SocialMedia;
  public getTab(name: CONSOLE_ITEMS.POSTS): Posts;
  public getTab(name: CONSOLE_ITEMS.THEMING): Theming;
  public getTab(name: CONSOLE_ITEMS.TRANSLATION): Translation;
  public getTab(name: CONSOLE_ITEMS): Main {
    switch (name) {
      case CONSOLE_ITEMS.FEATURES:
        return this.initTab(Features);
      case CONSOLE_ITEMS.PAGES:
        return this.initTab(Pages);
      case CONSOLE_ITEMS.GENERAL:
        return this.initTab(General);
      case CONSOLE_ITEMS.IMAGES:
        return this.initTab(Images);
      case CONSOLE_ITEMS.MEDIA:
        return this.initTab(Media);
      case CONSOLE_ITEMS.SOCIAL_MEDIA:
        return this.initTab(SocialMedia);
      case CONSOLE_ITEMS.POSTS:
        return this.initTab(Posts);
      case CONSOLE_ITEMS.THEMING:
        return this.initTab(Theming);
      case CONSOLE_ITEMS.TRANSLATION:
        return this.initTab(Translation);
    }
  }

  async openTab(tab: CONSOLE_ITEMS): Promise<void> {
    await this.goto();
    await this.navigationMenu.chooseItem(tab);
  }

  async goto(): Promise<void> {
    await super.goto(this.url);
  }

  async mockEmptyItems(items: "POSTS" | "PAGES"): Promise<void> {
    await this.api.mockData([], URLs[items]);
    await this.openTab(CONSOLE_ITEMS[items]);
  }

  async mockPDAX(): Promise<void> {
    await this.api.mockConfig({
      site: {
        enum: "_OSLLC_COM",
      },
    });
  }
}
