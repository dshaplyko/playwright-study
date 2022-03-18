export const WITHDRAWAL_DATA = {
  timestamp: "1640247069006",
  data: [
    {
      fiats: {
        EUR: {
          methods: ["bank"],
        },
        JPY: {
          methods: ["bank"],
        },
        SGD: {
          methods: ["bank"],
        },
        HKD: {
          methods: ["bank"],
        },
        USD: {
          methods: ["bank"],
        },
        AUD: {
          methods: ["bank"],
        },
      },
      coins: {
        BCH: {
          methods: ["wallet"],
        },
        DAI: {
          methods: ["wallet"],
        },
        ENJ: {
          methods: ["wallet"],
        },
        BTC: {
          methods: ["wallet"],
        },
        XRP: {
          methods: ["wallet"],
        },
        LTC: {
          methods: ["wallet"],
        },
        HBAR: {
          methods: ["wallet"],
        },
        USDT: {
          methods: ["wallet"],
        },
      },
      banks: {
        AUD: {},
        EUR: {
          "10707": {
            alias: "gsdfgsdgdfg",
            id: "10707",
            feeAbs: 0e-8,
            min: 80.0,
            feePer: 0.0,
            ccy: "EUR",
            symbol: "€",
            limit: "500000.00",
            utilised: "80.00",
            balance: "875974.75",
            max: "499920.00",
            methodAlias: "BANK_WIRE.EUR",
            balanceOriginal: "875974.75",
            maxOriginal: "499920.00000000",
          },
          "10710": {
            alias: "Wells Fargo1",
            id: "10710",
            feeAbs: 0e-8,
            min: 80.0,
            feePer: 0.0,
            ccy: "EUR",
            symbol: "€",
            limit: "500000.00",
            utilised: "80.00",
            balance: "875974.75",
            max: "499920.00",
            methodAlias: "BANK_WIRE.EUR",
            balanceOriginal: "875974.75",
            maxOriginal: "499920.00000000",
          },
          "10712": {
            alias: "Wells Fargo bank",
            id: "10712",
            feeAbs: 0e-8,
            min: 80.0,
            feePer: 0.0,
            ccy: "EUR",
            symbol: "€",
            limit: "500000.00",
            utilised: "80.00",
            balance: "875974.75",
            max: "499920.00",
            methodAlias: "BANK_WIRE.EUR",
            balanceOriginal: "875974.75",
            maxOriginal: "499920.00000000",
          },
        },
        HKD: {},
        JPY: {},
        SGD: {},
        USD: {},
      },
      fiatMethods: {
        "0": {
          value: "bank",
          requiredBank: true,
        },
      },
      methods: {
        "0": {
          value: "wallet",
          i18n: "Transfer Out to Wallet",
        },
        "1": {
          value: "email",
          i18n: "Send via Email",
        },
      },
      fiatStats: {
        AUD: {
          balance: "3119.53",
          min: "100.00",
          max: "3119.53",
          limit: "6532032.00",
          utilized: "0.00",
          maxOriginal: "3119.53",
        },
        EUR: {
          balance: "876054.75",
          min: "80.00",
          max: "500000.00",
          limit: "500000.00",
          utilized: "0.00",
          maxOriginal: "500000.00",
        },
        HKD: {
          balance: "8200.00",
          min: "800.00",
          max: "8200.00",
          limit: "35000000.00",
          utilized: "0.00",
          maxOriginal: "8200",
        },
        JPY: {
          balance: "10000.00",
          min: "10000.00",
          max: "10000.00",
          limit: "496380710.00",
          utilized: "0.00",
          maxOriginal: "10000",
        },
        SGD: {
          balance: "10000.00",
          min: "100.00",
          max: "10000.00",
          limit: "6065202.00",
          utilized: "0.00",
          maxOriginal: "10000",
        },
        USD: {
          balance: "0.00",
          min: "100.00",
          max: "0.00",
          limit: "5000000.00",
          utilized: "0.00",
          maxOriginal: "0",
        },
      },
      cryptoStats: {
        BCH: {
          balance: "0.75000000",
          min: "25.00000000",
          max: "0.75000000",
          networkFee: 0.00015,
          limit: "1000000.00000000",
          utilised: "0.00000000",
          maxOriginal: "0.75",
        },
        BTC: {
          balance: "11.67441380",
          min: "0.02000000",
          max: "11.67441380",
          networkFee: 0.001,
          limit: "400.00000000",
          utilised: "0.00000000",
          maxOriginal: "11.6744138",
        },
        DAI: {
          balance: "0.01000000",
          min: "10.00000000",
          max: "0.01000000",
          networkFee: 5.0,
          limit: "2500.00000000",
          utilised: "0.00000000",
          maxOriginal: "0.01",
        },
        ENJ: {
          balance: "60.00000000",
          min: "31.30000000",
          max: "60.00000000",
          networkFee: 22.0,
          limit: "626000.00000000",
          utilised: "0.00000000",
          maxOriginal: "60",
        },
        HBAR: {
          balance: "10105878.00000000",
          min: "1.00000000",
          max: "250.00000000",
          networkFee: 0.1,
          limit: "250.00000000",
          utilised: "0.00000000",
          maxOriginal: "250.00",
        },
        LTC: {
          balance: "1.00000000",
          min: "0.10000000",
          max: "1.00000000",
          networkFee: 0.002,
          limit: "1000.00000000",
          utilised: "0.00000000",
          maxOriginal: "1",
        },
        USDT: {
          balance: "125.00000000",
          min: "25.00000000",
          max: "125.00000000",
          networkFee: 1.3,
          limit: "1000000.00000000",
          utilised: "0.00000000",
          maxOriginal: "125",
        },
        XRP: {
          balance: "30.00000000",
          min: "25.00000000",
          max: "30.00000000",
          networkFee: 1.0,
          limit: "3000000.00000000",
          utilised: "0.00000000",
          maxOriginal: "30",
        },
      },
      fiatStrings: ["EUR", "JPY", "SGD", "HKD", "USD", "AUD"],
      coinStrings: ["BCH", "DAI", "ENJ", "BTC", "XRP", "LTC", "HBAR", "USDT-ERC20"],
      withdrawByEmailMinMax: {
        EUR: {
          min: "80.00",
          max: "500000.00",
          maxOriginal: "500000.00",
        },
        JPY: {
          min: "10000.00",
          max: "10000.00",
          maxOriginal: "10000",
        },
        SGD: {
          min: "100.00",
          max: "10000.00",
          maxOriginal: "10000",
        },
        HKD: {
          min: "800.00",
          max: "8200.00",
          maxOriginal: "8200",
        },
        USD: {
          min: "100.00",
          max: "0.00",
          maxOriginal: "0",
        },
        AUD: {
          min: "100.00",
          max: "3119.53",
          maxOriginal: "3119.53",
        },
        BCH: {
          min: "25.00000000",
          max: "0.75000000",
          maxOriginal: "0.75",
        },
        DAI: {
          min: "10.00000000",
          max: "0.01000000",
          maxOriginal: "0.01",
        },
        ENJ: {
          min: "31.30000000",
          max: "60.00000000",
          maxOriginal: "60",
        },
        BTC: {
          min: "0.02000000",
          max: "11.67441380",
          maxOriginal: "11.6744138",
        },
        XRP: {
          min: "25.00000000",
          max: "30.00000000",
          maxOriginal: "30",
        },
        LTC: {
          min: "0.10000000",
          max: "1.00000000",
          maxOriginal: "1",
        },
        HBAR: {
          min: "0.00000001",
          max: "250.00000000",
          maxOriginal: "250.00",
        },
        USDT: {
          min: "25.00000000",
          max: "125.00000000",
          maxOriginal: "125",
        },
      },
    },
  ],
  event: "withdrawalMetaData",
};