# Application README

Welcome to our application! This application provides a set of functionalities to manage drone and med. It features CRUD operations for both drone and med, allows creating shipments of med loaded onto drone, and provides the ability to retrieve the cargo status of a drone at any given moment. Below, you will find a brief overview of the application's key features and how to use them.

## Table of Contents

1. [Introduction](#introduction)
2. [CRUD Operations](#crud-operations)
   - [drone](#drone)
   - [med](#med)
3. [Creating Drone Shipments](#creating-drone-shipments)
4. [Battery Management](#battery-management)
   - [Discharging Battery](#discharging-battery)
   - [Updating Battery Status](#updating-battery-status)
5. [Running Unit Tests](#running-unit-tests)
6. [Getting Started](#getting-started)
7. [MongoDB Cluster](#mongodb-cluster)
8. [Swagger Documentation](#swagger-documentation)

## Introduction

Our application allows you to manage drone and med effectively. You can perform CRUD operations on both drone and med, keeping track of their details and modifications. Additionally, the application enables you to create shipments of med and assign them to drone for delivery. Battery management is also an essential feature, ensuring that drone operate efficiently.

## CRUD Operations

### drone

The drone CRUD operations consist of the following endpoints:

- `GET /drone`: Retrieve a list of all drone.
- `GET /drone/{id}`: Get details of a specific drone by its ID.
- `POST /drone`: Create a new drone.
- `PUT /drone/{id}`: Update information for a specific drone.
- `DELETE /drone/{id}`: Delete a drone from the system.

### med

The medicine CRUD operations include the following endpoints:

- `GET /med`: Fetch a list of all med.
- `GET /med/{id}`: Get details of a specific medicine by its ID.
- `POST /med`: Create a new medicine.
- `PUT /med/{id}`: Update information for a specific medicine.
- `DELETE /med/{id}`: Delete a medicine from the system.

## Creating Drone Shipments

To create a shipment of med loaded onto a drone, use the following endpoint:

- `POST /dispatch`: Create a new shipment by specifying the medicine IDs and the drone ID for delivery.

## Geetting Drone Shipments

To get a shipment of med loaded onto a drone, use the following endpoint:

- `GET /dispatch/dron/:idDron`: Create a new shipment by specifying the medicine IDs and the drone ID for delivery.

## Battery Management

### Discharging Battery

The `dischargeBattery` function is responsible for emulating the battery discharge process of a drone. It simulates the battery consumption during operation.

### Updating Battery Status

The `updateBatteryStatus` function is triggered when a drone's battery level reaches 25%. It sets the battery status to false, indicating the drone needs charging.

## Running Unit Tests

To execute unit tests, use the following command:
Remmeber to change module with the name of the desired module (dron, dispatch, med)

```bash
npm run test:file --module
```
or use

```bash
npm run test
```

In order to run all the test suits

## Getting Started

To start the application, follow these steps:

1. Clone the repository to your local machine.
2. Install the required dependencies using npm.

```bash
npm install
```

3. Run the application using the following command:

```bash
npm start
```

## MongoDB Cluster

We are using a MongoDB cluster to store all the application data securely. Ensure you have the necessary environment variables in the `.env` file to connect to the cluster.

## Swagger Documentation

You can access the Swagger documentation for the API, which provides a detailed reference for all endpoints and their usage. The Swagger documentation URL is: http://localhost:3000/api-docs/#/

## Disclaimer

For communication purposes only, we stored the database password in a .env file. Please note that this practice is generally discouraged due to security concerns.

Please note that the Swagger documentation may not include all available endpoints due to ongoing development and updates. 

## Testing Data

Available Dron: 64c5a294186e28c55e2b4bd5

Low battery Dron: 64c8dff043d3d6688922244a

Dron whitout space: 64c8e01c43d3d6688922244b

med: 64c57d15d1bb7af728599fa0
