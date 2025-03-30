import { Request, Response } from "express";
import UsersModel from "../../models/UsersModel";

type UserControllerProps = {
  show: (req: Request, res: Response) => Promise<void>;
  update: (req: Request, res: Response) => Promise<void>;

};

const UserController: UserControllerProps = {
  show: async (req: Request, res: Response): Promise<void> => {
    const { db } = req.app.locals;
    const { id } = req.params;
    const data = await UsersModel.findOne(db, id);

    res.status(200).json({ data });
  },
  update: async (req: Request, res: Response): Promise<void> => {
    const { db } = req.app.locals;
    const { id } = req.params;
    const user = req.body

    const data = await UsersModel.update(db, id, user);

    res.status(200).json({ data });
  },
};

export default UserController;
