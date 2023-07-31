const  droneModel  = require("../models/drone.model");
const { handleHttpError } = require("../utils/handleError");

/**
 * Get drones list
 * @param {*} req 
 * @param {*} res 
 */
const getDrones = async (req, res) => {
    try {
        const data = await droneModel.find();
        res.status(200).send({
            success: true,
            data
        })
    } catch (error) {
        handleHttpError(res, "ERROR_GET_DRONES", 500);
    }
}


const getDron = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await droneModel.findById(id)
        res.status(200).send({
            success: true,
            data
        })
    } catch (error) {
        handleHttpError(res, `ERROR_GET_DRON: ${id}`, 500);
    }
}

const createDrone = async (req, res) => {
    const body = req.body;

    try {
        await droneModel.create(body);
        res.status(201).send({});
    } catch (error) {
        handleHttpError(res, `ERROR_CREATE_DRON`, 500);
    }
}

const updateDrone = async (req, res) => {
    const body = req.body;
    const id = req.params.id;

    try {
        await droneModel.findOneAndUpdate({_id: id}, body);
        res.status(200).send({})
    } catch (error) {
        handleHttpError(res, `ERROR_UPDATE_DRON`, 500);
    }
}

const deleteDrone = async (req, res) => {
    const id = req.params.id;

    try {
        await droneModel.delete({_id:id});
        res.status(200).send({})
    } catch (error) {
        handleHttpError(res, `ERROR_DELETE_DRON`, 500);
    }
}

module.exports = { getDrones, getDron, createDrone, updateDrone, deleteDrone };
