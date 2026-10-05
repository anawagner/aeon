import { getProjects } from '../../api/projectApi';
import './projects.css';

const Projects = () => {
  const projectList = getProjects();

  const projectNavigation = document.createElement('div');
  projectNavigation.classList.add('project-navigation');

  addProjectLink(`/`, 'All', projectNavigation);

  projectList.forEach((project) => {
    addProjectLink(`#${project.id}`, project.name, projectNavigation);
  });

  const addNew = addProjectLink(
    `#my-missions/`,
    '+ Add a Mission',
    projectNavigation
  );
  addNew.classList.add('add-new');
  return projectNavigation;
};

const addProjectLink = (uri, label, parent) => {
  const div = document.createElement('div');
  div.classList.add('project');

  const link = document.createElement('a');
  link.href = uri;
  link.textContent = label;
  div.appendChild(link);
  parent.appendChild(div);
  return div;
};
export { Projects };
