// This is a simulated data api, uses localStoage to store data instead of a real database

const PROJECTS_KEY = 'projects';

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

// PROJECTS
const getProjects = () => {
  const projects = localStorage.getItem(PROJECTS_KEY);
  return projects ? JSON.parse(projects) : [];
};

const getProject = (id) => {
  const projects = getProjects();
  return projects.find((project) => project.id === id);
};

const createProject = (project) => {
  if (!project.name) return null;
  const projects = getProjects();
  const newProject = ProjectFactory(project);
  projects.push(newProject);
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
  return newProject.id;
};

const updateProject = (updatedProject) => {
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

export {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
  ProjectFactory,
  PROJECTS_KEY
};
