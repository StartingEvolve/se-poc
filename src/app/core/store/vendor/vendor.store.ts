import { ObservableStore } from '@codewithdan/observable-store';
import { Injectable } from '@angular/core';

//Note : The purpose of this store is to provide the ability to load CUSTOM SINGLE FILE
//libraries dynamically, while leaving the clutter out of npm. This opens up many possibilities such as experimenting with numerous libraries
//that might be used just in a single component without worrying about bundle and performance.
// It's not a silver bullet for everything tho, if your library has dependencies, then It's best to stick
// with your package manager.
//Features might be added based on future needs
export declare interface OnVendorChangeConfig {
  //A callback method that is invoked immediately after vendor Changes are emitted
  //This enables you to inject your custom configuration for the libraries you use in your component
  seOnVendorChangeConfig(): Config;
}

export type Config = Map<string, any[]>;

export interface Script {
  scriptUrl: string;
  isLoaded: boolean;
}

export interface ThirdPartyLibrary {
  name: string;
  resources: {
    script: Script;
    style?: string;
    config?: {
      configUrl: string;
      configObjects: Object[];
    };
  };
}

export interface VendorState {
  libraries: ThirdPartyLibrary[];
  library: ThirdPartyLibrary;
}

@Injectable({
  providedIn: 'root'
})
export class VendorStore extends ObservableStore<VendorState> {
  constructor() {
    const initialState: VendorState = {
      libraries: [],
      library: null
    };
    super({ trackStateHistory: true, logStateChanges: true });
    this.setState(initialState, 'INIT_VENDOR_STATE');
  }

  //Todo (zack) : Observable log history feature is not a production state logger, refactor this later into diff actions
  loadLibrary(library: ThirdPartyLibrary): number {
    let state = this.getState();
    //Skip push if library already loaded
    if (
      state.libraries &&
      state.libraries.some(
        (v) => v.name === library.name && v.resources.script.isLoaded === true
      )
    ) {
      this.setState(
        { libraries: state.libraries },
        'VENDOR_LIBRARY ' + '<' + library.name + '>' + 'ALREADY_LOADED'
      );
      return -1;
    }

    state.libraries.push(library);
    this.setState(
      { libraries: state.libraries },
      'LOADING_VENDOR_LIBRARY ' + '<' + library.name + '>'
    );
    return 0;
  }

  islibraryLoaded(libraryName: string, status: boolean) {
    let state = this.getState();
    if (status) {
      state.libraries = state.libraries.map((lib) => {
        if (lib.name === libraryName) {
          lib.resources.script.isLoaded = true;
        }
        return lib;
      });
      this.setState(
        { libraries: state.libraries },
        'VENDOR_LIBRARY ' + '<' + libraryName + '>' + ' IS_LOADED'
      );
    } else {
      this.setState(
        //Todo (zack) : create a logger listing which promises related libraries was rejected
        { libraries: state.libraries },
        'VENDOR_LIBRARY_LOADING_ERROR'
      );
    }
  }

  getLibrary(libraryName: string) {
    let state = this.getState();
    return state.libraries.filter((lib) => lib.name === libraryName);
  }

  //Todo (zack) : refactor later
  checkAllLoadedLibraries(libraryNames: string[]) {
    let state = this.getState();
    return state.libraries
      .filter((lib) => libraryNames.includes(lib.name))
      .every((lib) => lib.resources.script.isLoaded);
  }

  //Todo (zack): unlink CSS stylesheets
  // removeLibrary() {
  //
  // }
}
