export const EMPTY_TRANSFER_OUT = {
  apiVersion: "1.0.0",
  timestamp: 1643880711,
  data: {},
};

export const NON_EMPTY_TRANSFER_OUT = {
  apiVersion: "1.0.0",
  timestamp: 1643885427,
  data: { ccy: "USD", dailyThresholdInCcy: 10, active: true },
};

export const CURRENCY_ADDED = {
  apiVersion: "1.0.0",
  timestamp: 1643883784,
  data: {
    ccy: "USD",
    dailyThresholdInCcy: 10.0,
    active: true,
    i18nMessage: "waiveEmailConfirmationSettings.saved.success",
  },
};

export const DELETE_SUCCESS = {
  apiVersion: "1.0.0",
  timestamp: 1643883866,
  data: {
    i18n: "waiveEmailConfirmationSettings.deleted.success",
  },
};

export const CHANGE_PASSWORD = {
  apiVersion: "1.0.0",
  timestamp: 1644395113,
  data: {
    firstTimePasswordChanged: true,
    i18nMessage: "changepassword.success.message",
  },
};

export const OTP_KEYS = {
  apiVersion: "1.0.0",
  timestamp: 1645028631,
  data: {
    allowAdd: false,
    list: [
      {
        uuid: "f978d5c1-8f10-11ec-b119-02ad3b59aeae",
        alias: "Time-based One-time Password 1",
      },
      {
        uuid: "b1d919c8-8f44-11ec-b119-02ad3b59aeae",
        alias: "Time-based One-time Password 2",
      },
    ],
  },
};

export const EMPTY_API = {
  apiVersion: "1.0.0",
  timestamp: 1645090557,
  data: {
    webKeys: [],
    maxWebApiKey: 6,
  },
};

export const NON_EMPTY_API = {
  apiVersion: "1.0.0",
  timestamp: 1645091035,
  data: {
    apiKeyList: [
      {
        displayId: "14684",
        displayAlias: "default1",
        displayApiKey: "f9ae8897-6270-42ab-a584-8655157627a3",
        moveFunds: false,
        placeOrders: false,
      },
      {
        displayId: "14685",
        displayAlias: "default2",
        displayApiKey: "b795fcd8-1d75-4e8e-9b1e-2ebb83785e07",
        moveFunds: false,
        placeOrders: false,
      },
      {
        displayId: "14686",
        displayAlias: "default3",
        displayApiKey: "50f05ac1-f7eb-4491-aca3-cc3d861efa81",
        moveFunds: false,
        placeOrders: false,
      },
      {
        displayId: "14687",
        displayAlias: "default4",
        displayApiKey: "637ab507-8c68-4311-bab1-f83466b09e39",
        moveFunds: false,
        placeOrders: false,
      },
      {
        displayId: "14688",
        displayAlias: "default5",
        displayApiKey: "31f4edfc-950d-4e45-bffd-9027680dacb6",
        moveFunds: false,
        placeOrders: false,
      },
      {
        displayId: "14689",
        displayAlias: "default6",
        displayApiKey: "3340d6e4-ed8d-44d2-ae7d-9c452a9cb129",
        moveFunds: false,
        placeOrders: false,
      },
    ],
    webKeys: [
      {
        displayId: "14684",
        displayAlias: "default1",
        displayApiKey: "f9ae8897-6270-42ab-a584-8655157627a3",
        moveFunds: false,
        placeOrders: false,
      },
      {
        displayId: "14685",
        displayAlias: "default2",
        displayApiKey: "b795fcd8-1d75-4e8e-9b1e-2ebb83785e07",
        moveFunds: false,
        placeOrders: false,
      },
      {
        displayId: "14686",
        displayAlias: "default3",
        displayApiKey: "50f05ac1-f7eb-4491-aca3-cc3d861efa81",
        moveFunds: false,
        placeOrders: false,
      },
      {
        displayId: "14687",
        displayAlias: "default4",
        displayApiKey: "637ab507-8c68-4311-bab1-f83466b09e39",
        moveFunds: false,
        placeOrders: false,
      },
      {
        displayId: "14688",
        displayAlias: "default5",
        displayApiKey: "31f4edfc-950d-4e45-bffd-9027680dacb6",
        moveFunds: false,
        placeOrders: false,
      },
      {
        displayId: "14689",
        displayAlias: "default6",
        displayApiKey: "3340d6e4-ed8d-44d2-ae7d-9c452a9cb129",
        moveFunds: false,
        placeOrders: false,
      },
    ],
    maxWebApiKey: 6,
  },
};
