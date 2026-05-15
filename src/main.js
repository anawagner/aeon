import { registerApp } from './app.js';
import { registerAvatar } from './components/avatar.js';
import { registerBadge } from './components/badge.js';

const app = () => {
  registerApp();
  registerAvatar();
  registerBadge();
};

document.addEventListener('DOMContentLoaded', app);
