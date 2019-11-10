import jwt from 'jwt-simple';
import moment from 'moment';
import env from 'helpers/env';

const makeUserResponse = (user) => {
  const payload = {
    exp: moment().add(14, 'days').unix(),
    iat: moment().unix(),
    sub: { id: user.id },
  };

  const data = {
    id: user.id,
    name: user.name,
    is_active: user.is_active,
    email: user.email,
  };

  // tirar dúvida
  return {
    token: jwt.encode(payload, env('JWT_SECRET', 1234).toString()),
    user: {
      ...data,
    },
  };
};

export default makeUserResponse;
