import { Request, Response } from "express";


type Payload = {
    data: string;
}
type HomeControllerType = {
    show: (req: Request, res: Response) => Promise<void>;
}

const HomeController: HomeControllerType = {
    show: async (_req, res) => {
        const data: Payload = {
            data: "Hello World"
        }

        res.status(200).json(data);

    },
}

export default HomeController;