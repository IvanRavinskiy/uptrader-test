import { FC } from 'react';

import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { ROUTES } from '../../constants';
import { removeProject } from '../../state/actions/projects';
import { Project } from '../../state/reducers/projects';
import { Button } from '../Button';

import style from './styles.module.css';

export const ProjectItem: FC<Project> = props => {
  const { id, title } = props;
  const dispatch = useDispatch();

  const deleteProjectPress = (id: string): void => {
    dispatch(removeProject(id));
  };

  return (
    <NavLink to={`${ROUTES.TASKS}${id}`} className={style.link}>
      <div key={id} className={style.projectContainer}>
        <p className={style.title}>{title}</p>
        <Button
          onClick={() => deleteProjectPress(id)}
          backgroundColor="red"
          textChildren="Delete"
        />
      </div>
    </NavLink>
  );
};
