import { InjectionToken } from '@angular/core';

export const BASE_PATH = new InjectionToken<string>('basePath');
export const COLLECTION_FORMATS = {
    'csv': ',',
    'tsv': '   ',
    'ssv': ' ',
    'pipes': '|'
}
/** Production environment */
export const PROD_URL_GATEWAY = '';
export const PROD_URL_QUEST = '';

/** Test environment */
export const TEST_URL_QUEST = '';
export const MOCK_URL = '';
// export const PROD_URL = 'https://localhost'; 
