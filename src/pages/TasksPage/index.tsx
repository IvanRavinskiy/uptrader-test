import { FC, memo, useCallback, useState } from 'react';

import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';

import { Button, Modal } from '../../components';
import { Task } from '../../components/Task';
import { ROUTES } from '../../constants';
import { AppRootStateType } from '../../state';
import { dragDrop } from '../../state/actions/tasks';
import { Columns, TaskType } from '../../state/reducers/tasks';

import style from './styles.module.css';

export const TasksPage: FC = memo(() => {
  const [isShowModal, setIsShowModal] = useState(false);

  const { id } = useParams();

  const dispatch = useDispatch();

  const columns = useSelector((state: AppRootStateType): Columns => {
    // @ts-ignore
    return state.tasks[id].columns;
  });

  const onCreateTaskPress = useCallback(() => {
    setIsShowModal(true);
  }, []);

  if (!id) return <div>ERROR</div>;

  const onDragEndTask = (result: DropResult): void => {
    if (!result.destination) return;
    if (result.source.droppableId !== result.destination.droppableId) {
      // @ts-ignore
      const sourceColumn = columns[result.source.droppableId];

      // @ts-ignore
      const destinationColumn = columns[result.destination.droppableId];

      const sourceCopyItems = [...sourceColumn.items];

      const destinationCopyItems = [...destinationColumn.items];

      const [removed] = sourceCopyItems.splice(result.source.index, 1);

      destinationCopyItems.splice(destinationColumn.index, 0, removed);

      const columnsUpdated = {
        ...columns,
        [result.source.droppableId]: {
          ...sourceColumn,
          items: [...sourceCopyItems],
        },
        [result.destination.droppableId]: {
          ...destinationColumn,
          items: [...destinationCopyItems],
        },
      };

      dispatch(dragDrop(columnsUpdated, id));
    } else {
      // @ts-ignore
      const column = columns[result.source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(result.source.index, 1);

      copiedItems.splice(result.destination.index, 0, removed);
      const columnsUpdated = {
        ...columns,
        [result.source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      };

      dispatch(dragDrop(columnsUpdated, id));
    }
  };

  return (
    <div>
      {isShowModal && <Modal onClose={() => setIsShowModal(false)} />}
      <div className={style.buttonsContainer}>
        <NavLink to={ROUTES.PROJECT} role="button" className={style.buttonLink}>
          Main
        </NavLink>
        <Button
          textChildren="Create task"
          onClick={onCreateTaskPress}
          backgroundColor="#FFBA00"
        />
      </div>
      <div className={style.table}>
        <DragDropContext onDragEnd={result => onDragEndTask(result)}>
          {Object.entries(columns).map(([key, column]) => {
            return (
              <div key={key} className={style.tableColumn}>
                <h2 className={style.columnTitle}>{column.status}</h2>
                <Droppable droppableId={key}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 8,
                          borderRadius: 8,
                          background: snapshot.isDraggingOver ? '#ECECEC' : 'transparent',
                        }}
                      >
                        {column.items.map((item: TaskType, index: number) => {
                          return (
                            <Draggable
                              key={item.taskId}
                              draggableId={`${item.taskId}`}
                              index={index}
                            >
                              {provided => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      ...provided.draggableProps.style,
                                    }}
                                  >
                                    <Task
                                      key={item.taskId}
                                      taskId={item.taskId}
                                      projectId={item.projectId}
                                      title={item.title}
                                      description={item.description}
                                      startDate={item.startDate}
                                      expiry={item.expiry}
                                    />
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            );
          })}
        </DragDropContext>
      </div>
    </div>
  );
});
