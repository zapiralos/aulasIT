import express from 'express';
import { connect } from './typeorm-config';
import { json } from 'body-parser';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import userRouter from './routes/user.router';

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));

app.use(json());

app.use('/api/v1/users', userRouter);

connect()
  .then(() => {
    app.listen(process.env.PORT ?? 3000, () => {
      console.log('Server listening on port 3000');
    });
  })
  .catch((error) => {
    console.log('Error connecting to database:', error);
  });
