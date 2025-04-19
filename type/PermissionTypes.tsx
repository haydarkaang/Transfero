export type PermissionObject = {
    title: string,
    description: string,
    granted: boolean,
}

export type PermissionResultObject = {
    allPermissionsGranted: boolean,
    rejectedPermissions: PermissionObject[],
}