const MyMissions = () => {
  console.log('MyMissions component');
  const section = document.createElement('section');
  const sectionTitle = document.createElement('h2');
  sectionTitle.textContent = 'My Missions';

  section.appendChild(sectionTitle);
  return section;
};

export { MyMissions };
