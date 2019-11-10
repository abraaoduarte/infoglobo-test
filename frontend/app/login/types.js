import { types, async } from 'utils/type-creator';

export default types([
  'SET_USER',
  'SET_TOKEN',
  'SET_LOADING',
  ...async('AUTH'),
  ...async('RENEW'),
], 'LOGIN');
