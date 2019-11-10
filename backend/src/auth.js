import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import User from 'schemas/user';
import env from 'helpers/env';

const params = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: env('JWT_SECRET', 1234).toString(),
};

const strategyHandlerApi = () => (payload, done) => {
  const { id } = payload.sub;

  return User
    .findOne({ _id: id, is_active: true })
    .then(user => done(null, user));
};

const adminStrategy = new Strategy(params, strategyHandlerApi());

passport.use('api', adminStrategy);

export const lockForApi = (options = {}) => passport.authenticate('api', {
  session: false,
  failWithError: true,
  ...options,
});
