# VOD Usage Screen Data Needed

## corresponding API endpoints
 - api/usage/vod/pod_id/2017/12


```
[
    {
        "month": number,
        "year": number,
        "totalCost": number,
        items: [
            {
                "day": number,
                "name": string,
                "cost": number
            },
            ...
        ]
    },
    ...
]
```