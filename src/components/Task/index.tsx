import { FC } from 'react';

import { useDispatch } from 'react-redux';

import { removeTask, updateTask } from '../../state/actions/tasks';

import style from './styles.module.css';

type TaskProps = {
  taskId: string;
  projectId: string;
  title: string;
  description: string;
  expiry: string;
  startDate: string;
};

export const Task: FC<TaskProps> = props => {
  const { taskId, projectId, title, description, startDate, expiry } = props;

  const dispatch = useDispatch();
  // const startDateMoment = moment(startDate, 'DD.MM.YYY').toDate();
  // const expiryMoment = moment(expiry).toDate();

  const onDeletePress = (): void => {
    dispatch(removeTask(taskId, projectId));
  };

  const onEditPress = (): void => {
    dispatch(updateTask(taskId, { title: 'updated', description: 'updated' }, projectId));
  };

  return (
    <div className={style.container}>
      <h3 className={style.title}>{title}</h3>
      <p className={style.description}>{description}</p>
      <div className={style.timesContainer}>
        <div>
          <h4 className={style.title}>In process:</h4>
          <p className={style.description}>Days: 2, Hours: 5</p>
          <p className={style.description}>{startDate}</p>
        </div>
        <div>
          <h4 className={style.title}>End time:</h4>
          <p className={style.description}>{expiry}</p>
        </div>
      </div>
      <div className={style.buttonsContainer}>
        <button onClick={onEditPress} type="button" className={style.editButton}>
          Edit
        </button>
        <button onClick={onDeletePress} type="button" className={style.deleteButton}>
          Delete
        </button>
      </div>
    </div>
  );
};
