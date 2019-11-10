import { splitByDot } from 'ramda-extension';

const setValueTo = (to, value) => state => (Array.isArray(to)
  ? state.setIn(to, value)
  : state.setIn(splitByDot(to), value));

export default setValueTo;
