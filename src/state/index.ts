import { combineReducers, legacy_createStore as createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { projectsReducer } from './reducers/projects';
import { tasksReducer } from './reducers/tasks';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  projects: projectsReducer,
  tasks: tasksReducer,
});

const pReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(pReducer);

export const persistor = persistStore(store);

export type AppRootStateType = ReturnType<typeof rootReducer>;
