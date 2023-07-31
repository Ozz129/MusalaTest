const express = require("express");
const router = express.Router();

const {
  getDrones,
  getDron,
  createDrone,
  updateDrone,
  deleteDrone,
} = require("../controllers/dron.controller");

/**
 * @openapi
 * /drone:
 *     get:
 *       summary: Get drones
 *       description: Retrieve a list of drones
 *       tags: [Dron]
 *       responses:
 *         200:
 *           description: A list of drones.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                   data:
 *                     type: array
 *                     items:
 *                       $ref: '#/definitions/dron'
 *         500:
 *           description: Internal server error.
 * 
 * definitions:
 *  dron:
 *    type: "object"
 *    properties:
 *      _id:
 *        type: "string"
 *      serial:
 *        type: "string"
 *      loadStatus:
 *        type: "boolean"
 *      capacity:
 *        type: "integer"
 *        format: "int32"
 *      battery:
 *        type: "integer"
 *        format: "int32"
 *      batteryStatus:
 *        type: "boolean"
 *      deleted:
 *        type: "boolean"
 *      createdAt:
 *        type: "string"
 *        format: "date-time"
 *      updatedAt:
 *        type: "string"
 *        format: "date-time"
 *      __v:
 *        type: "integer"
 *        format: "int32"
 */
router.get("/", getDrones);

/**
 * @openapi
 * /drone/{id}:
 *     get:
 *       summary: Get specific drone
 *       description: Retrieve a list of drone
 *       tags: [Dron]
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *           description: The ID of the dron to get dispatches for.
 *       responses:
 *         200:
 *            content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                   data:
 *                     type: array
 *                     items:
 *                       $ref: '#/definitions/dron'
 *
 *         500:
 *           description: Internal server error.
 * 
 * definitions:
 *  dron:
 *    type: "object"
 *    properties:
 *      _id:
 *        type: "string"
 *      serial:
 *        type: "string"
 *      loadStatus:
 *        type: "boolean"
 *      capacity:
 *        type: "integer"
 *        format: "int32"
 *      battery:
 *        type: "integer"
 *        format: "int32"
 *      batteryStatus:
 *        type: "boolean"
 *      deleted:
 *        type: "boolean"
 *      createdAt:
 *        type: "string"
 *        format: "date-time"
 *      updatedAt:
 *        type: "string"
 *        format: "date-time"
 *      __v:
 *        type: "integer"
 *        format: "int32"
 */
router.get("/:id", getDron);

/**
 * @openapi
 * /drone:
 *     post:
 *       summary: Create drone
 *       description: Create a new dron.
 *       tags: [Dron]
 *       parameters:
 *         - in: body
 *           name: serial
 *           required: true
 *           schema:
 *             type: string
 *           description: dron's serial.
 *         - in: body
 *           name: load
 *           required: true
 *           schema: 
 *             type: integer
 *           description: dron's serial.
 *         - in: body
 *           name: capacity
 *           required: true
 *           schema: 
 *             type: integer
 *           description: dron's serial.
 *         - in: body
 *           name: battery
 *           required: true
 *           schema: 
 *             type: integer
 *           description: dron's serial.
 *       responses:
 *         201:
 *           description: Success creation confirmation.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *         500:
 *           description: Internal server error.
 */
router.post("/", createDrone);
router.put("/:id", updateDrone);
router.delete("/:id", deleteDrone);

module.exports = router;
