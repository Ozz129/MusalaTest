const express = require("express");
const router = express.Router();

const {
  createDispatch,
  getDronDispatches
} = require("../controllers/dispatch.controller");

/**
 * @openapi
 * /dron/{idDron}:
 *     get:
 *       summary: Get dron dispatches
 *       description: Retrieve a list of dispatches for a specific dron.
 *       tags: [DronDispatches]
 *       parameters:
 *         - in: path
 *           name: idDron
 *           required: true
 *           schema:
 *             type: string
 *           description: The ID of the dron to get dispatches for.
 *       responses:
 *         200:
 *           description: A list of dron dispatches.
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
 *                       $ref: '#/definitions/dispatch'
 *         500:
 *           description: Internal server error.
 * 
 * definitions:
 *  dispatch:
 *    type: "object"
 *    properties:
 *      _id:
 *        type: "string"
 *      drone:
 *        type: "string"
 *      destination:
 *        type: "string"
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
 *      meds:
 *        type: "array"
 *        items:
 *          $ref: "#/definitions/medication"
 *  medication:
 *    type: "object"
 *    properties:
 *      med:
 *        type: "string"
 *      quantity:
 *        type: "integer"
 *        format: "int32"
 *      _id:
 *        type: "string"
 */
router.get("/dron/:idDron", getDronDispatches);

/**
 * @openapi
 * /dispatch:
 *     post:
 *       summary: Create dispatch
 *       description: Create a new dispacth.
 *       tags: [DronDispatches]
 *       parameters:
 *         - in: body
 *           name: drone
 *           required: true
 *           schema:
 *             type: string
 *           description: The ID of the dron.
 *         - in: body
 *           name: meds
 *           required: true
 *           schema:
 *             type: object
 *             $ref: '#/definitions/medicationForDispatch'
 *           description: The medication list for load, the field med references the med's id.
 *         - in: body
 *           name: destination
 *           required: true
 *           schema: 
 *             type: string
 *       responses:
 *         201:
 *           description: Success creation confirmation.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *         500:
 *           description: Internal server error.
 * 
 * definitions:
 *  dispatch:
 *    type: "object"
 *    properties:
 *      _id:
 *        type: "string"
 *      drone:
 *        type: "string"
 *      destination:
 *        type: "string"
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
 *      meds:
 *        type: "array"
 *        items:
 *          $ref: "#/definitions/medication"
 *  medicationForDispatch:
 *    type: "object"
 *    properties:
 *      med:
 *        type: "string"
 *      quantity:
 *        type: "integer"
 *        format: "int32"
 */
router.post("/", createDispatch);

module.exports = router;
