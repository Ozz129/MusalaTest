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
        handleHttpError(res, "ERROR_GET_MEDS", 500);
    }
}


const getMed = async (req, res) => {
    const { id } = req.params;

    try {
        const data = await medModel.findById( id )
        res.status(200).send({
            success: true,
            data
        })
    } catch (error) {
        
        handleHttpError(res, `ERROR_GET_MED`, 500);
    }
}

const createMed = async (req, res) => {
    const body = req.body;

    try {
        await medModel.create(body);
        res.status(201).send({});
    } catch (error) {
        ;
        handleHttpError(res, `ERROR_CREATE_MED`, 500);
    }
}

const updateMed = async (req, res) => {
    const body = req.body;
    const id = req.params.id;

    try {
        await medModel.findOneAndUpdate({_id: id}, body);
        res.status(200).send({})
    } catch (error) {
        handleHttpError(res, `ERROR_UPDATE_MED`, 500);
    }
}

const deleteMed = async (req, res) => {
    const id = req.params.id;

    try {
        await medModel.delete({_id:id});
        res.status(200).send({})
    } catch (error) {
        handleHttpError(res, `ERROR_DELETE_MED`, 500);
    }
}

module.exports = { getMeds, getMed, createMed, updateMed, deleteMed };
