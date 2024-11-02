export const formatDate = (date) => {
  // Get the month, day, and year
  const month = date.toLocaleString('en-US', { month: 'short' });
  const day = date.getDate();
  const year = date.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;

  return formattedDate;
};

export function getInitials(fullName) {
  const names = fullName.split(' ');

  const initials = names.slice(0, 2).map((name) => name[0].toUpperCase());

  const initialsStr = initials.join('');

  return initialsStr;
}

export const TASK_TYPE = {
  pending: 'bg-yellow-600',
  completed: 'bg-green-600',
};

export const TASK_TYPE_LIST = ['pending', 'completed'];
