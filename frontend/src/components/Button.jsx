import clsx from 'clsx';
import React from 'react';

const Button = ({ icon, className, label, type, onClick = () => {} }) => {
  return (
    <button
      type={type || 'button'}
      className={clsx(
        'flex items-center justify-center gap-2 px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
        className
      )}
      onClick={onClick}
    >
      <span>{label}</span>
      {icon && icon}
    </button>
  );
};

export default Button;
