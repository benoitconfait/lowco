# Net Configuration Screen Data Needed

## corresponding API endpoints
- api/customer/options (contains option + parameters)

```
{
    options: [
        {
            "key": string,
            "active": true || false
        },
        ...
    ],
    parameters: [
        {
            "key": string,
            "activate": true || false,
            "value": number || null
        },
        ...
    ],
    freeServices: [
        {
            "key": string,
            "active": true || false
        },
        ...
    ]
}
```