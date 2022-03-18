import { WIDGETS } from "../enums";

export const clickTradingButtonsMap = [
  {
    button: "paymentIn",
    url: /funds/,
  },
  {
    button: "paymentOut",
    url: /funds/,
  },
  {
    button: "transferFunds",
    url: /funds/,
  },
  {
    button: "IRFQ",
    url: /buysell/,
  },
];

export const headerLinksMap = [
  {
    testName: "activity",
    link: "activitiesLink",
  },
  {
    testName: "portfolio",
    link: "portfolioLink",
  },
  {
    testName: "funds",
    link: "fundsLink",
  },
  {
    testName: "trade",
    link: "tradeLink",
  },
  {
    testName: "buysell",
    link: "buySellLink",
  },
  {
    testName: "contacts",
    link: "digitalAssetAddressLink",
  },
];

export const quickLinksMap = [
  {
    link: "about us",
    pageTo: "pages/about",
  },
  {
    link: "fees",
    pageTo: "pages/fees",
  },
  {
    link: "security",
    pageTo: "pages/security",
  },
  {
    link: "faq",
    pageTo: "pages/faq",
  },
  {
    link: "terms of use",
    pageTo: "pages/terms",
  },
  {
    link: "privacy policy",
    pageTo: "pages/privacy",
  },
  {
    link: "contact us",
    pageTo: "pages/contact",
  },
];

export const portfolioMap = [
  {
    widget: WIDGETS.YOUR_PORTFOLIO,
    name: "YOUR PORTFOLIO",
  },
  {
    widget: WIDGETS.DIGITAL_ASSETS,
    name: "DIGITAL ASSETS",
  },
  {
    widget: WIDGETS.FIAT_CURRENCIES,
    name: "FIAT CURRENCIES",
  },
];

export const featureHighlightMap = [
  {
    testName: "should display Get Verified as a feature Highlight @criticalPath @jira(BCTGWEBPWU-81)",
    config: {
      items: ["GET_VERIFIED"],
    },
  },
  {
    testName: "should display Cash Out as a feature Highlight @criticalPath @jira(BCTGWEBPWU-82)",
    config: {
      items: ["CASH_OUT"],
    },
  },
  {
    testName: "should display Payment In as a feature Highlight @criticalPath @jira(BCTGWEBPWU-83)",
    config: {
      items: ["DEPOSIT_CASH"],
    },
  },
  {
    testName: "should display Purchase as a feature Highlight @criticalPath @jira(BCTGWEBPWU-84)",
    config: {
      items: ["BUY_COIN"],
    },
  },
  {
    testName: "should display Transfer In as a feature Highlight @criticalPath @jira(BCTGWEBPWU-85)",
    config: {
      items: ["DEPOSIT_COIN"],
    },
  },
  {
    testName: "should display Enable 2 Factor @criticalPath @jira(BCTGWEBPWU-86)",
    config: {
      items: ["ENABLE_TWO_FACTOR"],
    },
  },
  {
    testName: "should display Your Console @criticalPath @jira(BCTGWEBPWU-87)",
    config: {
      items: ["NEW_SITE_CONSOLE"],
    },
  },
  {
    testName: "should display Register External Users @criticalPath @jira(BCTGWEBPWU-88)",
    config: {
      items: ["REGISTER_EXTERNAL_ADDRESSES"],
    },
  },
  {
    testName: "should display Customer Support @criticalPath @jira(BCTGWEBPWU-89)",
    config: {
      items: ["CUSTOMER_SUPPORT"],
    },
  },
];

export const tradingButtonsMap = [
  {
    testName: "should disable Payment In Button @criticalPath @jira(BCTGWEBPWU-78)",
    config: {
      depositRestricted: true,
      tradeRestricted: false,
    },
    paymentIn: true,
    paymentOut: true,
    exchange: false,
  },
  {
    testName: "should disable Payment Out Button @criticalPath @jira(BCTGWEBPWU-79)",
    config: {
      withdrawalRestricted: true,
      tradeRestricted: false,
    },
    paymentIn: false,
    paymentOut: true,
    exchange: false,
  },
  {
    testName: "should disable Exchange Button @criticalPath @jira(BCTGWEBPWU-80)",
    config: {
      tradeRestricted: true,
    },
    paymentIn: false,
    paymentOut: true,
    exchange: true,
  },
];

export const configOptionsMap = [
  {
    testName:
      "should hide Payment in / Payment out / Transfer Funds buttons on the Portfolio Page @criticalPath @jira(BCTGWEBPWU-67)",
    config: {
      features: {
        funds: {
          enabled: false,
        },
      },
    },
    paymentIn: false,
    paymentOut: false,
    transferFunds: false,
    exchange: true,
    IRFQ: true,
    leverage: false,
    buy: false,
    cashOut: false,
  },
  {
    testName:
      "should hide Exchange button and column / Transfer Funds button on the Portfolio Page @criticalPath @jira(BCTGWEBPWU-68) @jira(BCTGWEBPWU-69)",
    config: {
      features: {
        trade: {
          enabled: false,
        },
      },
    },
    paymentIn: true,
    paymentOut: true,
    transferFunds: false,
    exchange: false,
    IRFQ: true,
    leverage: false,
    buy: false,
    cashOut: false,
  },
  {
    testName:
      "should turn on Leverage button and column on the Portfolio Page @criticalPath @jira(BCTGWEBPWU-70) @jira(BCTGWEBPWU-71)",
    config: {
      leverage: {
        trade: {
          enabled: true,
        },
      },
    },
    paymentIn: true,
    paymentOut: true,
    transferFunds: true,
    exchange: true,
    IRFQ: true,
    leverage: true,
    buy: false,
    cashOut: false,
  },
  {
    testName: "should turn on Buy and hide IRFQ buttons on the Portfolio Page @criticalPath @jira(BCTGWEBPWU-72)",
    config: {
      features: {
        buyonly: true,
      },
    },
    paymentIn: true,
    paymentOut: true,
    transferFunds: true,
    exchange: true,
    IRFQ: false,
    leverage: false,
    buy: true,
    cashOut: false,
  },
  {
    testName: "should turn on Cash Out button on the Portfolio Page @criticalPath @jira(BCTGWEBPWU-73)",
    config: {
      features: {
        debitCards: true,
      },
    },
    paymentIn: true,
    paymentOut: true,
    transferFunds: true,
    exchange: true,
    IRFQ: true,
    leverage: false,
    buy: false,
    cashOut: true,
  },
];

export const configWidgetsMap = [
  {
    testName: "should disable Digital Assets and FIAT Currencies widgets @criticalPath @jira(BCTGWEBPWU-75)",
    config: {
      portfolio: {
        showAssetsBox: false,
      },
    },
    yourPortfolio: true,
    digitalAssets: false,
    fiatCurrencies: false,
    chart: true,
    tradingButtons: true,
    holdingList: true,
    yourConsole: true,
  },
  {
    testName: "should disable Your Portfolio widget @criticalPath @jira(BCTGWEBPWU-74)",
    config: {
      features: {
        dashboardTotalBalance: false,
      },
    },
    yourPortfolio: false,
    digitalAssets: true,
    fiatCurrencies: true,
    chart: true,
    tradingButtons: true,
    holdingList: true,
    yourConsole: true,
  },
  {
    testName: "should disable All Widgets @criticalPath @jira(BCTGWEBPWU-76)",
    config: {
      portfolio: {
        showBalanceBox: false,
      },
    },
    yourPortfolio: false,
    digitalAssets: false,
    fiatCurrencies: false,
    chart: true,
    tradingButtons: true,
    holdingList: true,
    yourConsole: true,
  },
  {
    testName: "should disable All except of Feature Highlight Component @criticalPath @jira(BCTGWEBPWU-77)",
    config: {
      portfolio: {
        showAsset: false,
      },
    },
    yourPortfolio: false,
    digitalAssets: false,
    fiatCurrencies: false,
    chart: false,
    tradingButtons: false,
    holdingList: false,
    yourConsole: true,
  },
];
