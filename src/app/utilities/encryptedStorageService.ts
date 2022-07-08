import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import * as config_variables from '../utilities/config_variables';

const SECRET_KEY = 'platform2021Uptake87EU';

@Injectable({
    providedIn: 'root'
})


export class EncryptedStorageService {

    constructor() { }

    private checkStorageAvailable(): boolean {
        function storageAvailable(type) {
            var storage;
            try {
                storage = window[type];
                var x = '__storage_test__';
                storage.setItem(x, x);
                storage.removeItem(x);
                return true;
            }
            catch (e) {
                return e instanceof DOMException && (
                    // everything except Firefox
                    e.code === 22 ||
                    // Firefox
                    e.code === 1014 ||
                    // test name field too, because code might not be present
                    // everything except Firefox
                    e.name === 'QuotaExceededError' ||
                    // Firefox
                    e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
                    // acknowledge QuotaExceededError only if there's something already stored
                    (storage && storage.length !== 0);
            }
        }

        if (storageAvailable('localStorage')) {
            return true
        }
        else {
            return false
        }
    }

    public secureStorage(key, content) {
        let contentEncrypt = CryptoJS.AES.encrypt(content, SECRET_KEY).toString();
        if (this.checkStorageAvailable()) {
            sessionStorage.setItem(key, contentEncrypt);
        }
        else {
            config_variables.userConfig[key] = contentEncrypt;
        }
    }

    public decryptSecureStorage(key) {
        if (this.checkStorageAvailable()) {
            if (sessionStorage.getItem(key) != null) {
                let data = sessionStorage.getItem(key);
                try {
                    const bytes = CryptoJS.AES.decrypt(data, SECRET_KEY);
                    let content;
                    if (bytes.toString()) {
                        content = bytes.toString(CryptoJS.enc.Utf8);
                    }
                    return content;
                } catch (e) {
                    console.log(e);
                }
            }
            else {
                return null;
            }
        }
        else {
            if (config_variables.userConfig[key] != null) {
                let data = config_variables.userConfig[key];
                try {
                    const bytes = CryptoJS.AES.decrypt(data, SECRET_KEY);
                    let content;
                    if (bytes.toString()) {
                        content = bytes.toString(CryptoJS.enc.Utf8);
                    }
                    return content;
                } catch (e) {
                    console.log(e);
                }
            }
            else {
                return null;
            }
        }
    }

    public secureLocalStorage(key, content) {
        let contentEncrypt = CryptoJS.AES.encrypt(content, SECRET_KEY).toString();
        if (this.checkStorageAvailable()) {

            localStorage.setItem(key, contentEncrypt);
        }
        else {
            config_variables.toolConfig[key] = contentEncrypt;
        }
    }

    public decryptLocalSecureStorage(key) {
        if (this.checkStorageAvailable()) {
            if (localStorage.getItem(key) != null) {
                let data = localStorage.getItem(key);
                try {
                    const bytes = CryptoJS.AES.decrypt(data, SECRET_KEY);
                    let content;
                    if (bytes.toString()) {
                        content = bytes.toString(CryptoJS.enc.Utf8);
                    }
                    return content;
                } catch (e) {
                    console.log(e);
                }
            }
            else {
                return null;
            }
        }
        else {
            if (config_variables.toolConfig[key] != null) {
                let data = config_variables.toolConfig[key];
                try {
                    const bytes = CryptoJS.AES.decrypt(data, SECRET_KEY);
                    let content;
                    if (bytes.toString()) {
                        content = bytes.toString(CryptoJS.enc.Utf8);
                    }
                    return content;
                } catch (e) {
                    console.log(e);
                }
            }
            else {
                return null;
            }
        }
    }

    public removeUser(key) {

        if (this.checkStorageAvailable()) {
            sessionStorage.removeItem(key);
        }
        else {
            config_variables.userConfig[key] = "";
        }
    }
}