import *  as constants from '../utilities/constants';

export interface DMPlatformTableItem {
    platform_id: number;
    platform_title: string;
    platform_description: string;
    platform_flagged: Boolean;
    contextual_info: string;
    platform_logo_URL: string;
    platform_index: number
}