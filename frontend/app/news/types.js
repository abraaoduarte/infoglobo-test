import { types, async } from 'utils/type-creator';

export default types([
  'CLEAR_FORM',
  'SET_LOADING_FORM',
  ...async('LIST'),
  ...async('CREATE'),
  ...async('REMOVE'),
  ...async('SHOW'),
  ...async('UPDATE'),
], 'NEWS');
