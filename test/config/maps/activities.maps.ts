import { REPORT_TYPES } from "../enums";

export const presetDatesMap = [
  {
    period: "24H",
    option: 0,
    difference: 1,
  },
  {
    period: "7d",
    option: 1,
    difference: 7,
  },
  {
    period: "1M",
    option: 2,
    difference: 28,
  },
  {
    period: "3M",
    option: 3,
    difference: 90,
  },
  {
    period: "1Y",
    option: 4,
    difference: 365,
  },
];

export const currenciesMap = [
  {
    id: "@jira(BCTGWEBPWU-14)",
    type: REPORT_TYPES.TRANSACTION,
  },
  {
    id: "@jira(BCTGWEBPWU-15)",
    type: REPORT_TYPES.TRADE,
  },
  {
    id: "@jira(BCTGWEBPWU-16)",
    type: REPORT_TYPES.RFQ,
  },
];

export const reportDownloadMap = [
  {
    testId: "@jira(BCTGWEBPWU-18)",
    type: REPORT_TYPES.TRANSACTION,
    field: "Currency",
  },
  {
    testId: "@jira(BCTGWEBPWU-19)",
    type: REPORT_TYPES.TRADE,
    field: "Traded Currency",
  },
  {
    testId: "@jira(BCTGWEBPWU-20)",
    type: REPORT_TYPES.RFQ,
    field: "Traded Currency",
  },
];
