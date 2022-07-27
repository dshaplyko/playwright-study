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
    isTradeRestricted: true,
    isDepositRestricted: false,
    isWithdrawalRestricted: false,
    tab: "transferFunds",
  },
  {
    testId: "@jira(XRT-186)",
    configOptions: {},
    isTradeRestricted: false,
    isDepositRestricted: true,
    isWithdrawalRestricted: false,
    tab: "paymentIn",
  },
  {
    testId: "@jira(XRT-187)",
    configOptions: {},
    isTradeRestricted: false,
    isDepositRestricted: false,
    isWithdrawalRestricted: true,
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
];
