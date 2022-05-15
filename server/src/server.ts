import express, {Request, Response} from "express";
import { routes } from './routes'


const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes)

app.listen(port, () => {
    console.log(`Server rodando ona porta ${port}`);
});