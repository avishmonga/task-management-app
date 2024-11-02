import React, { useEffect, useState } from 'react';
import Title from '../components/Title';
import Button from '../components/Button';
import { IoMdAdd } from 'react-icons/io';
import AddTask from '../components/Task/AddTask';
import BoardView from '../components/Task/Boardview';
import { deleteTask, fetchTasks } from '../api/task';
import DeleteTask from '../components/Task/DeleteTask';
import SelectList from '../components/SelectList';
import { TASK_TYPE_LIST } from '../utils';
import { handleError } from '../utils/errorHandler';
import Loading from '../components/Loading';

const Tasks = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [deleteTaskModalOpen, setDeleteTaskModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [selectedTaskType, setSelectedTaskType] = useState('all');
  const [selectedDueDateSortOrder, setSelectedDueDateSortOrder] =
    useState('ascending');

  const getTasks = async () => {
    try {
      setLoading(true);
      const response = await fetchTasks({
        completionStatus: selectedTaskType,
        dueDateOrder: selectedDueDateSortOrder,
      });
      if (response.status) {
        setTasks(response.tasks);
      } else {
        throw new Error('Failed to fetch tasks');
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getTasks();
  }, [selectedDueDateSortOrder, selectedTaskType]);
  const onEdit = (task) => {
    setEditTask(task);
    setOpen(true);
  };

  const onDelete = (task) => {
    setTaskToDelete(task);
    setDeleteTaskModalOpen(true);
  };

  const handleDeleteTask = async () => {
    if (taskToDelete) {
      setLoading(true);
      try {
        const response = await deleteTask(taskToDelete._id);
        if (response.status) {
          setDeleteTaskModalOpen(false);
          setTaskToDelete(null);
          getTasks();
        } else {
          throw new Error('Failed to delete task');
        }
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    }
  };
  return loading ? (
    <div className="py-10">
      <Loading />
    </div>
  ) : (
    <div className="w-full p-10">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-4">
        <Title title="Tasks" />
        <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
          <SelectList
            lists={['all', ...TASK_TYPE_LIST]}
            selected={selectedTaskType}
            setSelected={setSelectedTaskType}
            label="Filter by Status"
            className="w-full md:w-48"
          />
          <SelectList
            lists={['ascending', 'descending']}
            selected={selectedDueDateSortOrder}
            setSelected={setSelectedDueDateSortOrder}
            label="Order by due date"
            className="w-full md:w-48"
          />
        </div>
        <Button
          onClick={() => setOpen(true)}
          label="Create Task"
          icon={<IoMdAdd className="text-lg" />}
          className="flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5"
        />
      </div>

      <div className="w-full">
        <BoardView tasks={tasks} onEdit={onEdit} onDelete={onDelete} />
      </div>

      <AddTask open={open} setOpen={setOpen} task={editTask} />
      <DeleteTask
        open={deleteTaskModalOpen}
        setOpen={setDeleteTaskModalOpen}
        onDelete={handleDeleteTask}
        taskTitle={taskToDelete?.title}
      />
    </div>
  );
};

export default Tasks;
