import { ACTIONS } from '../../constants';

import { addProject, removeProject } from 'state/actions/projects';

export type Project = {
  id: string;
  title: string;
};

type AddProjectActionType = ReturnType<typeof addProject>;
type RemoveProjectActionType = ReturnType<typeof removeProject>;

type ActionsType = AddProjectActionType | RemoveProjectActionType;
const initialState: Project[] = [];

export const projectsReducer = (
  state: Project[] = initialState,
  action: ActionsType,
): Project[] => {
  switch (action.type) {
    case ACTIONS.REMOVE_PROJECT:
      return state.filter(tl => tl.id !== action.id);
    case ACTIONS.ADD_PROJECT:
      return [{ ...action.project }, ...state];
    default:
      return state;
  }
};
