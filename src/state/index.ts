import { combineReducers, legacy_createStore as createStore } from 'redux';

import { projectsReducer } from './reducers/projects';

const rootReducer = combineReducers({
  projects: projectsReducer,
});

export const store = createStore(rootReducer);
export type AppRootStateType = ReturnType<typeof rootReducer>;
