const {
    getMed,
    getMeds,
    createMed,
    updateMed,
    deleteMed,
  } = require("../controllers/med.controller");
  const  medModel  = require("../models/med.model");
  jest.mock('../models/med.model');

  const mockData = [
    {   _id: "1",
    "serial": "serial1",
    "name": "synergies Shilling overriding",
    "deleted": false,
    "createdAt": "2023-07-29T20:56:53.864Z",
    "updatedAt": "2023-07-31T11:57:49.653Z",
    "__v": 0 },
    {   "_id": "2",
    "serial": "serial2",
    "name": "synergies Shilling overriding",
    "deleted": false,
    "createdAt": "2023-07-29T20:56:53.864Z",
    "updatedAt": "2023-07-31T11:57:49.653Z",
    "__v": 0 },
];

describe('getMeds_function', () => {
    it('should return a successful response with med data', async () => {
         medModel.find = jest.fn().mockResolvedValue(mockData);

        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };

        await getMeds(req, res);

        expect(medModel.find).toHaveBeenCalled();

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({ success: true, data: mockData });
    });


    it('should handle errors and return an error response', async () => {
        medModel.find = jest.fn().mockRejectedValue(new Error('Database connection error'));
    
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
    
        await getMeds(req, res);
    
        expect(medModel.find).toHaveBeenCalled();
    
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({ error: 'ERROR_GET_MEDS' });
    });
});

describe('getMed_function', () => {
    it('should return a successful response with med data', async () => {
     
        medModel.findById.mockResolvedValue(mockData[0]);
    
        const id = '1';
    
        const req = { params: { id } };
        const res = {
          status: jest.fn().mockReturnThis(),
          send: jest.fn(),
        };
    
        await getMed(req, res);
    
        expect(medModel.findById).toHaveBeenCalledWith( id );
    
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({ success: true, data: mockData[0] });
    });

    it('should handle errors and return an error response', async () => {
        const errorMessage = 'Database connection error';
        medModel.findById.mockRejectedValue(new Error(errorMessage));
    
        const id = '1';
    
        const req = { params: { id } };
        const res = {
          status: jest.fn().mockReturnThis(),
          send: jest.fn(),
        };
    
        await getMed(req, res);
    
        expect(medModel.findById).toHaveBeenCalledWith( id );
    
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({ error: `ERROR_GET_MED` });
    });
});

describe('createMed_function', () => {
    it('should create a new med and return a successful response', async () => {
        const newMed = {
            "serial": "jft98",
            "name": "synergies Shilling overriding",
        };
    
        medModel.create.mockResolvedValue(newMed);
    
        const req = { body: newMed };
        const res = {
          status: jest.fn().mockReturnThis(),
          send: jest.fn(),
        };
    
        await createMed(req, res);
    
        expect(medModel.create).toHaveBeenCalledWith(newMed);
    
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalledWith({});
      });
    
      it('should handle errors and return an error response', async () => {
        const errorMessage = 'Database connection error';
        medModel.create.mockRejectedValue(new Error(errorMessage));
    
        const newMed = {
            "serial": "jft98",
            "name": "synergies Shilling overriding",
        };
        
        const req = { body: newMed };
        const res = {
          status: jest.fn().mockReturnThis(),
          send: jest.fn(),
        };
    
        await createMed(req, res);
    
        expect(medModel.create).toHaveBeenCalledWith(newMed);
    
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({ error: `ERROR_CREATE_MED` });
      });
})

describe('updateMed_function', () => {
    it('should update the med and return a successful response', async () => {
        const id = '1';
    
        const updatedMed = {
          serial: "serialUpdated",
        };
    
        medModel.findOneAndUpdate.mockResolvedValue(updatedMed);
    
        const req = { body: updatedMed, params: { id } };
        const res = {
          status: jest.fn().mockReturnThis(),
          send: jest.fn(),
        };
    
        await updateMed(req, res);
    
        expect(medModel.findOneAndUpdate).toHaveBeenCalledWith({ _id: id }, updatedMed);
    
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({});
    });

    it('should handle errors and return an error response', async () => {
        const id = '1';
    
        const errorMessage = 'Database connection error';
        medModel.findOneAndUpdate.mockRejectedValue(new Error(errorMessage));
    
        const updatedMed = {
            serial: "serialUpdated",
        };
    
        const req = { body: updatedMed, params: { id } };
        const res = {
          status: jest.fn().mockReturnThis(),
          send: jest.fn(),
        };
    
        await updateMed(req, res);
    
        expect(medModel.findOneAndUpdate).toHaveBeenCalledWith({ _id: id }, updatedMed);
    
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({error: `ERROR_UPDATE_MED` });
    });
})

describe('deleteMed_function', () => {
    it('should delete the med and return a successful response', async () => {
        const id = '1';
    
        medModel.delete.mockResolvedValue({});
    
        const req = { params: { id } };
        const res = {
          status: jest.fn().mockReturnThis(),
          send: jest.fn(),
        };
    
        await deleteMed(req, res);
    
        expect(medModel.delete).toHaveBeenCalledWith({ _id: id });
    
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({});
      });
    
      it('should handle errors and return an error response', async () => {
        const id = '1';
    
        const errorMessage = 'Database connection error';
        medModel.delete.mockRejectedValue(new Error(errorMessage));
    
        const req = { params: { id } };
        const res = {
          status: jest.fn().mockReturnThis(),
          send: jest.fn(),
        };
    
        await deleteMed(req, res);
    
        expect(medModel.delete).toHaveBeenCalledWith({ _id: id });
    
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({error: `ERROR_DELETE_MED` });
    });
})