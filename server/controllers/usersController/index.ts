import { Request, Response } from 'express';
import UsersModel from '../../models/UsersModel';

type UserControllerProps = {
    index: (req: Request, res: Response) => Promise<void>;
    create: (req: Request, res: Response) => Promise<void>;
}

const UsersController: UserControllerProps = {
    index: async (req, res): Promise<void> => {
        const { db } = req.app.locals
        const data = await UsersModel.index(db);

        res.status(200).json({ data });

    },
    create: async (req, res) => {
        const { db } = req.app.locals
        const user = req.body
        const data = await UsersModel.create(db, user)

        res.status(200).json({ data })

    },
}

export default UsersController;