import express from 'express';
import { connect } from './typeorm-config';
import { json } from 'body-parser';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import userRouter from './users/user.router';
import authRouter from './auth/auth.router';
import { router as coursesRouter } from './courses/courses.router';
import { router as positionsRouter } from './positions/positions.router';
import { router as modesRouter } from './modes/modes.router';
import { router as categoriesRouter } from './categories/categories.router';
import sectorRouter from './sector/sector.router';

dotenv.config();

const app = express();
const port = process.env.PORT ?? 3000;

app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));

app.use(json());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/courses', coursesRouter);
app.use('/api/v1/positions', positionsRouter);
app.use('/api/v1/modes', modesRouter);
app.use('/api/v1/categories', categoriesRouter);
app.use('/api/v1/sectors', sectorRouter);

connect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.log('Error connecting to database:', error);
  });
