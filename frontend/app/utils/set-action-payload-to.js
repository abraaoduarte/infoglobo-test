import { dotPath } from 'ramda-extension';

const setActionPayloadTo = (to, path) => (state, { payload }) => (Array.isArray(to)
  ? state.setIn(to, path ? dotPath(path, payload) : payload)
  : state.set(to, path ? dotPath(path, payload) : payload));

export default setActionPayloadTo;
