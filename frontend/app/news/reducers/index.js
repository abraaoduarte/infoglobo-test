import { combineReducers } from 'redux-immutable';
import list from './list';
import form from './form';
import information from './information';

export default combineReducers({
  list,
  form,
  information,
});
