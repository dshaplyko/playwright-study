export const userPersmissionsMap = [
  {
    jiraId: "jira(XRT-498)",
    permissions: ["VIEW_ACTIVITIES"],
    link: "activitiesLink",
  },
  {
    jiraId: "jira(XRT-499)",
    permissions: ["RFQ_DEAL"],
    link: "buySellLink",
  },
  {
    jiraId: "jira(XRT-500)",
    permissions: ["INTERNAL_TRANSFER"],
    link: "fundsLink",
  },
  {
    jiraId: "jira(XRT-501)",
    permissions: ["TRADE_PLACE_ORDER"],
    link: "tradeLink",
  },
];

export const fundsPersmissionsMap = [
  {
    jiraId: "@jira(XRT-502)",
    tab: "transferFunds",
    permissions: ["DEPOSIT", "WITHDRAWAL"],
  },
  {
    jiraId: "@jira(XRT-503)",
    tab: "paymentIn",
    permissions: ["WITHDRAWAL", "INTERNAL_TRANSFER"],
  },
  {
    jiraId: "@jira(XRT-504)",
    tab: "paymentOut",
    permissions: ["DEPOSIT", "INTERNAL_TRANSFER"],
  },
];
