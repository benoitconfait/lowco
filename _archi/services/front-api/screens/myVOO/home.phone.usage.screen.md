# Home Phone Usage Screen Data Needed

- Voice unit type will be minutes as per inVision

## corresponding API endpoints
 - api/customer/phones (contains the link to the usage endpoint below)
 - api/usage/net/phone/pod_id/es_id/2017/12?an=acbis_number
(ed_id corrspond to phone number without the 0 prefix)

```
[
    {
        "phoneNumber": string
        "voiceUsage": {
            "currentValue": number,
            "maxValue": number || null,
        },
        totalOffPlanUsage: number,
    },
    ...
]
```