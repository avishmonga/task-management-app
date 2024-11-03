import clsx from 'clsx';
import React from 'react';
import { TASK_TYPE, formatDate } from '../../utils';
import { MdEdit, MdDelete } from 'react-icons/md';

const TaskCard = ({ task, onEdit, onDelete }) => {
  return (
    <>
      <div className="w-full h-fit bg-white shadow-md p-4 rounded-lg sm:rounded-xl transition-transform duration-200 ease-in-out hover:scale-105">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <div className=" w-full flex  justify-between gap-2">
              <div className="flex gap-2 items-center">
                <div
                  className={clsx(
                    'w-4 h-4 rounded-full',
                    TASK_TYPE[task.completionStatus]
                  )}
                />
                <h4 className="line-clamp-1 text-black">{task?.title}</h4>
              </div>
              <div className="flex gap-3 items-center">
                <span onClick={() => onEdit(task)} className="text-2xl">
                  <MdEdit />
                </span>
                <span
                  onClick={() => onDelete(task)}
                  className="text-2xl text-red-800"
                >
                  <MdDelete />
                </span>
              </div>
            </div>
          </div>
          <span className="text-md text-gray-600">
            Status: {task?.completionStatus}
          </span>

          {task.completionStatus === 'pending' && (
            <span className="text-sm text-gray-600">
              Due on: {formatDate(new Date(task?.dueDate))}
            </span>
          )}
        </div>

        <div className="w-full border-t border-gray-200 my-2" />

        <div className="flex items-center  gap-3 mb-2">
          <span className="text-sm  text-gray-600">{task?.description}</span>
        </div>
      </div>
    </>
  );
};

export default TaskCard;
