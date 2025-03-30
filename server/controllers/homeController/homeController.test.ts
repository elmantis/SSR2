import HomeController from ".";
import { Request, Response } from 'express';

describe('HomeController', () => {
    describe(HomeController.show, () => {
        it('returns Hello World', async () => {
            const req = {} as unknown as Request;
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as unknown as Response;

            await HomeController.show(req, res)

            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith({
                "data": "Hello World",
            })
        })
    })
})