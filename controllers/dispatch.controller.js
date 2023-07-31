const  dispatchModel  = require("../models/dispatch.model");
const  dronModel  = require("../models/drone.model");

const { handleHttpError } = require("../utils/handleError");

/**
 * Get drones list
 * @param {*} req 
 * @param {*} res 
 */
const createDispatch = async (req, res) => {
    const { meds, drone, destination } = req.body;

    let medsLoaded = []
    let needsToCheck = []
    try {
        const dronData = await dronModel.findOne({_id: drone});

        if (!dronData.batteryStatus) {
            return handleHttpError(res, `ERROR_BATTERY_LOW`);
        }else if(!dronData.loadStatus) {
           return  handleHttpError(res, `ERROR_NOT_AVAILABLE_SPACE`);
        }
        
        let newDronLoad = dronData.capacity
        let updateStatus = false;
        for (const med of meds) {
            const result = await checkDronAvailability(dronData.id, newDronLoad, med, dronData.statusBattery, dronData.loadStatus, updateStatus)
            newDronLoad = newDronLoad - med.quantity

            if (result.newQuantity == 0) {
                await dronModel.findOneAndUpdate({_id: dronData.id}, {loadStatus: false});
            }

            if (result) {
                result.newQuantity >= 0 ? medsLoaded = [...medsLoaded, result.med] : needsToCheck = [...needsToCheck, result.med]
            }
        }

        req.body.meds = medsLoaded;

        const createdDispatch = await dispatchModel.create(req.body)

        let objRta = {}
        if (needsToCheck.length > 0) {
            objRta = {
                success: true,
                message: 'Due to capacity, the following medications could not be loaded onto the drone',
                meds: needsToCheck,
                dronCapacity: dronData.capacity,
                currentDispatch: createdDispatch
            }
        } 

        res.status(201).send(objRta)
    } catch (error) {
        handleHttpError(res, `ERROR_CREATE_DISPATCH`, 500);
    }
}
const getDronDispatches = async (req, res) => {
    const { idDron } = req.params;
    try {
        const data = await dispatchModel.find({ drone: idDron })
        res.status(200).send({
            success: true,
            data
        })
    } catch (error) {
        console.log(error);
        handleHttpError(res, `ERROR_GET_MED: ${id}`);
    }
}

const checkDronAvailability = async (id, dronQuantity, med, statusBattery, loadStatus) => {
    if (!loadStatus && !statusBattery ){
        return false;
    } else {
        const newQuantity = dronQuantity - med.quantity;
        return {
            med,
            newQuantity
        }
    }
}



module.exports = { createDispatch, getDronDispatches };
