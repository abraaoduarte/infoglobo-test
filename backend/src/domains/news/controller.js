import errorToResponse from 'helpers/error-to-response';
import * as Repo from './repository';

const handle = item => (req, res) => item(req)
  .then(result => res.send({ result }))
  .catch((error) => {
    const [status, response] = errorToResponse(error);
    res.status(status).send(response);
  });

const create = handle(req => Repo
  .create({
    ...req.body,
  }));
const show = handle(({ params }) => Repo.show(params.id));
const update = handle(({ params, body }) => Repo.update(params.id, body));
const index = handle(({ user, query }) => Repo.all(user, query));
const destroy = handle(({ params }) => Repo.destroy(params.id));


export {
  create,
  index,
  show,
  update,
  destroy,
};
