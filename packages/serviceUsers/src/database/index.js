import action from './action.js';

export default function database (method, item, ...args) {
  return action[item][method](args);
}
