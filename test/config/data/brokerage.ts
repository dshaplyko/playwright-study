export const limitData = {
  limitAmount: 1000,
  exposureAmount: 2000,
  isNetSettlementMode: true,
  limitCurrency: "USD",
  exposureCurrency: "USD",
  limitUtilisation: "86.00%",
};

export const quoteData = {
  status: 200,
  data: {
    responseCode: "FULL_QUOTE",
    buyTradedCurrency: true,
    settlementCurrency: "USD",
    tradedCurrency: "BTC",
    quotedSettlementCurrencyAmount: 19792.95,
    quotedTradedCurrencyAmount: 1.0,
    retailRateInSettlementCurrency: 19792.95318,
    quoteId: "e0eb807e-d39c-471c-8848-96c950060671",
    timeToLive: 6984,
    quoteExpiresAt: "Jul 12, 2022 4:08:21 PM",
    quoteCreatedAt: "Jul 12, 2022 4:08:13 PM",
    isPtsSufficient: true,
    isMtPreDealPreCheckSuccess: false,
  },
};

export const quoteErrorData = {
  status: 200,
  data: {
    buyTradedCurrency: true,
    errorCode: "p500005",
    isMtPreDealPreCheckSuccess: false,
    quoteCreatedAt: "Jul 11, 2022 7:38:15 PM",
    responseCode: "",
    settlementCurrency: "USD",
    tradedCurrency: "ETH",
  },
};

export const tradeErrorData = {
  status: "OK",
  data: {
    errorCode: "s100026",
    responseCode: "QUOTE_EXPIRED",
  },
};

export const tradeError = {
  apiVersion: "1.0.0",
  timestamp: 1657613882,
  error: "SYSTEM_ERROR",
};

export const timeToLiveData = {
  status: 200,
  data: {
    responseCode: "FULL_QUOTE",
    settlementCurrency: "USD",
    tradedCurrency: "BTC",
    quotedSettlementCurrencyAmount: 20.98,
    quotedTradedCurrencyAmount: 0.001,
    retailRateInSettlementCurrency: 20979.0,
    quoteId: "253cdbcc-fde3-4f45-86af-733f8bbcd19c",
    timeToLive: 15,
    quoteExpiresAt: "Jun 19, 2022 4:10:57 PM",
    quoteCreatedAt: "Jun 19, 2022 4:10:50 PM",
    isPtsSufficient: true,
    isMtPreDealPreCheckSuccess: false,
  },
};

export const networkErrorData = {
  apiVersion: "1.0.0",
  timestamp: 1655368847,
  error: {
    i18n: "error.user.activity.restricted.trading",
    params: {},
  },
};
