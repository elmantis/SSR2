import { Request, Response } from 'express';
import UsersModel from '../../models/UsersModel';

type Payload = {
    data: string;
}

type UserControllerType = {
    index: (req: Request, res: Response) => Promise<void>;
    show: (req: Request, res: Response) => Promise<void>;
}

const UsersController: UserControllerType = {
    index: async (req: Request, res: Response): Promise<void> => {
        const { db } = req.app.locals
        const data = await UsersModel.all(db);

        res.status(200).json({ data });

    },
    show: async (req: Request, res: Response): Promise<void> => {
        const { db } = req.app.locals
        const user = req.body
        const data = await UsersModel.create(db, user)

        res.status(200).json({ data })

    },
}

export default UsersController;