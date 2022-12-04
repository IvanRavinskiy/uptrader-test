import { ACTIONS } from '../../constants';
import { addProject } from '../actions/projects';
import { addTask, removeTask, updateTask } from '../actions/tasks';

type ActionsType =
  | ReturnType<typeof removeTask>
  | ReturnType<typeof addTask>
  | ReturnType<typeof updateTask>
  | ReturnType<typeof addProject>;

export type Priority = 'Low' | 'Medium' | 'High';

export type Status = 'Queue' | 'Development' | 'Done';

export type UpdateTaskType = {
  title?: string;
  description?: string;
  file?: null;
  status?: Status;
  priority?: Priority;
  startDate?: string;
  expiry?: string;
  id: string;
  projectId: string;
};

export type TaskType = {
  title: string;
  description: string;
  file: null;
  status: Status;
  priority: Priority;
  startDate: string;
  expiry: string;
  id: string;
  projectId: string;
};
export type TasksStateType = {
  [key: string]: TaskType[];
};

const initialState: TasksStateType = {};

export const tasksReducer = (
  state: TasksStateType = initialState,
  action: ActionsType,
): TasksStateType => {
  switch (action.type) {
    case ACTIONS.REMOVE_TASK:
      return {
        ...state,
        [action.projectId]: state[action.projectId].filter(t => t.id !== action.taskId),
      };
    case ACTIONS.ADD_TASK:
      return {
        ...state,
        [action.task.projectId]: [action.task, ...state[action.task.projectId]],
      };
    case ACTIONS.UPDATE_TASK:
      return {
        ...state,
        [action.projectId]: state[action.projectId].map(t =>
          t.id === action.taskId ? { ...t, ...action.model } : t,
        ),
      };
    case ACTIONS.ADD_PROJECT:
      return { ...state, [action.project.id]: [] };
    default:
      return state;
  }
};
