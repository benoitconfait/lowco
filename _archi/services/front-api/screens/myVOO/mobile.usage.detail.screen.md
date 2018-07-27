# Mobile Usage Detail Screen Data Needed

## backend oss endpoint
http://savia-esbmobile.tecteo.intra:8050/cxf/ebss/crm/voo/cdr?msisdn=32484297924&startDate=20171201&limit=1000

## mobile api computation
 - list cdr for the current month
 - sum CDR by type, date, msisdn

 (? what to do with voice.destination VMS_CFW)
## screen data (reducer)
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