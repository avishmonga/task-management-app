import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import React from 'react';
import Button from '../Button';

const DeleteTask = ({ open, setOpen, onDelete, taskTitle }) => {
  const handleDelete = () => {
    onDelete();
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className="relative z-50"
    >
      <DialogBackdrop className="fixed inset-0 bg-red-900/50" />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="max-w-md bg-white p-6 rounded-md shadow-md">
            <DialogTitle
              as="h2"
              className="text-lg font-bold text-gray-900 mb-4"
            >
              DELETE TASK
            </DialogTitle>

            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete the task{' '}
              <span className="font-bold">{taskTitle}</span>? This action cannot
              be undone.
            </p>

            <div className="flex justify-end gap-4">
              <Button
                onClick={() => setOpen(false)}
                label="Cancel"
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md"
              />
              <Button
                onClick={handleDelete}
                label="Delete"
                className="px-4 py-2 bg-red-600 text-white rounded-md"
              />
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default DeleteTask;
