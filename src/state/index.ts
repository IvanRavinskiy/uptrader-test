import { combineReducers, legacy_createStore as createStore } from 'redux';

import { projectsReducer } from './reducers/projects';
import { tasksReducer } from './reducers/tasks';

const rootReducer = combineReducers({
  projects: projectsReducer,
  tasks: tasksReducer,
});

export const store = createStore(rootReducer);
export type AppRootStateType = ReturnType<typeof rootReducer>;

// @ts-ignore
window.store = store;
