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

export const basketQuoteData = {
  status: 200,
  data: {
    responseCode: "FULL_QUOTE",
    isPtsSufficient: true,
    timeToLive: 6902,
    quoteResponses: [
      {
        responseCode: "FULL_QUOTE",
        settlementCurrency: "USD",
        tradedCurrency: "BCH",
        quotedSettlementCurrencyAmount: 0.09,
        quotedTradedCurrencyAmount: 0.00091808,
        retailRateInSettlementCurrency: 99.011944,
        quoteId: "bbe24b5f-06a4-4bd2-9e8b-b51a7ecd965d",
        timeToLive: 6902,
        quoteExpiresAt: "Jul 14, 2022 3:54:53 PM",
        quoteCreatedAt: "Jul 14, 2022 3:54:46 PM",
        isMtPreDealPreCheckSuccess: false,
      },
      {
        responseCode: "FULL_QUOTE",
        settlementCurrency: "USD",
        tradedCurrency: "ETH",
        quotedSettlementCurrencyAmount: 3.01,
        quotedTradedCurrencyAmount: 0.00281409,
        retailRateInSettlementCurrency: 1069.71455,
        quoteId: "5bfbdace-3f96-4517-933d-46523fa6da60",
        timeToLive: 6923,
        quoteExpiresAt: "Jul 14, 2022 3:54:53 PM",
        quoteCreatedAt: "Jul 14, 2022 3:54:46 PM",
        isMtPreDealPreCheckSuccess: false,
      },
      {
        responseCode: "FULL_QUOTE",
        settlementCurrency: "USD",
        tradedCurrency: "BTC",
        quotedSettlementCurrencyAmount: 6.9,
        quotedTradedCurrencyAmount: 0.00165326,
        retailRateInSettlementCurrency: 4172.86738,
        quoteId: "e7bc45a8-5a70-4761-b557-6dae7bfdd91f",
        timeToLive: 6955,
        quoteExpiresAt: "Jul 14, 2022 3:54:53 PM",
        quoteCreatedAt: "Jul 14, 2022 3:54:46 PM",
        isMtPreDealPreCheckSuccess: false,
      },
    ],
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
