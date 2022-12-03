import { ACTIONS } from '../../constants';
import { Project } from '../reducers/projects';

export const removeProject = (id: string) =>
  ({ type: ACTIONS.REMOVE_PROJECT, id } as const);
export const addProject = (project: Project) =>
  ({ type: ACTIONS.ADD_PROJECT, project } as const);
