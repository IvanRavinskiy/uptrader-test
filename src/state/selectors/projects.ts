import { AppRootStateType } from '../index';
import { Project } from '../reducers/projects';

export const getProjects = (state: AppRootStateType): Project[] => {
  return state.projects;
};
