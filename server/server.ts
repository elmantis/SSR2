import express, { Request, Response, NextFunction, Errback } from "express";
import dotenv from 'dotenv'
import path from "path";
import fs from 'fs'
import admin, { ServiceAccount } from 'firebase-admin';
import { serviceAccount } from './firebase_key'
import handleSSR from "./handleSSR";
import homeRouter from './routes/home';
import usersRouter from './routes/users'
import userRouter from './routes/user'

const pathForEnv = path.join(__dirname, '..', '.env.development')
dotenv.config({ path: pathForEnv });

const app = express();
const port = 3000;


const keys = serviceAccount as ServiceAccount;

admin.initializeApp({
  credential: admin.credential.cert(keys),
  databaseURL: "https://rentreditest-default-rtdb.firebaseio.com"
});

app.locals.db = admin.database()

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", homeRouter);
app.use("/", usersRouter);
app.use("/", userRouter)


app.get("/*", handleSSR);

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err)
  res.status(500).send('There was an error on the server')
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});