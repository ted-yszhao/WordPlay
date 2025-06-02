import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './slice/GameSlice'
export const store = configureStore({
    reducer : {
        game : gameReducer,
    }
    ,
    devTools: typeof window !== 'undefined' && (window as any).__REDUX_DEVTOOLS_EXTENSION__ ? (window as any).__REDUX_DEVTOOLS_EXTENSION__() : true
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

