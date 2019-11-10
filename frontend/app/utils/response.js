import { message } from 'antd';
import {
  pathOr, __, flip, cond, equals, T,
} from 'ramda';

const getMessage = flip(pathOr(__, ['data', 'message']));

export default {
  success: ({ payload: response }) => {
    message.success(getMessage(response, 'A operação foi bem sucedida!'));
    return response;
  },
  edit: cond([
    [equals(404), () => 'Os dados que você tentou editar não existem'],
    [equals(401), () => 'Por favor, faça o login primeiro'],
    [T, () => 'Houve um erro inesperado ao tentar editar esses dados'],
  ]),
  error: ({ error: { response } }) => {
    message.error(getMessage(response, 'Houve um problema não reconhecido com esta operação. Tente mais tarde.'));
    return response;
  },
};
