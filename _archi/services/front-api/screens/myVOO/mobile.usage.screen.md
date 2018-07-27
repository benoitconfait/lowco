# Mobile Usage Screen Data Needed

- Voice unit type will be minutes as per inVision
- Data unit type will be Giga Bytes

Questions: http://jira.tecteo.intra/browse/APPVOOMOB-46
? how to represent databoost usage ?
? how to represent the sim card status ?

## corresponding API endpoints
 - api/subscriptions/mobile
 - api/customer/billing/balance


```
[
    {
        msisdn: string,
        "subscriptionId" : string,
        "usage": {
            "voice": {
                "currentValue": number,
                "maxValue": number || null,
            },
            "sms": {
                "currentValue": number,
                "maxValue": number || null,
            },
            "data": {
                "currentValue": number,
                "maxValue": number || null,
            }
        },
        "options": [
            {
                optionId: "EUROPE",
                usage: {
                    "voice": {
                        "currentValue": number,
                        "maxValue": number || null,
                    },
                    "sms": {
                        "currentValue": number,
                        "maxValue": number || null,
                    }
                }
            },
            ...
        ],
        totalOutOfBundleUsage: number,
        totalBalance: number
    },
    ...
]
```