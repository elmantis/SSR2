import UsersController from '.';
import { Request, Response } from 'express';
import admin from 'firebase-admin';

describe('UsersController', () =>{ 
    describe(UsersController.index, () =>{
        it('should get all users', async () => {
            const db = admin.database();
            const req = { app: { locals: { db } } } as unknown as Request;
            const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn(),
              headersSent: false,
            } as unknown as Response;
        
            await UsersController.index(req, res);
        
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
              data: [
                 {  "id": "user123",name: 'Test User 1',   zipCode: 1111,
                    longitude: "longtidue",
                    latitude: "latitude", },
                 { "id": "user456", name: 'Test User 2',zipCode: 112211,
                    longitude: "longtidue",
                    latitude: "latitude", },
              ],
            });
          });
    })

    describe(UsersController.show, () =>{
        it('adds a new user to the user list and returns that user', async () => {
            const data = { name: "Test User", email: "test@example.com" };
            const db = admin.database();
            const req = { app: { locals: { db } }, body: data } as unknown as Request;
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
                headersSent: false,
              } as unknown as Response;
          
              await UsersController.show(req, res);
              expect(res.status).toHaveBeenCalledWith(200);

              expect(res.json).toHaveBeenCalledWith({
                data:{
                         "latitude": "latitude",
                         "longitude": "longtidue",
                         "name": "Test User 3",
                         "zipCode": 1133311,
                       }})

        })
    })
})