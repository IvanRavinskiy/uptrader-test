import { FC } from 'react';

import { NavLink, useParams } from 'react-router-dom';

import { ROUTES } from '../../constants';

import style from './styles.module.css';

export const TasksPage: FC = () => {
  const { id } = useParams();

  return (
    <div>
      <NavLink to={ROUTES.PROJECT} role="button" className={style.btnLink}>
        Main
      </NavLink>

      <div>{id}</div>
    </div>
  );
};
