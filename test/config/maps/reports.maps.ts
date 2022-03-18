import { REPORT_FORM, REPORT_TYPES } from "../enums";

export const reportsPageMap = [
  {
    name: "should download Transaction Report @criticalPath @jira(BCTGWEBPWU-978)",
    form: REPORT_FORM.TRANSACTION,
    field: "Currency",
    type: REPORT_TYPES.TRANSACTION,
  },
  {
    name: "should download Trade Report @criticalPath @jira(BCTGWEBPWU-979)",
    form: REPORT_FORM.TRADE,
    field: "Traded Currency",
    type: REPORT_TYPES.TRADE,
  },
  {
    name: "should download Transfer Fund Report @criticalPath @jira(BCTGWEBPWU-980)",
    form: REPORT_FORM.TRANSFER_FUNDS,
    field: "Currency",
    type: REPORT_TYPES.TRANSFER_FUNDS,
  },
  {
    name: "should download Buy/Sell Report @criticalPath @jira(BCTGWEBPWU-981)",
    form: REPORT_FORM.BUY_SELL,
    field: "Traded Currency",
    type: REPORT_TYPES.RFQ,
  },
];
