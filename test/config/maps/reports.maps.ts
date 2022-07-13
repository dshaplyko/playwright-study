import { REPORT_FORM, REPORT_TYPES } from "../enums";

export const reportsPageMap = [
  {
    name: "should download Transaction Report @criticalPath @jira(XRT-326)",
    form: REPORT_FORM.TRANSACTION,
    field: "Currency",
    type: REPORT_TYPES.TRANSACTION,
  },
  {
    name: "should download Trade Report @criticalPath @jira(XRT-327)",
    form: REPORT_FORM.TRADE,
    field: "Traded Currency",
    type: REPORT_TYPES.TRADE,
  },
  {
    name: "should download Transfer Fund Report @criticalPath @jira(XRT-328)",
    form: REPORT_FORM.TRANSFER_FUNDS,
    field: "Currency",
    type: REPORT_TYPES.TRANSFER_FUNDS,
  },
  {
    name: "should download Buy/Sell Report @criticalPath @jira(XRT-330)",
    form: REPORT_FORM.BUY_SELL,
    field: "Traded Currency",
    type: REPORT_TYPES.RFQ,
  },
];
