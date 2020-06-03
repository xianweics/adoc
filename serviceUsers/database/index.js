import action from './action';

export default function database (method, item, ...args) {
  return action[item][method](args);
}
