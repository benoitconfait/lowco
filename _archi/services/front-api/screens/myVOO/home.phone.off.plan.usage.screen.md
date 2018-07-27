# Home Phone Off Plan Usage Screen Data Needed

## corresponding API endpoints
 - api/customer/phones (contains the link to the usage endpoint below)
 - api/usage/net/phone/pod_id/es_id/2017/12?an=acbis_number
(ed_id corresponds to phone number without the 0 prefix)


```
{
    "totalOffPlanUsage": number,
    "offPlanBudget": number || null,
    "voiceOffPlanUsage": {
        totalCost: number,
        national: {
            cost: number,
            minutes: number
        },
        international: {
            cost: number,
            minutes: number
        }
    }
}
```