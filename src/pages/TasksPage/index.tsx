import { FC, useState } from 'react';

import { NavLink, useParams } from 'react-router-dom';

import { Button, Modal } from '../../components';
import { ROUTES } from '../../constants';

import style from './styles.module.css';

export const TasksPage: FC = () => {
  const { id } = useParams();

  const [isShowModal, setIsShowModal] = useState(false);

  return (
    <div>
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
      {isShowModal && <Modal onClose={() => setIsShowModal(false)} />}
      <div>{id}</div>
    </div>
  );
};
