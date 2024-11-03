import React, { useEffect, useState } from 'react';
import Title from '../components/Title';
import Button from '../components/Button';
import { IoMdAdd } from 'react-icons/io';
import AddTask from '../components/Task/AddTask';
import BoardView from '../components/Task/Boardview';
import { deleteTask, fetchTasks } from '../api/task';
import DeleteTask from '../components/Task/DeleteTask';
import SelectList from '../components/SelectList';
import { handleError } from '../utils/errorHandler';
import Loading from '../components/Loading';
import Tabs from '../components/Tabs';

const TABS = [{ title: 'All' }, { title: 'Pending' }, { title: 'Completed' }];

const Tasks = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [deleteTaskModalOpen, setDeleteTaskModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [selectedDueDateSortOrder, setSelectedDueDateSortOrder] =
    useState('ascending');
  const [selected, setSelected] = useState(0);

  const getTasks = async () => {
    try {
      setLoading(true);
      let completionStatus =
        selected === 1 ? 'pending' : selected === 2 ? 'completed' : null;
      const response = await fetchTasks({
        completionStatus,
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
  }, [selectedDueDateSortOrder, selected]);
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

        <Button
          onClick={() => setOpen(true)}
          label="Create Task"
          icon={<IoMdAdd className="text-lg" />}
          className="flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5"
        />
      </div>

      <Tabs tabs={TABS} selected={selected} setSelected={setSelected}>
        {selected !== 2 && (
          <div className="flex justify-end mb-1">
            <SelectList
              lists={['ascending', 'descending']}
              selected={selectedDueDateSortOrder}
              setSelected={setSelectedDueDateSortOrder}
              label="Order by due date"
              className="w-full md:w-48"
            />
          </div>
        )}
        <div className="w-full">
          <BoardView tasks={tasks} onEdit={onEdit} onDelete={onDelete} />
        </div>
      </Tabs>

      <AddTask
        getTasks={getTasks}
        open={open}
        setOpen={setOpen}
        task={editTask}
      />
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
