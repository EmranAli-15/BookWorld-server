import express, { Request, Response } from 'express';
import cors from 'cors';
import { categoryRoutes } from './app/modules/category/category.router';
export const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());

app.use(cors());


app.use('/api', categoryRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello from Express with TypeScript!');
});