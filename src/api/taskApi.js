// This is a simulated data api, uses localStoage to store data instead of a real database
import { ProjectFactory, PROJECTS_KEY } from './projectApi.js';

const TASKS_KEY = 'tasks';

function formatDateYYYYMMDD(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date)) return '';
  return date.toISOString().slice(0, 10);
}

const generateId = () => {
  return `${Date.now()}-${Math.floor(Math.random() * 1000000)}`;
};

const getProjectOrder = (projectId) => {
  const tasks = getTasks();
  const projectTasks = tasks.filter((task) => task.projectID === projectId);
  return projectTasks.length;
};

const TaskFactory = ({
  title,
  description = '',
  dueDate = '',
  isDone = false,
  priority = 'normal',
  projectID = 'default',
  projectOrder = 0,
  notes = '',
  checklist = []
}) => {
  return {
    id: generateId(),
    title,
    description,
    dueDate: dueDate ? formatDateYYYYMMDD(dueDate) : '',
    isDone,
    priority,
    projectID,
    projectOrder: projectOrder || getProjectOrder(projectID),
    notes,
    checklist,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
};

// GET TASKS

const getTasks = () => {
  const tasks = localStorage.getItem(TASKS_KEY);
  return tasks ? JSON.parse(tasks) : [];
};

const getTask = (id) => {
  const tasks = getTasks();
  return tasks.find((task) => task.id === id);
};

const getTaskByProject = (projectId) => {
  const allTasks = getTasks();
  return allTasks.filter((task) => task.projectID == projectId);
};

const createTask = (task) => {
  if (!task.title) return null;
  const tasks = getTasks();
  const newTask = TaskFactory(task);
  tasks.push(newTask);
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  return newTask.id;
};

const updateTask = (updatedTask) => {
  const tasks = getTasks();
  const index = tasks.findIndex((task) => task.id === updatedTask.id);
  // has the projectID changed? if so, we need to re-order the tasks in the old project and the new project
  const oldProjectId = tasks[index]?.projectID;
  const newProjectId = updatedTask.projectID;
  if (oldProjectId !== newProjectId) {
    reOrderTasks(oldProjectId);
    reOrderTasks(newProjectId);
  }
  if (index !== -1) {
    tasks[index] = {
      ...TaskFactory(updatedTask),
      id: updatedTask.id,
      createdAt: updatedTask.createdAt,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  } else {
    console.error(`Task with id ${updatedTask.id} not found.`);
  }
};

const deleteTask = (id) => {
  const tasks = getTasks();
  const updatedTasks = tasks.filter((task) => task.id !== id);
  reOrderTasks(tasks.find((task) => task.id === id)?.projectID);
  localStorage.setItem(TASKS_KEY, JSON.stringify(updatedTasks));
};

// reorder tasks when a task is deleted or moved to a different project, so that the order of tasks in each project is maintained
const reOrderTasks = (projectId) => {
  const tasks = getTasks();
  const projectTasks = tasks.filter((task) => task.projectID === projectId);
  projectTasks.sort((a, b) => a.projectOrder - b.projectOrder);
  projectTasks.forEach((task, index) => {
    task.projectOrder = index + 1;
  });
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
};

// Sets the projectOrder for a task. This is intentionally minimal: drag/drop logic
// can decide the new index/order number, and this function simply persists it.
const setTaskItemOrder = (taskId, projectId, newOrder) => {
  const tasks = getTasks();
  const task = tasks.find((t) => t.id === taskId);

  if (!task) return null;

  const order = Number(newOrder);
  if (!Number.isFinite(order) || order < 1) return null;

  task.projectID = projectId || task.projectID;
  task.projectOrder = order;
  task.updatedAt = new Date().toISOString();

  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  return task;
};

// CHEKLIST ITEMS
// Add, update, delete checklist items for a specific task
// Each checklist item has an id, title, and isDone status

const addChecklistItem = (taskId, item) => {
  const tasks = getTasks();
  const task = tasks.find((t) => t.id === taskId);
  if (task) {
    const newItem = { id: generateId(), title: item.title, isDone: false };
    task.checklist.push(newItem);
    task.updatedAt = new Date().toISOString();
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
    return newItem.id;
  }
  return null;
};

const updateChecklistItem = (taskId, itemId, updatedItem) => {
  const tasks = getTasks();
  const task = tasks.find((t) => t.id === taskId);
  if (task) {
    const itemIndex = task.checklist.findIndex((i) => i.id === itemId);
    if (itemIndex !== -1) {
      task.checklist[itemIndex] = {
        ...task.checklist[itemIndex],
        ...updatedItem
      };
      task.updatedAt = new Date().toISOString();
      localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
    }
  }
};

const deleteChecklistItem = (taskId, itemId) => {
  const tasks = getTasks();
  const task = tasks.find((t) => t.id === taskId);
  if (task) {
    task.checklist = task.checklist.filter((i) => i.id !== itemId);
    task.updatedAt = new Date().toISOString();
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  }
};

// mark task or checklist item as done or not done
const toggleTaskDone = (taskId) => {
  const tasks = getTasks();
  const task = tasks.find((t) => t.id === taskId);
  if (task) {
    task.isDone = !task.isDone;
    task.updatedAt = new Date().toISOString();
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  }
};

const toggleChecklistItemDone = (taskId, itemId) => {
  const tasks = getTasks();
  const task = tasks.find((t) => t.id === taskId);
  if (task) {
    const item = task.checklist.find((i) => i.id === itemId);
    if (item) {
      item.isDone = !item.isDone;
      task.updatedAt = new Date().toISOString();
      localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
    }
  }
};

// INITIALIZATION

const loadData = (items, key, factory) => {
  const formattedItems = items.map((item) => factory(item));
  localStorage.setItem(key, JSON.stringify(formattedItems));
};

const initializeData = (tasks, projects) => {
  const dataToLoad = [
    { items: projects || [], key: PROJECTS_KEY, factory: ProjectFactory },
    { items: tasks || [], key: TASKS_KEY, factory: TaskFactory }
  ];
  dataToLoad.forEach(({ items, key, factory }) => {
    if (!localStorage.getItem(key)) {
      loadData(items, key, factory);
    }
  });
};

export {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  initializeData,
  getTaskByProject,
  setTaskItemOrder,
  addChecklistItem,
  updateChecklistItem,
  deleteChecklistItem,
  toggleTaskDone,
  toggleChecklistItemDone
};
