import { FC, useState } from 'react';

import { useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';

import { Button, Modal } from '../../components';
import { Task } from '../../components/Task';
import { ROUTES } from '../../constants';
import { getTasks } from '../../state/selectors/tasks';

import style from './styles.module.css';

export const TasksPage: FC = () => {
  const [isShowModal, setIsShowModal] = useState(false);

  const { id } = useParams();

  const tasks = useSelector(getTasks);

  if (!id) return <div>ERROR</div>;

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
      {tasks[id].tasks.map(({ taskId, title, description, startDate, expiry }) => {
        return (
          <Task
            key={taskId}
            taskId={taskId}
            projectId={id}
            title={title}
            description={description}
            startDate={startDate}
            expiry={expiry}
          />
        );
      })}
    </div>
  );
};
