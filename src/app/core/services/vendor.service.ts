import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {
  Config,
  Script,
  ThirdPartyLibrary,
  VendorStore
} from '@core/store/vendor/vendor.store';
import { vendors } from '@plugins/vendors';

@Injectable({
  providedIn: 'root'
})
export class VendorService {
  vendors: ThirdPartyLibrary[];

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private venStore: VendorStore
  ) {
    this.vendors = vendors;
  }

  async use(libraryNames: string[]) {
    const usedVendors = this.getVendorsByName(libraryNames);
    //Dispatch Loading State
    for (let vendor of usedVendors) {
      //Discarding the call if the library already loaded
      if (this.venStore.loadLibrary(vendor)) return;
    }

    //Load Libraries Asynchronously
    this.__loadStyle(usedVendors.map((vendor) => vendor.resources.style));
    const state: Awaited<Script>[] = await this.__loadBulkScripts(
      usedVendors.map((vendor) => vendor.resources.script.scriptUrl)
    );

    //Dispatch Loading success State
    if (state[0].isLoaded === true) {
      usedVendors.forEach((vendor) =>
        this.venStore.islibraryLoaded(vendor.name, true)
      );
    } else {
      //Dispatch Loading Error
      this.venStore.islibraryLoaded(null, false);
    }
  }

  //Subscribe to component specific vendor changes
  watchVendorChanges(
    scope: any,
    libraryNames: string[],
    configCallback: Function
  ) {
    return this.venStore.stateChanged.subscribe((state) => {
      if (
        state.libraries.length &&
        state.libraries
          .filter((v) => libraryNames.includes(v.name))
          .every((v) => v.resources.script.isLoaded === true)
      ) {
        const configMap = configCallback.apply(scope);
        this.vendors.forEach((v) => {
          if (configMap.get(v.name)) {
            v.resources.config.configObjects = configMap.get(v.name);
          }
        });
        console.log(this.vendors);
      }
    });
  }

  __loadBulkScripts(scriptUrls: string[]) {
    if (scriptUrls) {
      const promises: any[] = [];
      scriptUrls.forEach((script) => promises.push(this.__loadScript(script)));
      return Promise.all(promises);
    }
    return null;
  }

  __loadScript(scriptUrl: string) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = scriptUrl;
      script.type = 'text/javascript';
      //Loading scripts asynchronously since there are no dependencies between libs in the current version specs
      script.async = true;
      //Avoid race conditions in Window global variables
      script.onload = () => {
        resolve({ script: scriptUrl, isLoaded: true });
      };
      script.onerror = () => reject({ scriptUrl, isLoaded: false });
      document.getElementsByTagName('head')[0].appendChild(script);
    });
  }

  __loadStyle(styleUrls: string[]) {
    if (styleUrls) {
      const head = this.document.getElementsByTagName('head')[0];
      for (let s of styleUrls) {
        if (s !== '') {
          const style = this.document.createElement('link');
          style.id = 'article-carousel';
          style.rel = 'stylesheet';
          style.href = s;
          head.appendChild(style);
        }
      }
    }
  }

  getVendorsByName(libraryNames: string[]) {
    return this.vendors.filter((vendor) => libraryNames.includes(vendor.name));
  }

  //Hacky way to decouple components from the service and the store
  getConfigObjects(libraryNames: string[]): Promise<Config> {
    return new Promise((resolve, reject) => {
      const interval = setInterval(() => {
        if (this.venStore.checkAllLoadedLibraries(libraryNames)) {
          const configMap = new Map();
          this.getVendorsByName(libraryNames).forEach((v) => {
            configMap.set(v.name, v.resources.config.configObjects);
          });
          console.log(configMap);
          clearInterval(interval);
          resolve(configMap);
        }
      }, 100);
      //Todo: (zack) : handle rejection
    });
  }
}
