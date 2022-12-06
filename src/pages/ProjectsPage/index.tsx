import { ChangeEvent, FC, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { ProjectItem, Button } from '../../components';
import { addProject } from '../../state/actions/projects';
import { getProjects } from '../../state/selectors/projects';

import style from './styles.module.css';

export const ProjectsPage: FC = () => {
  const [projectTitle, setProjectTitle] = useState('');

  const dispatch = useDispatch();

  const projects = useSelector(getProjects);

  const onProjectTitleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setProjectTitle(e.currentTarget.value);
  };

  const addProjectPress = (): void => {
    const id = String(Date.now());

    dispatch(addProject({ title: projectTitle, id }));

    setProjectTitle('');
  };

  return (
    <div className={style.projectContainer}>
      <div className={style.inputContainer}>
        <input
          placeholder="Add title"
          value={projectTitle}
          onChange={event => onProjectTitleChange(event)}
          className={style.input}
        />
        <Button backgroundColor="#FFBA00" textChildren="Add" onClick={addProjectPress} />
      </div>

      {projects.map(({ id, title }) => {
        return <ProjectItem key={id} id={id} title={title} />;
      })}
    </div>
  );
};
