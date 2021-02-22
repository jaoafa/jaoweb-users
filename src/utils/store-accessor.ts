/* eslint-disable import/no-mutable-exports */
import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import Data from '@/store/data'

let DataStore: Data
function initialiseStores(store: Store<any>): void {
  DataStore = getModule(Data, store)
}

export { initialiseStores, DataStore }
