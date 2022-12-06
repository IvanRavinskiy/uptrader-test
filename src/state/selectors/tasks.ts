import { AppRootStateType } from '../index';
import { TasksStateType } from '../reducers/tasks';

export const getTasks = (state: AppRootStateType): TasksStateType => {
  return state.tasks;
};
