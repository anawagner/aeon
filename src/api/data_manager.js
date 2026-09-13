// This is a simulated data api, uses localStoage to store data instead of a real database

const PROJECTS_KEY = 'projects';
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

const projectId = (projectName) => {
  return projectName.toLowerCase().replace(/\s+/g, '-');
};

const ProjectFactory = ({ name, description = '' }) => {
  return {
    id: projectId(name),
    name,
    description,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
};

const TaskFactory = ({
  title,
  description = '',
  dueDate = '',
  status = 'to-do',
  priority = 'normal',
  projectID = 'default',
  notes = '',
  checklist = []
}) => {
  return {
    id: generateId(title),
    title,
    description,
    dueDate: dueDate ? formatDateYYYYMMDD(dueDate) : '',
    status,
    priority,
    projectID,
    notes,
    checklist,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
};

// PROJECTS
const createProject = (project) => {
  if (!project.name) return null;
  const projects = getProjects();
  const newProject = ProjectFactory(project);
  projects.push(newProject);
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
  return newProject.id;
};

const getProjects = () => {
  const projects = localStorage.getItem(PROJECTS_KEY);
  return projects ? JSON.parse(projects) : [];
};

const getProject = (id) => {
  const projects = getProjects();
  return projects.find((project) => project.id === id);
};

const updateProject = (updatedProject) => {
  console.log('Updating project', updatedProject);
  const projects = getProjects();
  const index = projects.findIndex(
    (project) => project.id === updatedProject.id
  );
  if (index !== -1) {
    projects[index] = {
      ...ProjectFactory(updatedProject),
      id: updatedProject.id,
      createdAt: updatedProject.createdAt,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
  }
};

const deleteProject = (id) => {
  const projects = getProjects();
  const updatedProjects = projects.filter((project) => project.id !== id);
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(updatedProjects));
};

// TASKS
const createTask = (task) => {
  if (!task.title) return null;
  const tasks = getTasks();
  const newTask = TaskFactory(task);
  tasks.push(newTask);
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  return newTask.id;
};

const getTasks = () => {
  const tasks = localStorage.getItem(TASKS_KEY);
  return tasks ? JSON.parse(tasks) : [];
};

const getTaskByProject = (projectId) => {
  const allTasks = getTasks();
  return allTasks.filter((task) => task.project == projectId);
};

const getTask = (id) => {
  const tasks = getTasks();
  return tasks.find((task) => task.id === id);
};

const updateTask = (updatedTask) => {
  console.log('Updating task', updatedTask);
  const tasks = getTasks();
  const index = tasks.findIndex((task) => task.id === updatedTask.id);
  if (index !== -1) {
    tasks[index] = {
      ...TaskFactory(updatedTask),
      id: updatedTask.id,
      createdAt: updatedTask.createdAt,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  }
};

const deleteTask = (id) => {
  const tasks = getTasks();
  const updatedTasks = tasks.filter((task) => task.id !== id);
  localStorage.setItem(TASKS_KEY, JSON.stringify(updatedTasks));
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
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  initializeData,
  getTaskByProject
};
