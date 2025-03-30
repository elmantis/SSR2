import { Request, Response } from 'express';
import UsersModel from '../../models/UsersModel';

type Payload = {
    data: string;
}

type UserControllerType = {
    show: (req: Request, res: Response) => Promise<void>;
}

const UsersController:UserControllerType ={
    show: async (req:Request, res:Response): Promise<void> => {
        const data:Payload = {
            data: "Added new user"
        } 
        console.log(req.body)
        const { db } = req.app.locals
        const user = req.body
        
        await UsersModel.create(db, user)

        res.status(200).json(data)

      },
}

export default UsersController;