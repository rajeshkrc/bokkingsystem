const { train: Train, seat: Seat, bookedseats: BookedSeats } = require("../model");

/**
 * Checking availibilty of seats in one row
 * @param {object} rowDetails 
 * @param {Number} seats 
 * @returns null || {object}
 */
module.exports.searchSeatsInRow = (rowDetails, seats) => {    
    if (rowDetails && rowDetails.length) {                
        for (const r of rowDetails) {
            for (let i = 0; i <= r.seatDetails.length - seats; i++) {
                const availableSeats = r.seatDetails.slice(i, (i + seats));
                if (availableSeats.every(s => !s.isBooked)) {
                    return availableSeats;
                }
            
            }
        }      
       
    }
    return null;
};

 
/**
 * Checking availibilty of seats near by
 * @param {object} rowDetails 
 * @param {Number} seats 
 * @returns null || {object}
 */
module.exports.searchSeatsNearBy = (rowDetails, seats) => {     
    if (rowDetails && rowDetails.length) {     
        const availableSeats = [];
        for (const r of rowDetails) {
            for (let i = 0; i < r.seatDetails.length;  i++) {                
                r.seatDetails[i].isBooked ? null : availableSeats.push(r.seatDetails[i]);
                if (availableSeats.length === seats) {
                    return availableSeats;
                }                
            }
        }
    }
    return null
};

/**
 * Update seats status and marke as booked
 * @param {object} seatsData 
 * @returns null || {object}
 */
module.exports.updateSeatStatus = async (seatsData, passengerName) => {
    const session = await BookedSeats.startSession();
    try {
        if (seatsData && seatsData.length) {
            
            const rowIds = [];
            const makeBooking = [];
            for (const seat of seatsData) {
                rowIds.push(seat._id);
                makeBooking.push({
                   seatId: seat._id,
                   seatNo: seat.seatNo,
                   passengerName,
                   isBooked: true,
                })
            }

            session.startTransaction();
            await BookedSeats.insertMany(makeBooking);
                       
            const res =  await Seat.updateMany({_id : { $in: rowIds }}, { $set: { isBooked: true }});
            session.commitTransaction();
            session.endSession();
            return res;
        }
    } catch(ex) {
        console.log(ex);
    } finally {
       session.endSession();
    }

    return null;
}

/**
 * Get Train, Coaches and row wise seats data
 * @param {String} trainno 
 * @returns {object}
 */
module.exports.getSeats = async (trainno) => {
    try {
        const trainData = await Train.aggregate([{ $match: { trainno }}, {
            $lookup: { 
                        from:"coaches",
                        localField:"_id",
                        foreignField: "trainId",
                        pipeline: [{
                            $lookup: { 
                                from:"rows",
                                localField:"_id",
                                foreignField: "coachId",
                                pipeline: [{
                                    $lookup: { 
                                        from:"seats",
                                        localField:"_id",
                                        foreignField: "rowId",
                                        as: "seatDetails"
                                    }
                                }], 
                                as: "rowDetails"
                            }
                        }],
                        as: "coachDetails"
                    }}, 
            ]);
        
        return trainData;
    } catch (err) {
        return null;
    }    
}

/**
 * 
 * @returns {object}
 */
module.exports.getBookingData = async () => {
    try {
       return await BookedSeats.find({ isBooked: true });
    } catch (ex) {

    }
    return [];
}
