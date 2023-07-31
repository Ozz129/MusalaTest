const {
    getDrones,
    getDron,
    createDrone,
    updateDrone,
    deleteDrone,
  } = require("../controllers/dron.controller");

const  droneModel  = require("../models/drone.model");
jest.mock('../models/drone.model');

describe('getDrones_function', () => {

    it('should return a successful response with drone data', async () => {
        const mockData = [
            { _id: '1', battery: 80 },
            { _id: '2', battery: 60 },
        ];

        droneModel.find = jest.fn().mockResolvedValue(mockData);

        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };

        await getDrones(req, res);

        expect(droneModel.find).toHaveBeenCalled();

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({ success: true, data: mockData });
    });


    it('should handle errors and return an error response', async () => {
        droneModel.find = jest.fn().mockRejectedValue(new Error('Database connection error'));
    
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
    
        await getDrones(req, res);
    
        expect(droneModel.find).toHaveBeenCalled();
    
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({ error: 'ERROR_GET_DRONES' });
    });
});

describe('getDron_function', () => {
    it('should return a successful response with drone data', async () => {
        const mockData = [
          { _id: '1', battery: 80 },
          { _id: '2', battery: 60 },
        ];
    
        droneModel.findById.mockResolvedValue(mockData[0]);
    
        const id = '1';
    
        const req = { params: { id } };
        const res = {
          status: jest.fn().mockReturnThis(),
          send: jest.fn(),
        };
    
        await getDron(req, res);
    
        expect(droneModel.findById).toHaveBeenCalledWith( id );
    
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({ success: true, data: mockData[0] });
    });

    it('should handle errors and return an error response', async () => {
        const errorMessage = 'Database connection error';
        droneModel.findById.mockRejectedValue(new Error(errorMessage));
    
        const id = '1';
    
        const req = { params: { id } };
        const res = {
          status: jest.fn().mockReturnThis(),
          send: jest.fn(),
        };
    
        await getDron(req, res);
    
        expect(droneModel.findById).toHaveBeenCalledWith( id );
    
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({ error: `ERROR_GET_DRON: ${id}` });
    });
});

describe('createDrone_function', () => {
    it('should create a new drone and return a successful response', async () => {
        const newDrone = {
          battery: 100,
        };
    
        droneModel.create.mockResolvedValue(newDrone);
    
        const req = { body: newDrone };
        const res = {
          status: jest.fn().mockReturnThis(),
          send: jest.fn(),
        };
    
        await createDrone(req, res);
    
        expect(droneModel.create).toHaveBeenCalledWith(newDrone);
    
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalledWith({});
      });
    
      it('should handle errors and return an error response', async () => {
        const errorMessage = 'Database connection error';
        droneModel.create.mockRejectedValue(new Error(errorMessage));
    
        const newDrone = {
          battery: 100,
        };
    
        const req = { body: newDrone };
        const res = {
          status: jest.fn().mockReturnThis(),
          send: jest.fn(),
        };
    
        await createDrone(req, res);
    
        expect(droneModel.create).toHaveBeenCalledWith(newDrone);
    
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({ error: `ERROR_CREATE_DRON` });
      });
});

describe('updateDrone_function', () => {
    it('should update the drone and return a successful response', async () => {
        const id = '1';
    
        const updatedDrone = {
          battery: 90,
        };
    
        droneModel.findOneAndUpdate.mockResolvedValue(updatedDrone);
    
        const req = { body: updatedDrone, params: { id } };
        const res = {
          status: jest.fn().mockReturnThis(),
          send: jest.fn(),
        };
    
        await updateDrone(req, res);
    
        expect(droneModel.findOneAndUpdate).toHaveBeenCalledWith({ _id: id }, updatedDrone);
    
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({});
    });

    it('should handle errors and return an error response', async () => {
        const id = '1';
    
        const errorMessage = 'Database connection error';
        droneModel.findOneAndUpdate.mockRejectedValue(new Error(errorMessage));
    
        const updatedDrone = {
          battery: 90,
        };
    
        const req = { body: updatedDrone, params: { id } };
        const res = {
          status: jest.fn().mockReturnThis(),
          send: jest.fn(),
        };
    
        await updateDrone(req, res);
    
        expect(droneModel.findOneAndUpdate).toHaveBeenCalledWith({ _id: id }, updatedDrone);
    
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({error: `ERROR_UPDATE_DRON` });
    });
})

describe('deleteDron_function', () => {
    it('should delete the drone and return a successful response', async () => {
        const id = '1';
    
        droneModel.delete.mockResolvedValue({});
    
        const req = { params: { id } };
        const res = {
          status: jest.fn().mockReturnThis(),
          send: jest.fn(),
        };
    
        await deleteDrone(req, res);
    
        expect(droneModel.delete).toHaveBeenCalledWith({ _id: id });
    
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({});
      });
    
      it('should handle errors and return an error response', async () => {
        const id = '1';
    
        const errorMessage = 'Database connection error';
        droneModel.delete.mockRejectedValue(new Error(errorMessage));
    
        const req = { params: { id } };
        const res = {
          status: jest.fn().mockReturnThis(),
          send: jest.fn(),
        };
    
        await deleteDrone(req, res);
    
        expect(droneModel.delete).toHaveBeenCalledWith({ _id: id });
    
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({error: `ERROR_DELETE_DRON` });
      });
})