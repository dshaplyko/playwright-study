import { CURRENCIES } from "../enums";

export const transferFundsTabsMap = [
  {
    id: 95,
    tab: "paymentIn",
    name: /Payment In|Deposit/,
    text: /Payment In/,
  },
  {
    id: 96,
    tab: "paymentOut",
    name: /Payment Out|Withdrawal/,
    text: /Payment Out/,
  },
  {
    id: 97,
    tab: "transferFunds",
    name: /Transfer Funds|Allocate Funds/,
    text: /Transferring funds/,
  },
];

export const configurationFundsMap = [
  {
    testId: 98,
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
    testId: 99,
    configOptions: {},
    accountOptions: {
      depositRestricted: true,
    },
    tab: "paymentIn",
  },
  {
    testId: 100,
    configOptions: {},
    accountOptions: {
      withdrawalRestricted: true,
    },
    tab: "paymentOut",
  },
];

export const fundsTabViewMap = [
  {
    test: "should open Payment In tab @smoke @jira(BCTGWEBPWU-101)",
    tab: "paymentIn",
    paymentIn: true,
    paymentOut: false,
    transferFunds: false,
    header: "Payment In",
    title: "Recent payment in",
  },
  {
    test: "should open Payment Out tab @smoke @jira(BCTGWEBPWU-102)",
    tab: "paymentOut",
    paymentIn: false,
    paymentOut: true,
    transferFunds: false,
    header: "Payment Out",
    title: "Recent payment in",
  },
  {
    test: "should open Transfer Funds tab @smoke @jira(BCTGWEBPWU-103)",
    tab: "transferFunds",
    paymentIn: false,
    paymentOut: false,
    transferFunds: true,
    header: /Allocate Funds|Transfer Funds/,
    title: "Recent payment in",
  },
];

export const fundsCurrenciesMap = [
  {
    name: "should contain proper Currencies in Payment In tab @criticalPath @jira(BCTGWEBPWU-104)",
    tab: "paymentIn",
  },
  {
    name: "should contain proper Currencies in Payment Out tab @criticalPath @jira(BCTGWEBPWU-105)",
    tab: "paymentOut",
  },
  {
    name: "should contain proper Currencies in Transfer Funds tab @criticalPath @jira(BCTGWEBPWU-106)",
    tab: "transferFunds",
  },
];

export const fundsTransactionsMap = [
  {
    name: "should display recent Payment In transactions @extended @jira(BCTGWEBPWU-170)",
    tab: "paymentIn",
    title: "Recent Payment In",
  },
  {
    name: "should display recent Transfer Funds transactions @extended @jira(BCTGWEBPWU-363)",
    tab: "transferFunds",
    title: "Transfer Funds",
  },
  {
    name: "should display recent Payment Out transactions @extended @jira(BCTGWEBPWU-171)",
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
    name: "should display for HKD currency @criticalPath @jira(BCTGWEBPWU-743) @jira(BCTGWEBPWU-741)",
    currency: CURRENCIES.HKD,
    expectedMessage: "HKD apply.",
  },
  {
    name: "should display for USD currency @criticalPath @jira(BCTGWEBPWU-743) @jira(BCTGWEBPWU-735)",
    currency: CURRENCIES.USD,
    expectedMessage: "USD apply.",
  },
  {
    name: "should display for AUD currency @criticalPath @jira(BCTGWEBPWU-743) @jira(BCTGWEBPWU-737)",
    currency: CURRENCIES.AUD,
    expectedMessage: "AUD apply.",
  },
  {
    name: "should display for SGD currency @criticalPath @jira(BCTGWEBPWU-743) @jira(BCTGWEBPWU-742)",
    currency: CURRENCIES.SGD,
    expectedMessage: "SGD apply.",
  },
  {
    name: "should display for EUR currency @criticalPath @jira(BCTGWEBPWU-743) @jira(BCTGWEBPWU-736)",
    currency: CURRENCIES.EUR,
    expectedMessage: "EUR apply.",
  },
  {
    name: "should display for GBP currency @criticalPath @jira(BCTGWEBPWU-743) @jira(BCTGWEBPWU-740)",
    currency: CURRENCIES.GBP,
    expectedMessage: "GBP apply.",
  },
];

export const paymentInModalFiatMap = [
  {
    name: "should display for All Fiat (Except of CHF) currencies @criticalPath @jira(BCTGWEBPWU-746)",
    currency: CURRENCIES.USD,
    expectedMessage:
      "Please supply the intended amount of your Payment In. The following screen will provide the payment details. Please also note the following:",
  },
  {
    name: "should display for CHF currency @criticalPath @jira(BCTGWEBPWU-747)",
    currency: CURRENCIES.CHF,
    expectedMessage: "Please specify the Payment In amount and do not enter cents. Please also note the following:",
  },
];

export const paymentInModalDigitalAssetMap = [
  {
    name: "should display for All Digital Assets (Except of XRP) @criticalPath @jira(BCTGWEBPWU-748)",
    currency: CURRENCIES.BTC,
    expectedMessage:
      "Please supply the intended amount of your Payment In. The following screen will provide the payment details. Please also note the following:",
    isAdditionalLabelVisible: true,
  },
  {
    name: "should display for XRP @criticalPath @jira(BCTGWEBPWU-XXX)",
    currency: CURRENCIES.XRP,
    expectedMessage:
      "Please supply the intended amount of your Payment In. The following screen will provide the payment details. Please also note the following:",
    isAdditionalLabelVisible: false,
  },
];
