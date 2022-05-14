const routes = {
  ROOT: '/',
  LOGIN: '/login',
  PROJECT: (id?: string | number) => `/project/${id}`,
  ADMIN: '/admin',
  ADMIN_PROFILES: '/admin/profiles',
  ADMIN_PROJECTS: '/admin/projects',
  ADMIN_SETTINGS: '/admin/settings',
};

export default routes;
