# Home Phone Usage Detail Screen Data Needed

## corresponding API endpoints
 - api/usage/net/phone/pod_id/es_id/2017/12?an=acbis_number
(ed_id corresponds to phone number without the 0 prefix)


```
{
    "totalDuration": number,
    "balanceOwed": number,
    "dailyUsage": [
        {
            "date": date,
            "cost": number,
            "items": [
                {
                    "type": "mobile-nat" || "mobile-int" ||
                            "fix-nat" || "fix-int",
                    "phoneNumber": string,
                    "offPlan": true || false,
                    "time": time,
                    "duration": number,
                    "cost": number || null
                },                
                ...
            ]
        },
        ...
    ]
}
```