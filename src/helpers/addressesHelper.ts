

export const getAddressesOptions = (addresses) => {
    return addresses ? addresses.map((address) => {
        const addressText = `${address.houseNumber}${address.boxNumber ? address.boxNumber : ''} ${address.street}, ${address.zipCode} ${address.city}`;
        return {
            key: address.pointOfDelivery,
            value: addressText.length > 20 ? `${addressText.substring(0, 20)}...` : addressText
        };
    }) : [];
};