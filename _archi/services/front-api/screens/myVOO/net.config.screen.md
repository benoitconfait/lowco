# Net Configuration Screen Data Needed

## corresponding API endpoints
- api/customer/options

```
{
    options: [
        {
            "key": string,
            "active": true || false
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