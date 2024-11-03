import React, { useEffect, useState } from 'react';
import Textbox from '../Textbox';
import SelectList from '../SelectList';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import Button from '../Button';
import { createTask, updateTask } from '../../api/task';
import { TASK_TYPE_LIST } from '../../utils';
import { handleError } from '../../utils/errorHandler';
import Textarea from '../Textarea';
import { IoMdClose } from 'react-icons/io';

const AddTask = ({ open, setOpen, task, getTasks }) => {
  const [completionStatus, setCompletionStatus] = useState();
  const submitHandler = async (data) => {
    try {
      const response = task
        ? await updateTask(task._id, { ...data, completionStatus })
        : await createTask({ ...data, completionStatus });

      if (response.status) {
        setOpen(false);
        getTasks();
      } else {
        throw new Error('Failed to save task');
      }
    } catch (error) {
      handleError(error);
    }
  };

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    if (task) {
      const dueDate = new Date(task.dueDate);
      const formattedDueDate = dueDate.toISOString().split('T')[0];
      setValue('title', task.title);
      setValue('dueDate', formattedDueDate);
      setCompletionStatus(task.completionStatus);
    } else {
      reset();
      setCompletionStatus(TASK_TYPE_LIST[0]);
    }
  }, [task, setValue, reset]);

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md space-y-4 border bg-white p-12">
            <DialogTitle
              as="h2"
              className="text-base flex justify-between font-bold leading-6 text-gray-900 mb-4"
            >
              {task ? 'UPDATE TASK' : 'ADD TASK'}
              <span
                className="text-lg cursor-pointer text-red-800"
                onClick={() => setOpen(false)}
              >
                <IoMdClose />
              </span>
            </DialogTitle>
            <form onSubmit={handleSubmit(submitHandler)}>
              <div className="mt-2 flex flex-col gap-6">
                <Textbox
                  placeholder="Task Title"
                  type="text"
                  name="title"
                  label="Task Title"
                  className="w-full rounded"
                  register={register('title', {
                    required: 'Title is required!',
                  })}
                  error={errors.title ? errors.title.message : ''}
                />

                <SelectList
                  label="Task Completion Status"
                  lists={TASK_TYPE_LIST}
                  selected={completionStatus}
                  setSelected={setCompletionStatus}
                />

                {completionStatus === 'pending' && (
                  <Textbox
                    placeholder="Due date"
                    type="date"
                    name="dueDate"
                    label="Task Due Date"
                    className="w-full rounded"
                    register={register('dueDate', {
                      required: 'Due date is required!',
                    })}
                    error={errors.dueDate ? errors.dueDate.message : ''}
                  />
                )}
                <Textarea
                  name="description"
                  placeholder="Description"
                  label="Description (optional)"
                  register={register('description')}
                  className="w-full rounded"
                  error={errors.description ? errors.description.message : ''}
                  rows={4}
                />
                <Button
                  type="submit"
                  label="Submit"
                  className="w-full h-10 bg-blue-700 text-white rounded-full"
                />
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default AddTask;
