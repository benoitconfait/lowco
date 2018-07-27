# Net Usage Detail Daily Screen Data Needed

- Data unit type will be Giga Bytes

## corresponding API endpoints
 - api/usage/net/2017/12

```
[
    {
        "year": number,
        "month": number,
        "usage": {
            "currentValue": number,
            "maxValue": number || null,        
        },
        "dailyUsage": [
            {
                "day": number,
                "value": number
            }
        ]
    },
    ...
]
```