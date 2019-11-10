import { pick } from 'ramda';

const loginValidator = (body) => {
  const required = pick(['email', 'password'], body);
  return Object.values(required).filter(Boolean).length === 2;
};

export default loginValidator;
