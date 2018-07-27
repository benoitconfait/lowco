# Usage Detail Screen Data Needed


```
[
    {
        "date": date,
        "cost": number,
        "items": [
            {
                type: "voice",
                phoneNumber: string,
                offPlan: true || false,
                time: time,
                cost: number || null
            },
            {
                type: "sms",
                phoneNumber: string,
                offPlan: true || false,
                time: time,
                cost: number || null
            },
            {
                type: "data",
                dataUsage: string,
                unit: string,
                offPlan: true || false,
                time: time,
                cost: number || null
            },
            ...
        ]
    },
    ...
]
```