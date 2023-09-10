import express from 'express';
import { connect } from './typeorm-config';
import { json } from 'body-parser';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import userRouter from './routes/user.router';
import authRouter from './routes/auth.router';
import { router as coursesRouter } from './routes/course.router';

dotenv.config();

const app = express();
const port = process.env.PORT ?? 3000;

app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));

app.use(json());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/courser', coursesRouter);

connect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.log('Error connecting to database:', error);
  });
