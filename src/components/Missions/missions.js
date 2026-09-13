import { getTasks } from '../../api/data_manager';
import { TaskList } from '../TaskList/taskList';

const MyMissions = () => {
  const section = document.createElement('section');

  const sectionTitle = document.createElement('h2');
  sectionTitle.textContent = 'My Missions';
  section.appendChild(sectionTitle);

  const allTasks = getTasks();
  const missions = TaskList(allTasks);
  section.append(missions);

  return section;
};

export { MyMissions };
