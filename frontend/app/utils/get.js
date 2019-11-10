import { splitByDot } from 'ramda-extension';
import { isNil } from 'ramda';

export default (object, path, notSetValue) => {
  const needle = object.getIn(
    splitByDot(path),
    notSetValue,
  );

  if (isNil(needle)) {
    console.warn('Needle was undefined');
    return notSetValue;
  }

  return needle.toJS ? needle.toJS() : needle;
};
