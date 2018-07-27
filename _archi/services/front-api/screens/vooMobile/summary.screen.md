# Summary Screen Data Needed

- Voice unit type will be minutes as per inVision
- Data unit type will be Giga Bytes


```
{
    "packId" : string,
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
    totalOffPlanUsage: number,
    msisdn: string
}
```