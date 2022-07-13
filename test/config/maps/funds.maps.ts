import { CURRENCIES } from "../enums";

export const transferFundsTabsMap = [
  {
    id: "@jira(XRT-183)",
    tab: "paymentIn",
    name: /Payment In|Deposit/,
    text: /Payment In/,
  },
  {
    id: "@jira(XRT-184)",
    tab: "paymentOut",
    name: /Payment Out|Withdrawal/,
    text: /Payment Out/,
  },
  {
    id: "@jira(XRT-185)",
    tab: "transferFunds",
    name: /Transfer Funds|Allocate Funds/,
    text: /Transferring funds/,
  },
];

export const configurationFundsMap = [
  {
    testId: "@jira(XRT-188)",
    configOptions: {
      features: {
        otcTrade: {
          enabled: false,
        },
        simpleTrade: {
          enabled: false,
        },
        trade: {
          enabled: false,
        },
      },
    },
    accountOptions: {
      tradeRestricted: true,
    },
    tab: "transferFunds",
  },
  {
    testId: "@jira(XRT-186)",
    configOptions: {},
    accountOptions: {
      depositRestricted: true,
    },
    tab: "paymentIn",
  },
  {
    testId: "@jira(XRT-187)",
    configOptions: {},
    accountOptions: {
      withdrawalRestricted: true,
    },
    tab: "paymentOut",
  },
];

export const fundsTabViewMap = [
  {
    test: "should open Payment In tab @smoke @jira(XRT-203)",
    tab: "paymentIn",
    paymentIn: "true",
    paymentOut: "false",
    transferFunds: "false",
    header: "Payment In",
    title: "Recent payment in",
  },
  {
    test: "should open Payment Out tab @smoke @jira(XRT-152)",
    tab: "paymentOut",
    paymentIn: "false",
    paymentOut: "true",
    transferFunds: "false",
    header: "Payment Out",
    title: "Recent payment in",
  },
  {
    test: "should open Transfer Funds tab @smoke @jira(XRT-218)",
    tab: "transferFunds",
    paymentIn: "false",
    paymentOut: "false",
    transferFunds: "true",
    header: /Allocate Funds|Transfer Funds/,
    title: "Recent payment in",
  },
];

export const fundsCurrenciesMap = [
  {
    name: "should contain proper Currencies in Payment In tab @criticalPath @jira(XRT-210)",
    tab: "paymentIn",
  },
  {
    name: "should contain proper Currencies in Payment Out tab @criticalPath @jira(XRT-160)",
    tab: "paymentOut",
  },
  {
    name: "should contain proper Currencies in Transfer Funds tab @criticalPath @jira(XRT-219)",
    tab: "transferFunds",
  },
];

export const fundsTransactionsMap = [
  {
    name: "should display recent Payment In transactions @extended @jira(XRT-213)",
    tab: "paymentIn",
    title: "Recent Payment In",
  },
  {
    name: "should display recent Transfer Funds transactions @extended @jira(XRT-215)",
    tab: "transferFunds",
    title: "Transfer Funds",
  },
  {
    name: "should display recent Payment Out transactions @extended @jira(XRT-161)",
    tab: "paymentOut",
    title: "Recent Payment Out",
  },
];

export const fundsHelpModalsMap = [
  { currency: CURRENCIES.USD, type: "Fiat" },
  { currency: CURRENCIES.BTC, type: "Digital Asset" },
];

export const paymentOutModalMap = [
  {
    name: "should display for HKD currency @criticalPath @jira(XRT-196) @jira(XRT-194)",
    currency: CURRENCIES.HKD,
    expectedMessage: /HKD apply./,
  },
  {
    name: "should display for USD currency @criticalPath @jira(XRT-196) @jira(XRT-189)",
    currency: CURRENCIES.USD,
    expectedMessage: /USD apply./,
  },
  {
    name: "should display for AUD currency @criticalPath @jira(XRT-196) @jira(XRT-191)",
    currency: CURRENCIES.AUD,
    expectedMessage: /AUD apply./,
  },
  {
    name: "should display for SGD currency @criticalPath @jira(XRT-196) @jira(XRT-195)",
    currency: CURRENCIES.SGD,
    expectedMessage: /SGD apply./,
  },
  {
    name: "should display for EUR currency @criticalPath @jira(XRT-196) @jira(XRT-190)",
    currency: CURRENCIES.EUR,
    expectedMessage: /EUR apply./,
  },
  // TODO: Currency is turned off on trade-sg
  // {
  //   name: "should display for GBP currency @criticalPath @jira(XRT-196) @jira(XRT-193)",
  //   currency: CURRENCIES.GBP,
  //   expectedMessage: "GBP apply.",
  // }
];

export const paymentInModalFiatMap = [
  {
    name: "should display for All Fiat (Except of CHF) currencies @criticalPath @jira(XRT-198)",
    currency: CURRENCIES.USD,
    expectedMessage:
      /Please supply the intended amount of your Payment In. The following screen will provide the payment details. Please also note the following:/,
  },
  // TODO: Currency is turned off on trade-sg
  // {
  //   name: "should display for CHF currency @criticalPath @jira(XRT-199)",
  //   currency: CURRENCIES.CHF,
  //   expectedMessage: "Please specify the Payment In amount and do not enter cents. Please also note the following:",
  // },
];

export const paymentInModalDigitalAssetMap = [
  {
    name: "should display for All Digital Assets (Except of XRP) @criticalPath @jira(XRT-200)",
    currency: CURRENCIES.BTC,
    expectedMessage:
      /Please supply the intended amount of your Payment In. The following screen will provide the payment details. Please also note the following:/,
    isAdditionalLabelVisible: true,
  },
  // TODO: Currency is turned off on trade-sg
  // {
  //   name: "should display for XRP @criticalPath @jira(XRT-201)",
  //   currency: CURRENCIES.XRP,
  //   expectedMessage:
  //     "Please supply the intended amount of your Payment In. The following screen will provide the payment details. Please also note the following:",
  //   isAdditionalLabelVisible: false,
  // },
];

export const transferFundsPaymentMap = [
  {
    jiraId: "@jira(XRT-216) @jira(XRT-217)",
    type: "FIAT",
    currency: CURRENCIES.USD,
  },
  {
    jiraId: "@jira(XRT-495)",
    type: "crypto",
    currency: CURRENCIES.BTC,
  },
];
