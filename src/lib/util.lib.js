/**
 * Funtion prepares response object
 * @param {Number} statusCode 
 * @param {String} successMsg 
 * @param {[String] || String} errMsg 
 * @param {Object} data 
 * @returns 
 */
module.exports.getResponseObject = (statusCode, successMsg, errMsg, data) => {
    const resData = { statusCode };

    if (successMsg) {
        resData.message = successMsg;
    }

    if (errMsg) {
        resData.errorMessage = Array.isArray(errMsg) ? errMsg : [errMsg];
    }

    if (data) {
        resData.data = data;
    }

    return resData;
};


/**
 * 
 * @param {[object]} allSeatsData 
 * @param {[object]} bookedSeats 
 */
module.exports.mergeAndPreaperChart = (rows, bookedSeats) => {
    const seatsData = [];
    if (rows && rows.length) {
        for (const r of rows) {
            for (let i = 0; i < r.seatDetails.length; i++) {
                
                const d = { ...r.seatDetails[i] };
                for (const b of bookedSeats) {
                   
                    if (d._id.toString() === b.seatId.toString()) {                                           
                        d.passengerName = b.passengerName;
                        d.isBooked = b.isBooked;
                    }
                }
                delete d.rowId;
                delete d._id;
                delete d.updatedAt;
                seatsData.push(d);
            }
        }
    }
    return seatsData;
}
