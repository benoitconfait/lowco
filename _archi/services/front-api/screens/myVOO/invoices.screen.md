# Invoices Screen Data Needed

## corresponding API endpoints
 - api/customer/billing/invoices (add missing totals if necessary)


```
{
    "balanceOwed": number,
    "summary": {
        "pack": number,
        "mobile": number,
        "tv": number,
        "other": number 
    },
    "invoices": [
        {
            "type": "Mobile" || "Pack" || "Other",
            "createdDate": date,
            "dueDate": date,
            "paid": true || false,
            "cost": number,
            "url": string
        },
        ...
    ]
}
```