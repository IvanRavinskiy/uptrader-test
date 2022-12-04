import { FC, useState } from 'react';

import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { Button, Modal } from '../../components';
import { ROUTES } from '../../constants';
import { getTasks } from '../../state/selectors/tasks';

import style from './styles.module.css';

export const TasksPage: FC = () => {
  const [isShowModal, setIsShowModal] = useState(false);

  const tasks = useSelector(getTasks);

  console.log('tasks', tasks);

  return (
    <div>
      {isShowModal && <Modal onClose={() => setIsShowModal(false)} />}
      <div className={style.buttonsContainer}>
        <NavLink to={ROUTES.PROJECT} role="button" className={style.buttonLink}>
          Main
        </NavLink>
        <Button
          textChildren="Create task"
          onClick={() => {
            setIsShowModal(true);
          }}
          backgroundColor="purple"
        />
      </div>
    </div>
  );
};
