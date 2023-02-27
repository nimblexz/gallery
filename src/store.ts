import {Action, applyMiddleware, combineReducers, createStore, Store} from "redux";
import {photoReducer} from "./photoReducer";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';

export const rootReducer = combineReducers({
    photos: photoReducer
})
const persistConfig = {
    key: 'root',
    storage
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

// export const store=createStore(rootReducer,applyMiddleware(thunk))
 export const store:Store<any,Action>=createStore(persistedReducer,applyMiddleware(thunk))
export const persister=persistStore(store)
export type AppRootStateType = ReturnType<typeof rootReducer>
