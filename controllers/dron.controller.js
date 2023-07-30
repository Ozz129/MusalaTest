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
        console.log(e);
        handleHttpError(res, "ERROR_GET_DRONES");
    }
}


const getDron = async (req, res) => {
    const { id } = req.params;
    console.log('***', id)
    try {
        const data = await droneModel.find({_id: id })
        res.status(200).send({
            success: true,
            data
        })
    } catch (error) {
        console.log(e);
        handleHttpError(res, `ERROR_GET_DRON: ${id}`);
    }
}

const createDrone = async (req, res) => {
    const body = req.body;

    try {
        await droneModel.create(body);
        res.status(201).send({});
    } catch (error) {
        console.log(e);
        handleHttpError(res, `ERROR_CREATE_DRON: ${id}`);
    }
}

const updateDrone = async (req, res) => {
    const body = req.body;
    const id = req.params.id;

    try {
        await droneModel.findOneAndUpdate(id, body);
        res.status(200).send({})
    } catch (error) {
        console.log(e);
        handleHttpError(res, `ERROR_UPDATE_DRON: ${id}`);
    }
}

const deleteDrone = async (req, res) => {
    const id = req.params.id;

    try {
        await droneModel.delete({_id:id});
        res.status(200).send({})
    } catch (error) {
        console.log(e);
        handleHttpError(res, `ERROR_DELETE_DRON: ${id}`);
    }
}

module.exports = { getDrones, getDron, createDrone, updateDrone, deleteDrone };
