import express, { Request, Response } from 'express';
import cors from 'cors';
export const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.use(cors());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello from Express with TypeScript!');
});