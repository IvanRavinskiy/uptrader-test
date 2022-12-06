import { ACTIONS, ColumnIndex, STATUS } from '../../constants';
import { addProject } from '../actions/projects';
import { addTask, dragDrop, removeTask, updateTask } from '../actions/tasks';

type ActionsType =
  | ReturnType<typeof removeTask>
  | ReturnType<typeof addTask>
  | ReturnType<typeof updateTask>
  | ReturnType<typeof addProject>
  | ReturnType<typeof dragDrop>;

export type Priority = 'Low' | 'Medium' | 'High';

export type Status = 'Queue' | 'Development' | 'Done';

export type UpdateTaskType = {
  title?: string;
  description?: string;
  file?: null;
  priority?: Priority;
  startDate?: string;
  expiry?: string;
};

export type Column = {
  status: Status;
  items: TaskType[];
};

export type Columns = {
  [ColumnIndex.QUEUE]: Column;
  [ColumnIndex.DEVELOPMENT]: Column;
  [ColumnIndex.DONE]: Column;
};

export type TaskType = {
  title: string;
  description: string;
  file: null;
  priority: Priority;
  startDate: string;
  expiry: string;
  taskId: string;
  projectId: string;
};
export type TasksStateType = {
  [key: string]: {
    tasks: TaskType[];
    columns: Columns;
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
            [ColumnIndex.QUEUE]: {
              status: state[action.projectId].columns[ColumnIndex.QUEUE].status,
              items: state[action.projectId].columns[ColumnIndex.QUEUE].items.filter(
                el => el.taskId !== action.taskId,
              ),
            },
            [ColumnIndex.DEVELOPMENT]: {
              status: state[action.projectId].columns[ColumnIndex.DEVELOPMENT].status,
              items: state[action.projectId].columns[
                ColumnIndex.DEVELOPMENT
              ].items.filter(el => el.taskId !== action.taskId),
            },
            [ColumnIndex.DONE]: {
              status: state[action.projectId].columns[ColumnIndex.DONE].status,
              items: state[action.projectId].columns[ColumnIndex.DONE].items.filter(
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
            [ColumnIndex.QUEUE]: {
              ...state[action.task.projectId].columns[ColumnIndex.QUEUE],
              items: [
                ...state[action.task.projectId].columns[ColumnIndex.QUEUE].items,
                action.task,
              ],
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
            [ColumnIndex.QUEUE]: {
              status: state[action.projectId].columns[ColumnIndex.QUEUE].status,
              items: state[action.projectId].columns[ColumnIndex.QUEUE].items.map(t =>
                t.taskId === action.taskId ? { ...t, ...action.model } : t,
              ),
            },
            [ColumnIndex.DEVELOPMENT]: {
              status: state[action.projectId].columns[ColumnIndex.DEVELOPMENT].status,
              items: state[action.projectId].columns[ColumnIndex.DEVELOPMENT].items.map(
                t => (t.taskId === action.taskId ? { ...t, ...action.model } : t),
              ),
            },
            [ColumnIndex.DONE]: {
              status: state[action.projectId].columns[ColumnIndex.DONE].status,
              items: state[action.projectId].columns[ColumnIndex.DONE].items.map(t =>
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
            [ColumnIndex.QUEUE]: {
              status: STATUS.QUEUE,
              items: [],
            },
            [ColumnIndex.DEVELOPMENT]: {
              status: STATUS.DEVELOPMENT,
              items: [],
            },
            [ColumnIndex.DONE]: {
              status: STATUS.DONE,
              items: [],
            },
          },
        },
      };
    case ACTIONS.DRAG_DROP:
      return {
        ...state,
        [action.projectId]: {
          tasks: state[action.projectId].tasks,
          columns: action.columns,
        },
      };
    default:
      return state;
  }
};
