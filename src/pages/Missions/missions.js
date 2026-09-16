import { getTasks } from '../../api/taskApi.js';
import { getProjects } from '../../api/projectApi.js';
import { TaskList } from '../../components/TaskList/taskList.js';
import { PageTitle } from '../../components/PagetTitle/pageTitle.js';
import { Projects } from '../../components/Projects/projects.js';
import { AddTaskButton } from '../../components/AddTask/addTask.js';

const MyMissions = (param = 'all') => {
  const section = document.createElement('section');

  const sectionTitle = PageTitle(
    'My Missions',
    'A plan is simply a list of choices',
    Projects,
    AddTaskButton
  );
  section.appendChild(sectionTitle);

  const allTasks = getTasks();
  const missions = TaskList(allTasks);
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
