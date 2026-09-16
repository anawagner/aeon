import { getProjects } from '../../api/projectApi';
import './projects.css';

const Projects = () => {
  const projectList = getProjects();

  const projectNavigation = document.createElement('div');
  projectNavigation.classList.add('project-navigation');

  for (const project of projectList) {
    const div = document.createElement('div');
    div.classList.add('project');

    const link = document.createElement('a');
    link.href = `#my-missions/${project.id}`;
    link.textContent = project.name;
    div.appendChild(link);
    projectNavigation.appendChild(div);
  }

  const addNew = document.createElement('div');
  addNew.classList.add('add-new');
  addNew.textContent = '+';
  projectNavigation.appendChild(addNew);
  return projectNavigation;
};

export { Projects };
