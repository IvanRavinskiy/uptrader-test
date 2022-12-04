import { ACTIONS } from '../../constants';

import { TaskType, UpdateTaskType } from 'state/reducers/tasks';

export const removeTask = (taskId: string, projectId: string) =>
  ({ type: ACTIONS.REMOVE_TASK, taskId, projectId } as const);
export const addTask = (task: TaskType) => ({ type: ACTIONS.ADD_TASK, task } as const);
export const updateTask = (taskId: string, model: UpdateTaskType, projectId: string) =>
  ({
    type: ACTIONS.UPDATE_TASK,
    model,
    projectId,
    taskId,
  } as const);
