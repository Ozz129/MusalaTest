const {
    createDispatch
  } = require("../controllers/dispatch.controller");

const  dispatchModel  = require("../models/dispatch.model");
const dronModel = require("../models/drone.model");

jest.mock('../models/dispatch.model');
jest.mock('../models/drone.model');

describe('createMed_function', () => {
    it('should create a new dispatch and return a successful response', async () => {
        const newDispatch = {
          "drone": "1",
          "meds": [
            {
              "med": "64c57d15d1bb7af728599fa0",
              "quantity": 7
            },
            {
              "med": "64c57d15d1bb7af728599fa0",
              "quantity": 3
            }
          ],
          "destination": "Fake street"
        };
    
        dronModel.findOne.mockResolvedValue({ batteryStatus: true, loadStatus: true, capacity: 10 });    
        dispatchModel.create.mockResolvedValue(newDispatch);
    
        const req = { body: newDispatch };
        const res = {
          status: jest.fn().mockReturnThis(),
          send: jest.fn(),
        };
    
        await createDispatch(req, res);
    
        expect(dispatchModel.create).toHaveBeenCalledWith(req.body);
    
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalledWith({});    
    });

    it('should handle errors and return an error response: ERROR_BATTERY_LOW', async () => {
        const newDispatch = {
          "drone": "1",
          "meds": [
            {
              "med": "64c57d15d1bb7af728599fa0",
              "quantity": 7
            },
            {
              "med": "64c57d15d1bb7af728599fa0",
              "quantity": 3
            }
          ],
          "destination": "Fake street"
        };
    
        dronModel.findOne.mockResolvedValue({ batteryStatus: false, loadStatus: true, capacity: 10 });    
        dispatchModel.create.mockResolvedValue(newDispatch);
    
        const req = { body: newDispatch };
        const res = {
          status: jest.fn().mockReturnThis(),
          send: jest.fn(),
        };
    
        await createDispatch(req, res);
    
        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.send).toHaveBeenCalledWith({ error: 'ERROR_BATTERY_LOW' });   
    });

    it('should handle errors and return an error response: ERROR_NOT_AVAILABLE_SPACE', async () => {
        const newDispatch = {
          "drone": "1",
          "meds": [
            {
              "med": "64c57d15d1bb7af728599fa0",
              "quantity": 7
            },
            {
              "med": "64c57d15d1bb7af728599fa0",
              "quantity": 3
            }
          ],
          "destination": "Fake street"
        };
    
        dronModel.findOne.mockResolvedValue({ batteryStatus: true, loadStatus: false, capacity: 10 });    
        dispatchModel.create.mockResolvedValue(newDispatch);
    
        const req = { body: newDispatch };
        const res = {
          status: jest.fn().mockReturnThis(),
          send: jest.fn(),
        };
    
        await createDispatch(req, res);
    
        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.send).toHaveBeenCalledWith({ error: 'ERROR_NOT_AVAILABLE_SPACE' });   
    });

    it('should handle errors and return an error response: ERROR_NOT_AVAILABLE_SPACE', async () => {
        const newDispatch = {
          "drone": "1",
          "meds": [
            {
              "med": "64c57d15d1bb7af728599fa0",
              "quantity": 7
            },
            {
              "med": "64c57d15d1bb7af728599fa0",
              "quantity": 3
            }
          ],
          "destination": "Fake street"
        };
    
        dronModel.findOne.mockResolvedValue({ batteryStatus: true, loadStatus: true, capacity: 10 });    
        const errorMessage = 'Database connection error';
        dispatchModel.create.mockRejectedValue(new Error(errorMessage));  

        const req = { body: newDispatch };
        const res = {
          status: jest.fn().mockReturnThis(),
          send: jest.fn(),
        };
    
        await createDispatch(req, res);
    
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({ error: 'ERROR_CREATE_DISPATCH' });   
    });
})