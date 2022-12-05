import { FC } from 'react';

import style from './styles.module.css';

type TaskProps = {
  title: string;
  description: string;
  expiry: string;
  startDate: string;
};

export const Task: FC<TaskProps> = props => {
  const { title, description, startDate, expiry } = props;

  // const startDateMoment = moment(startDate, 'DD.MM.YYY').toDate();
  // const expiryMoment = moment(expiry).toDate();

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
        <button type="button" className={style.editButton}>
          Edit
        </button>
        <button type="button" className={style.deleteButton}>
          Delete
        </button>
      </div>
    </div>
  );
};
