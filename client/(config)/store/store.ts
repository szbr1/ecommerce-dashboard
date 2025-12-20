"use client"
import { configureStore } from "@reduxjs/toolkit";
import { stateReducer } from "./states";
import { useDispatch, useSelector } from "react-redux";
import { persistReducer} from "redux-persist"
import storage from "redux-persist/lib/storage"

const configStore = {
    key: "root",
    storage
}

const persistedReducer = persistReducer(configStore, stateReducer)



export const makeStore = ()=>{
    return configureStore({
        reducer: persistedReducer,
        middleware: GetDefaultMiddleware => {
            return GetDefaultMiddleware({
                serializableCheck :false
            })
        }
    })
    
}


// TYPES FOR STATES
export type AppStore = ReturnType<typeof makeStore>

export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]


export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();