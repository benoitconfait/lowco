# Mobile Off Plan Usage Screen Data Needed

## backend oss endpoint
http://savia-esbmobile.tecteo.intra:8050/cxf/ebss/crm/voo/cdr?msisdn=32484297924&startDate=20171201&limit=1000

## mobile api computation
 - list cdr for the current month
 - sum CDR by type, region (national/international), msisdn


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