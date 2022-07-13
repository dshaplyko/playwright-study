import { CURRENCIES } from "../enums";

export const brokerageMap = [
  {
    id: "@jira(XRT-254) @criticalPath",
    currencyToBuy: CURRENCIES.BTC,
    currencyBuyWith: CURRENCIES.USDT,
    button: "sellButton",
    amount: "0.1",
  },
  {
    id: "@jira(XRT-255) @criticalPath",
    currencyToBuy: CURRENCIES.ETH,
    currencyBuyWith: CURRENCIES.USD,
    button: "buyButton",
    amount: "0.0001",
  },
  {
    id: "@jira(XRT-261) @criticalPath",
    currencyToBuy: CURRENCIES.BTC,
    currencyBuyWith: CURRENCIES.USDT,
    button: "buyButton",
    amount: "0.0003",
  },
];

export const brokerageErrorsMap = [
  { error: "INSUFFICIENT_FUND" },
  { error: "INSUFFICIENT_LIQUIDITY" },
  { error: "PER_TXN_LIMIT_EXCEEDED" },
  { error: "PARTIAL_QUOTE" },
  { error: "NO_STOCK" },
  { error: "DAILY_LIMIT_EXCEEDED" },
  { error: "CANNOT_PRICE" },
  { error: "SELL_NOT_ALLOWED" },
  { error: "NO_PERMISSION" },
];

export const brokerageNetworkErrorMap = [
  {
    jiraId: "XRT-562",
    statusCode: 400,
    message: "Something went wrong. Please try again (400)",
  },
  {
    jiraId: "XRT-563",
    statusCode: 401,
    message: "Please logout and login again (401)",
  },
  {
    jiraId: "XRT-564",
    statusCode: 403,
    message: "Session has expired. Please logout and login again (403)",
  },
];
