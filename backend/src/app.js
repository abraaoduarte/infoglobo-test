import '@babel/polyfill';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import moment from 'moment';
import api from 'routes/api';
import env from 'helpers/env';
import express from 'express';
import auth from 'routes/auth';
import mongoose from 'mongoose';
import notifier from 'node-notifier';
import bodyParser from 'body-parser';
import compression from 'compression';
import apiErrorHandler from 'middlewares/api-error-handler';
import apiResponseHelper from 'middlewares/api-response-helper';
import notFoundHandler from 'middlewares/not-found-handler';

const app = express();
const environment = env('NODE_ENV', 'development');
const { lockForApi } = require('./auth');

mongoose.set('useCreateIndex', true);
mongoose.connect(env('MONGO_URL'), {
  useUnifiedTopology: true,
  useNewUrlParser: true,
})
  .then(() => console.log('db connected'))
  .catch(error => console.log(error));

morgan.token('custom-date', () => `[${moment().format('Y-MM-DD H:mm:ss')}]`);
const morganLogConfig = environment === 'development'
  ? 'dev'
  : ':custom-date :remote-addr - :remote-user ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :response-time ms';

app.use(morgan(morganLogConfig, {
  skip: () => app.get('env') === 'test',
}));
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(cors());
app.options('*', cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());
app.use(compression());
app.use(apiResponseHelper);
app.use('/api', lockForApi(), api);
app.use('/auth', auth);

app.use(apiErrorHandler);
app.use(notFoundHandler);

app.listen(env('PORT', 3000), async () => {
  console.log(`Server listening on port: 127.0.0.1:${env('PORT')}`);

  if (environment === 'development') {
    notifier.notify({
      title: 'Server Start',
      message: `Server listening on port: 127.0.0.1:${env('PORT')}!`,
    });
  }

  console.log(`ENV: ${environment}`);
});
