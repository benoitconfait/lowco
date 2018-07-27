# My Offer Screen Data Needed

## corresponding API endpoints
 - api/customer/options (contains all pods with options)
 - api/subscriptions/mobile
 
```
{
    "pack": {
        "packId": string,
        "options": [
            {
                "key": string,
                "included": true || false
            },
            ...
        ],
    },
    "mobilePlan": {
        "planId": string,
        "msisdn": string,
        "monthlyCost": number,
        "simCardNumber": string,
        "cardOwner": string,
    }
}
```