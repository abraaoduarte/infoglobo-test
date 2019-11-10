import errorToResponse from 'helpers/error-to-response';
import makeUserResponse from './utils/make-user-response';
import { makeLogin, findUser } from './repository';

const login = (req, res) => makeLogin(req.body)
  .then(makeUserResponse)
  .then(response => res.send({ result: response }))
  .catch((error) => {
    const [status, response] = errorToResponse(error);
    return res.status(status).send(response);
  });

const renew = (req, res) => findUser({ _id: req.user.id })
  .then(makeUserResponse)
  .then(response => res.send({ result: response }))
  .catch((error) => {
    const [status, response] = errorToResponse(error);
    return res.status(status).send(response);
  });

export { login, renew };
