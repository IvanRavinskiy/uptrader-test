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
};

type Column = {
  status: Status;
  items: TaskType[];
};

export type TaskType = {
  title: string;
  description: string;
  file: null;
  status: Status;
  priority: Priority;
  startDate: string;
  expiry: string;
  taskId: string;
  projectId: string;
};
export type TasksStateType = {
  [key: string]: {
    tasks: TaskType[];
    columns: {
      0: Column;
      1: Column;
      // eslint-disable-next-line no-magic-numbers
      2: Column;
    };
  };
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
        [action.projectId]: {
          tasks: state[action.projectId].tasks.filter(t => t.taskId !== action.taskId),
          columns: {
            0: {
              status: state[action.projectId].columns['0'].status,
              items: state[action.projectId].columns['0'].items.filter(
                el => el.taskId !== action.taskId,
              ),
            },
            1: {
              status: state[action.projectId].columns['1'].status,
              items: state[action.projectId].columns['1'].items.filter(
                el => el.taskId !== action.taskId,
              ),
            },
            2: {
              status: state[action.projectId].columns['2'].status,
              items: state[action.projectId].columns['2'].items.filter(
                el => el.taskId !== action.taskId,
              ),
            },
          },
        },
      };
    case ACTIONS.ADD_TASK:
      return {
        ...state,
        [action.task.projectId]: {
          tasks: [action.task, ...state[action.task.projectId].tasks],
          columns: {
            ...state[action.task.projectId].columns,
            0: {
              ...state[action.task.projectId].columns[0],
              items: [...state[action.task.projectId].columns[0].items, action.task],
            },
          },
        },
      };
    case ACTIONS.UPDATE_TASK:
      return {
        ...state,
        [action.projectId]: {
          tasks: state[action.projectId].tasks.map(t =>
            t.taskId === action.taskId ? { ...t, ...action.model } : t,
          ),
          columns: {
            0: {
              status: state[action.projectId].columns['0'].status,
              items: state[action.projectId].columns['0'].items.map(t =>
                t.taskId === action.taskId ? { ...t, ...action.model } : t,
              ),
            },
            1: {
              status: state[action.projectId].columns['1'].status,
              items: state[action.projectId].columns['1'].items.map(t =>
                t.taskId === action.taskId ? { ...t, ...action.model } : t,
              ),
            },
            2: {
              status: state[action.projectId].columns['2'].status,
              items: state[action.projectId].columns['2'].items.map(t =>
                t.taskId === action.taskId ? { ...t, ...action.model } : t,
              ),
            },
          },
        },
      };
    case ACTIONS.ADD_PROJECT:
      return {
        ...state,
        [action.project.id]: {
          tasks: [],
          columns: {
            0: {
              status: 'Queue',
              items: [],
            },
            1: {
              status: 'Development',
              items: [],
            },
            2: {
              status: 'Done',
              items: [],
            },
          },
        },
      };
    default:
      return state;
  }
};
