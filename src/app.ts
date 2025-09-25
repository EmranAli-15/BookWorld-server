import express, { Request, Response } from 'express';
import cors from 'cors';
import { categoryRoutes } from './app/modules/category/category.router';
import { userRoutes } from './app/modules/user/user.route';
import { writerRoutes } from './app/modules/writer/writer.route';
import { bookRoutes } from './app/modules/book/book.route';
export const app = express();
export const port = process.env.PORT || 5000;
app.use(express.json());

app.use(cors());


app.use('/api', categoryRoutes);
app.use('/api', userRoutes);
app.use('/api', writerRoutes);
app.use('/api', bookRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello from Express with TypeScript!');
});