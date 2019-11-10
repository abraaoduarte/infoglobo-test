import { fromJS } from 'immutable';

export default prefix => ({
  [`${prefix}_SET_CITIES`]: (state, { payload }) => state.setIn(
    ['cities', payload.index],
    fromJS(payload.cities),
  ),
  [`${prefix}_ADD_ADDRESS`]: state => state.set('addresses', state.get('address') + 1),
  [`${prefix}_REMOVE_ADDRESS`]: (state, { payload }) => state.set(
    'removedAddresses',
    state.set('removedAddresses').push(payload),
  ).deleteIn(['cities', payload]),
});
