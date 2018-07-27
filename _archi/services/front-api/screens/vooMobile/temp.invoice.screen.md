# Temp Invoice Screen Data Needed


```
{
    "fullCost": number,
    "plan": {
        "totalCost": number,
        "planName": string,
        "planCost": number,
        "options": [
            {
                "optionKey": string,
                "promoKey": string || null,
                "cost": number
            },
            ...
        ]
    },
    "offPlan": {
        "totalCost": number || null,
        "voiceCost": number || null,
        "dataCost": number || null,
        "smsCost": number || null
    }
}
```