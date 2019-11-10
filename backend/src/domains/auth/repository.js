import bcrypt from 'bcrypt';
import User from 'schemas/user';
import HttpResponseError from 'exceptions/HttpResponseError';
import loginValidator from './utils/cms-login-validator';

const findUser = where => User.findOne(where);

const makeLogin = async (form) => {
  if (!loginValidator(form)) {
    throw new HttpResponseError({
      status: 401,
      message: 'Email e senha são necessários para o login',
    });
  }

  const user = await findUser({ email: form.email.toLowerCase().trim() });

  if (!user) {
    throw new HttpResponseError({
      status: 401,
      message: 'Usuário não consta em nossa base',
    });
  }

  if (!user.is_active) {
    throw new HttpResponseError({
      status: 401,
      message: 'Usuário inativo',
    });
  }


  if (!(await bcrypt.compare(form.password, user.password))) {
    throw new HttpResponseError({
      status: 401,
      message: 'Senha inválida',
    });
  }

  return user;
};

export { makeLogin, findUser };
