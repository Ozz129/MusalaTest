const express = require("express");
const router = express.Router();

/*const {
  validatorCreateItem,
  validatorGetItem,
} = require("../validators/bookings");*/
const {
  getDrones,
  getDron,
  createDrone,
  updateDrone,
  deleteDrone,
} = require("../controllers/dron.controller");

/**
 * Get all bookings
 * @openapi
 * /bookings:
 *    get:
 *      tags:
 *        - bookings
 *      summary: "Bookings list"
 *      description: Get the entire list of bookings
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          description: Get the entire list of bookings.
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/booking'
 *        '422':
 *          description: validation error.
 */
router.get("/", getDrones);
/**
 * Get booking
 * @openapi
 * /bookings/{id}:
 *    get:
 *      tags:
 *        - bookings
 *      summary: "Booking detail"
 *      description: Booking detail
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: booking id
 *        required: true
 *        schema:
 *          type: string
 *      responses:
 *        '200':
 *          description: Get booking details.
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/booking'
 *        '422':
 *          description: validation error.
 */
router.get("/:id", getDron);
/**
 * Register new booking
 * @openapi
 * /bookings:
 *    post:
 *      tags:
 *        - bookings
 *      summary: "Register booking"
 *      description: Regist a new booking
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          description: Get the new booking registered.
 *        '422':
 *          description: Validation error.
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: "#/components/schemas/booking"
 *    responses:
 *      '201':
 *        description: Get the object registered '201'
 */
router.post("/", createDrone);
/**
 * Update booking
 * @openapi
 * /bookings/{id}:
 *    put:
 *      tags:
 *        - bookings
 *      summary: "Update booking"
 *      description: Update a booking
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: booking id
 *        required: true
 *        schema:
 *          type: string
 *      responses:
 *        '200':
 *          description: Get the booking detail updated.
 *        '422':
 *          description: Validation error.
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: "#/components/schemas/booking"
 *    responses:
 *      '201':
 *        description: Get the object
 *        content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/booking'
 */
router.put("/:id", updateDrone);
/**
 * Delete booking
 * @openapi
 * /bookings/{id}:
 *    delete:
 *      tags:
 *        - bookings
 *      summary: "Delete booking"
 *      description: Delete booking
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: Booking id
 *        required: true
 *        schema:
 *          type: string
 *      responses:
 *        '200':
 *          description: Get the booking object.
 *        '422':
 *          description: Validation error.
 */
router.delete("/:id", deleteDrone);

module.exports = router;
