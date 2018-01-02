const getDefaultEnv = (env, defaultEnv) => {
  if (env === 'undefined') {
    return defaultEnv;
  }
  return env;
};
const getDefaultAPIEnvs = (env) => {
  const envs = {};
  switch (env) {
    case 'mock':
      envs.API_PATH = 'https://easy-mock.com/mock/5a12f09d09c9d418f0cea0a6/fdstp';
      break;
    case 'develpment':
      envs.API_PATH = '';
      break;
    case 'production':
      envs.API_PATH = 'http://47.92.112.44:8080';
      // envs.API_PATH = 'http://192.168.1.133:8080';
      break;
    default:
      envs.API_PATH = 'WOCACA';
      break;
  }
  return envs;
};
export const API_ENV = getDefaultEnv(process.env.API_ENV, 'production');
const envs = getDefaultAPIEnvs(API_ENV);
export const API_PATH = getDefaultEnv(process.env.API_PATH, envs.API_PATH);
