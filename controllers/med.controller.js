const  medModel  = require("../models/med.model");
const { handleHttpError } = require("../utils/handleError");

/**
 * Get drones list
 * @param {*} req 
 * @param {*} res 
 */
const getMeds = async (req, res) => {
    try {
        const data = await medModel.find();
        res.status(200).send({
            success: true,
            data
        })
    } catch (error) {
        console.log(e);
        handleHttpError(res, "ERROR_GET_MEDES");
    }
}


const getMed = async (req, res) => {
    const { id } = req.params;

    try {
        const data = await medModel.find({ id })
        res.status(200).send({
            success: true,
            data
        })
    } catch (error) {
        console.log(e);
        handleHttpError(res, `ERROR_GET_MED: ${id}`);
    }
}

const createMed = async (req, res) => {
    const body = req.body;

    try {
        await medModel.create(body);
        res.status(201).send({});
    } catch (error) {
        console.log(e);
        handleHttpError(res, `ERROR_CREATE_MED: ${id}`);
    }
}

const updateMed = async (req, res) => {
    const body = req.body;
    const id = req.params.id;

    try {
        await medModel.findOneAndUpdate(id, body);
        res.status(200).send({})
    } catch (error) {
        console.log(e);
        handleHttpError(res, `ERROR_UPDATE_MED: ${id}`);
    }
}

const deleteMed = async (req, res) => {
    const id = req.params.id;

    try {
        await medModel.delete({_id:id});
        res.status(200).send({})
    } catch (error) {
        console.log(e);
        handleHttpError(res, `ERROR_DELETE_MED: ${id}`);
    }
}

module.exports = { getMeds, getMed, createMed, updateMed, deleteMed };
