import React, { FC } from 'react';

import { Route, Routes } from 'react-router-dom';

import { ROUTES } from './constants';

import style from 'App.module.css';
import { ProjectsPage, TasksPage } from 'pages';

export const App: FC = () => {
  return (
    <div className={style.container}>
      <Routes>
        <Route path={ROUTES.PROJECT} element={<ProjectsPage />} />
        <Route path={`${ROUTES.TASKS}:id`} element={<TasksPage />} />
      </Routes>
    </div>
  );
};
