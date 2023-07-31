const  droneModel  = require("../models/drone.model");
const  auditModel  = require("../models/audit.model");

const updateBatteryStatus = async () => {
   await droneModel.updateMany({battery: { $lte: 25 } }, {batteryStatus: false})
}

const dischargeBattery = async () => {
    try {
        const dronesToUpdate = await droneModel.find({});
    
        await Promise.all(
          dronesToUpdate.map(async (drone) => {
            const newBatteryLevel = drone.battery -= 1;

            const auditLog = {
                drone: drone._id,
                event: 'battery_check',
                batteryLevel: newBatteryLevel,
                timestamp: new Date(),
              };
            
            await auditModel.create(auditLog);
            drone.battery = newBatteryLevel
            return await drone.save();
          })
        );
    
      } catch (error) {
        console.error('Error actualizando documentos:', error);
      }
 }

 module.exports = { dischargeBattery, updateBatteryStatus };
