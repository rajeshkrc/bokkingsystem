const express = require("express");
const { check, validationResult } = require('express-validator');
const { resStatusCode, validationConfig } = require("../config");
const { getResponseObject, mergeAndPreaperChart } = require("../lib/util.lib");
const { 
    getSeats,
    searchSeatsInRow,
    searchSeatsNearBy,
    updateSeatStatus ,
    getBookingData,
} = require('../lib/checkSeatAvailibility.lib')
const bookTicketRouter = express.Router();

const validations = [
    check('username', validationConfig.username.msg)
    .isLength({ min: validationConfig.username.min, max: validationConfig.username.max }),
    check('seats', validationConfig.seats.msg)
    .isInt({ min: validationConfig.seats.min, max: validationConfig.seats.max }),
];

/**
 * url: /api/bookticket
 * method: POST
 * payload: { username: "test", seats: 4, trainno: '1111' }
 * response: On success { statusCode: 200, message: "success", data: {object} }
 * On fail { statusCode: 500, errMessage: ["error message"] }
 */
bookTicketRouter.post("/bookticket", validations, async (req, res, next) => {
    let { username, seats, trainno } = req.body;
    let resData = {};

    try {
        const validateResult = validationResult(req);
        if (!validateResult.isEmpty()) {
            resData = getResponseObject(resStatusCode.error, "", validateResult.errors.map(err => err.msg));
            res.status(resStatusCode.error).json(resData);

            return;
        }
     
        const trainData = await getSeats(trainno) 

        if (!trainData) {
            resData.errorMessage = "Invalid train";        
        } else {              
                
            let availableSeats = null;
                if (trainData.length) {
                    /**
                     * Checking availibilty of seats in one row
                     */
                    availableSeats = searchSeatsInRow(trainData[0].coachDetails[0].rowDetails, seats) 
                    
                    /**
                     * If seats are not available in one row then search near by
                     */
                    if (!availableSeats) {                        
                        availableSeats = searchSeatsNearBy(trainData[0].coachDetails[0].rowDetails, seats);  
                                        
                    } 
                }

                /**
                 * make reservation on available seats
                 */
                if (availableSeats && availableSeats.length) {
                   await updateSeatStatus(availableSeats, username);
                }
            
                const bookedData = await getBookingData();
                availableSeats = mergeAndPreaperChart(trainData[0].coachDetails[0].rowDetails, bookedData);
              
                resData.data = availableSeats;    
        
        }
        resData.statusCode =  resStatusCode.ok;
    
        resData = getResponseObject(resData.statusCode, "", resData.errorMessage, resData.data);        

    } catch (err) {
        
        resData = getResponseObject(resStatusCode.error, "", "Unable to validate user!");        
    }   
    
    res.status(resData.statusCode).json(resData); 
});

module.exports = bookTicketRouter;
