import { Platform } from "react-native";
import { language } from "../AppConstants";
import { getString } from "../AppLanguage";
import { isAndroid } from "./PlatformUtil";
import { check, Permission, PERMISSIONS, request } from "react-native-permissions";
import { PermissionResultObject, PermissionObject } from "../type/PermissionTypes";

export const checkPermissionsAndroid = async (): Promise<PermissionResultObject> => {
    if (!isAndroid()) Promise.reject("Platform is not Android");
    const permissionsObjects = new Array<PermissionObject>();
    const version: number = Platform.Version as number;
    if (version < 33) {
        permissionsObjects.push({
            title: getString(language, 'permission-screen-title-read-external-storage'),
            description: getString(language, 'permission-screen-desc-read-external-storage'),
            granted: await checkPermission(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE),
        });
        permissionsObjects.push({
            title: getString(language, 'permission-screen-title-write-external-storage'),
            description: getString(language, 'permission-screen-desc-write-external-storage'),
            granted: await checkPermission(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE),
        });
    } else {
        permissionsObjects.push({
            title: getString(language, 'permission-screen-title-read-media-images'),
            description: getString(language, 'permission-screen-desc-read-media-images'),
            granted: await checkPermission(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES),
        });
        permissionsObjects.push({
            title: getString(language, 'permission-screen-title-read-media-video'),
            description: getString(language, 'permission-screen-desc-read-media-video'),
            granted: await checkPermission(PERMISSIONS.ANDROID.READ_MEDIA_VIDEO),
        });
        permissionsObjects.push({
            title: getString(language, 'permission-screen-title-read-media-audio'),
            description: getString(language, 'permission-screen-desc-read-media-audio'),
            granted: await checkPermission(PERMISSIONS.ANDROID.READ_MEDIA_AUDIO),
        });
    }
    permissionsObjects.push({
        title: getString(language, 'permission-screen-title-camera'),
        description: getString(language, 'permission-screen-desc-camera'),
        granted: await checkPermission(PERMISSIONS.ANDROID.CAMERA),
    });
    let rejectedPermissions = permissionsObjects.filter(p => !p.granted);
    return {
        allPermissionsGranted: rejectedPermissions.length == 0,
        rejectedPermissions: rejectedPermissions,
    }
}

export const checkPermissionsIOS = async (): Promise<PermissionResultObject> => {
    if (isAndroid()) Promise.reject("Platform is not 'iOS'");
    const permissionsObjects = new Array<PermissionObject>();
    permissionsObjects.push({
        title: getString(language, 'permission-screen-title-camera'),
        description: getString(language, 'permission-screen-desc-camera'),
        granted: await checkPermission(PERMISSIONS.IOS.CAMERA),
    });
    permissionsObjects.push({
        title: getString(language, 'permission-screen-title-media-library'),
        description: getString(language, 'permission-screen-desc-media-library'),
        granted: await checkPermission(PERMISSIONS.IOS.MEDIA_LIBRARY),
    });
    permissionsObjects.push({
        title: getString(language, 'permission-screen-title-photo-library'),
        description: getString(language, 'permission-screen-desc-photo-library'),
        granted: await checkPermission(PERMISSIONS.IOS.PHOTO_LIBRARY),
    });
    permissionsObjects.push({
        title: getString(language, 'permission-screen-title-photo-library-add'),
        description: getString(language, 'permission-screen-desc-photo-library-add'),
        granted: await checkPermission(PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY),
    });
    let rejectedPermissions = permissionsObjects.filter(p => !p.granted);
    return {
        allPermissionsGranted: rejectedPermissions.length == 0,
        rejectedPermissions: rejectedPermissions,
    }
}

const checkPermission = async (permission: Permission): Promise<boolean> => await check(permission) == 'granted' ? true :
    await request(permission) == 'granted';
