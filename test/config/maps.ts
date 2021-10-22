export const portfolioMap = [
  {
    tname: "Your Portfolio",
    widget: "YOUR_PORTFOLIO",
    text: "YOUR PORTFOLIO",
  },
  {
    tname: "Digital Assets",
    widget: "DIGITAL_ASSETS",
    text: "DIGITAL ASSETS",
  },
  {
    tname: "FIAT currencies",
    widget: "FIAT_CURRENCIES",
    text: "FIAT CURRENCIES",
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
    link: "api reference",
    pageTo: "pages/api",
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

export const configOptionsMap = [
  {
    testName: "should hide Payment in / Payment out / Transfer Funds buttons on the Portfolio Page",
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
    testName: "should hide Exchange button and column / Transfer Funds on the Portfolio Page",
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
    testName: "should turn on Leverage button and column on the Portfolio Page",
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
    testName: "should turn on Buy and hide IRFQ buttons on the Portfolio Page",
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
    testName: "should turn on Cash Out button on the Portfolio Page",
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
