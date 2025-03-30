import UserController from ".";
import { Request, Response } from 'express';
import admin from 'firebase-admin';

describe('UserController', () => {
    describe(UserController.show, () => {
        it('finds a user by id', async () => {
            const db = admin.database();
            const req = { app: { locals: { db } }, params: { id: 'user123' } } as unknown as Request;
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
                headersSent: false,
            } as unknown as Response;

            await UserController.show(req, res)
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                data: {
                    "latitude": "latitude",
                    "longitude": "longtidue",
                    "name": "Test User",
                    "zipCode": 1111,
                }
            })
        })
    })

    describe(UserController.update, () => {
        it('should update user data', async () => {
            const db = admin.database();
            const req = {
                app: { locals: { db } }, params: { id: 'user456' }, body: {
                    name: "Test User 2",
                    zipCode: 112211,
                    longitude: "longtidue",
                    latitude: "latitude",
                }
            } as unknown as Request;
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
                headersSent: false,
            } as unknown as Response;

            await UserController.update(req, res)

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledTimes(1)

        })
    })
})