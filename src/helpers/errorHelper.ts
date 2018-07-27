

export interface LogData {
    BuildNumber: number,
    DeviceVersion: string,
    ErrorMessage: string,
    DeviceId: string,
    DeviceLocale: string,
    DeviceName: string,
    Manufacturer: string,
    SystemName: string,
    SystemVersion: string
}

export const buildLogData = (error: any, DeviceInfo: any): LogData | null => {
    if (DeviceInfo == null || error == null) {
        return null;
    }

    return {
        BuildNumber: DeviceInfo.getBuildNumber(),
        DeviceVersion: DeviceInfo.getVersion(),
        ErrorMessage: error.toString(),
        DeviceId: DeviceInfo.getDeviceId(),
        DeviceLocale: DeviceInfo.getDeviceLocale(),
        DeviceName: DeviceInfo.getDeviceName(),
        Manufacturer: DeviceInfo.getManufacturer(),
        SystemName: DeviceInfo.getSystemName(),
        SystemVersion: DeviceInfo.getSystemVersion()
    };
};