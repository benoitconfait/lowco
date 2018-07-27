# Off Plan Usage Screen Data Needed


```
{
    "totalOffPlanUsage": number,
    "offPlanBudget": number || null,
    "offPlanUsage": {
        "voice": {
            totalCost: number,
            national: {
                cost: number,
                minutes: number
            },
            international: {
                cost: number,
                minutes: number
            }
        },
        "sms": {
            totalCost: number,
            national: {
                cost: number,
                sms: number
            },
            international: {
                cost: number,
                sms: number
            }
        },
        "data": {
            totalCost: number,
            national: {
                cost: number,
                dataUsage: number,
                unit: string
            },
            international: {
                cost: number,
                dataUsage: number,
                unit: string
            }
        }
    }
}
```