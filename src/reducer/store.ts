import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { gradeService } from '../service/gradeService';

export const store = configureStore({
    reducer: {
        [gradeService.reducerPath]: gradeService.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(gradeService.middleware),
});

setupListeners(store.dispatch)
