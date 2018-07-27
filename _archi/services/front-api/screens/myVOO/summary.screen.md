# Summary Screen Data Needed

this is the myVOO app home screen.

- Voice unit type will be minutes as per inVision
- Data unit type will be Giga Bytes

## corresponding API endpoints
 - api/customer (to get pod and address)
 - api/subscriptions/mobile
 - api/customer/billing/balance
 
## ideal redux state for the screen
```
{
    "internetUsage": [
        {
        "podId": string,
        "usageAddress":{
        "streetName": string,
            "streetNumber": string,
            "boxNumber": string,
            "zipCode": string,
            "city": string
        },
        "currentValue": number,
        "maxValue": number || null,    
    },
    {
        "podId": string,
        "usageAddress":{
        "streetName": string,
            "streetNumber": string,
            "boxNumber": string,
            "zipCode": string,
            "city": string
        },
        "currentValue": number,
        "maxValue": number || null,    
    }
    ],
    "mobileUsage": [
        {
            msisdn: number,
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
        {
            "msisdn": "string",
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
    ],
    balanceOwed: number
}
```