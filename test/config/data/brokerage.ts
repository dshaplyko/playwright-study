export const SUCCESS_QUOTE = {
  status: 200,
  data: {
    responseCode: "FULL_QUOTE",
    settlementCurrency: "USD",
    tradedCurrency: "BTC",
    quotedSettlementCurrencyAmount: 4797.1,
    quotedTradedCurrencyAmount: 0.1,
    retailRateInSettlementCurrency: 47971.0,
    quoteId: "02c40a6e-296c-4c18-a4eb-cdabb9dc3e9a",
    timeToLive: 6994,
    quoteExpiresAt: "Feb 3, 2022 8:31:01 PM",
    quoteCreatedAt: "Feb 3, 2022 8:30:54 PM",
    isPtsSufficient: true,
  },
};

export const SAVE_TRADE = {
  data: {
    responseCode: "EXECUTED",
    tradeId: "35ea029a-d535-4ee9-ba81-16bf6fe784b4",
    quoteId: "cfa85e7b-a721-403e-94bc-30a545ca06e6",
  },
  status: "OK",
};
