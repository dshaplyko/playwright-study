import { WIDGETS } from "../enums";

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
  // {
  //   link: "contact us",
  //   pageTo: "pages/contact",
  // },
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
    testName: "Get Verified @criticalPath @jira(XRT-94)",
    config: ["GET_VERIFIED"],
  },
  {
    testName: "Cash Out @jira(XRT-96)",
    config: ["CASH_OUT"],
  },
  {
    testName: "Payment In @jira(XRT-97)",
    config: ["DEPOSIT_CASH"],
  },
  {
    testName: "Purchase @jira(XRT-100)",
    config: ["BUY_COIN"],
  },
  {
    testName: "Transfer In @jira(XRT-98)",
    config: ["DEPOSIT_COIN"],
  },
  {
    testName: "Enable 2 Factor @jira(XRT-99)",
    config: ["ENABLE_TWO_FACTOR"],
  },
  {
    testName: "Your Console @jira(XRT-101)",
    config: ["NEW_SITE_CONSOLE"],
  },
  {
    testName: "Customer Support @criticalPath @jira(XRT-102)",
    config: ["CUSTOMER_SUPPORT"],
  },
];

export const tradingButtonsMap = [
  {
    testName: "Payment In Button @jira(XRT-92)",
    config: {
      depositRestricted: true,
      tradeRestricted: false,
    },
    paymentIn: true,
    paymentOut: false,
    exchange: false,
  },
  {
    testName: "Payment Out Button @jira(XRT-93)",
    config: {
      withdrawalRestricted: true,
      tradeRestricted: false,
    },
    paymentIn: false,
    paymentOut: true,
    exchange: false,
  },
  {
    testName: "Exchange Button @jira(XRT-95)",
    config: {
      tradeRestricted: true,
    },
    paymentIn: false,
    paymentOut: false,
    exchange: true,
  },
];

export const configOptionsMap = [
  {
    testName:
      "hide Payment in / Payment out / Transfer Funds buttons on the Portfolio Page @criticalPath @jira(XRT-82)",
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
    testName: "hide Exchange button and column / Transfer Funds button @jira(XRT-81) @jira(XRT-83)",
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
    testName: "turn on Leverage button and column @jira(XRT-84) @jira(XRT-85)",
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
    testName: "turn on Buy and hide IRFQ buttons @jira(XRT-86)",
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
    testName: "turn on Cash Out button @jira(XRT-87)",
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
    testName: "Digital Assets and FIAT Currencies widgets @jira(XRT-89)",
    config: {
      portfolio: {
        showAssetsBox: false,
      },
    },
    yourPortfolio: true,
    digitalAssets: false,
    fiatCurrencies: false,
    tradingButtons: true,
    holdingList: true,
  },
  {
    testName: "Your Portfolio widget @jira(XRT-88)",
    config: {
      features: {
        dashboardTotalBalance: false,
      },
    },
    yourPortfolio: false,
    digitalAssets: true,
    fiatCurrencies: true,
    tradingButtons: true,
    holdingList: true,
  },
  {
    testName: "All Widgets @jira(XRT-90)",
    config: {
      portfolio: {
        showBalanceBox: false,
      },
    },
    yourPortfolio: false,
    digitalAssets: false,
    fiatCurrencies: false,
    tradingButtons: true,
    holdingList: true,
  },
  {
    testName: "All except of Feature Highlight Component @jira(XRT-91)",
    config: {
      portfolio: {
        showAsset: false,
      },
    },
    yourPortfolio: false,
    digitalAssets: false,
    fiatCurrencies: false,
    tradingButtons: false,
    holdingList: false,
  },
];
