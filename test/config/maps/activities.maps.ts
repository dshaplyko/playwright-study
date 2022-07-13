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
    difference: 89,
  },
  {
    period: "1Y",
    option: 4,
    difference: 365,
  },
];

export const currenciesMap = [
  {
    id: "@jira(XRT-112)",
    type: REPORT_TYPES.TRANSACTION,
  },
  {
    id: "@jira(XRT-113)",
    type: REPORT_TYPES.TRADE,
  },
  {
    id: "@jira(XRT-114)",
    type: REPORT_TYPES.RFQ,
  },
];

export const reportDownloadMap = [
  {
    testId: "@jira(XRT-118)",
    type: REPORT_TYPES.TRANSACTION,
    field: "Currency",
  },
  {
    testId: "@jira(XRT-116)",
    type: REPORT_TYPES.TRADE,
    field: "Traded Currency",
  },
  {
    testId: "@jira(XRT-117)",
    type: REPORT_TYPES.RFQ,
    field: "Traded Currency",
  },
];
