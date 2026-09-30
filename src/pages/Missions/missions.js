import { getProjects } from '../../api/projectApi.js';
import { TaskList } from '../../components/TaskList/taskList.js';
import { PageTitle } from '../../components/PagetTitle/pageTitle.js';
import { Projects } from '../../components/Projects/projects.js';

const MyMissions = (param = 'all') => {
  const section = document.createElement('section');

  const sectionTitle = PageTitle(
    'My Missions',
    'A plan is simply a list of choices',
    Projects,
    ''
  );
  section.appendChild(sectionTitle);

  const missions = TaskList(param);
  section.append(missions);

  return section;
};

const missionsParams = (paramValue) => {
  const projects = getProjects();
  const projectIDs = projects.map((project) => project.id);
  if (projectIDs.includes(paramValue)) {
    return paramValue;
  } else {
    return null;
  }
};

export { MyMissions, missionsParams };
