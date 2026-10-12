import {
  format,
  parseISO,
  isSameYear,
  differenceInCalendarDays,
  isToday,
  isYesterday
} from 'date-fns';
import close from '../assets/icons/icons8-close-48.png';
import add from '../assets/icons/icons8-plus-math-48.png';
import trash from '../assets/icons/icons8-trash-48.png';

const addElement = (elem, className, textContent, parent) => {
  const newElement = document.createElement(elem);
  if (className) newElement.classList.add(className);
  newElement.textContent = textContent;
  parent.appendChild(newElement);
  return newElement;
};

const addDiv = (className, textContent, parent) => {
  return addElement('div', className, textContent, parent);
};

const createButton = (action, type, label, className) => {
  const button = document.createElement('button');
  button.classList.add(action, className);
  button.textContent = label;
  button.type = type;
  button.name = action;
  button.value = action;
  return button;
};

const createIcon = (uri) => {
  const iconImg = document.createElement('img');
  iconImg.src = uri;
  iconImg.alt = '';
  iconImg.classList.add('btn-icon');
  return iconImg;
};

const formatDueDate = (isoDateString) => {
  if (!isoDateString) {
    return '';
  }

  const date = parseISO(isoDateString);
  const today = new Date();
  const dayDiff = differenceInCalendarDays(today, date);

  if (isToday(date)) return 'Today';
  if (isYesterday(date)) return 'Yesterday';
  if (dayDiff == -1) return 'Tomorrow';

  const pattern = isSameYear(date, today) ? 'MMM d' : 'MMM d, yyyy';
  return format(date, pattern);
};

const isPastDay = (isoDateString) => {
  if (!isoDateString) return false;
  const date = parseISO(isoDateString);
  return differenceInCalendarDays(new Date(), date) >= 1;
};

function capitalizeFirstLetter(str) {
  if (!str) return ''; // Handle empty strings safely
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const icons = {
  delete: () => createIcon(trash),
  close: () => createIcon(close),
  add: () => createIcon(add)
};
export {
  addElement,
  addDiv,
  createButton,
  createIcon,
  formatDueDate,
  isPastDay,
  capitalizeFirstLetter,
  icons
};
