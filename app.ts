import express  from 'express';
import path  from 'path';
import cookieParser  from 'cookie-parser';
import logger  from 'morgan';

import indexRouter from './src/routes/index';
import usersRouter from './src/routes/users';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// eslint-disable-next-line no-undef
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

export default app;