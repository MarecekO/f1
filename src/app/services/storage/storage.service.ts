import {Injectable} from '@angular/core';
import {Preferences} from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {
  }

  /**
   * Save data to key
   *
   * @param key
   * @param data
   */
  async saveData(key: string, data: any) {
    await Preferences.set({
      // key: key,
      key,
      value: JSON.stringify(data),
    });
  }

  /**
   * Get data from key
   *
   * @param key
   */
  async getData(key: string) {
    const {value} = await Preferences.get({
      key
    });
    return JSON.parse(value);
  }
}
