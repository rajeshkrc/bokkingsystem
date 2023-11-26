module.exports = mongoose => {
    const BookedSeats = mongoose.model(
        "bookedseats",
        mongoose.Schema({
            seatId: { 
             type: mongoose.Schema.Types.ObjectId,
             ref: 'seats',
             required: true,
             index: true,
            },
            passengerName: {
                type: String,
                required: true
            },
            seatNo: { 
             type: Number,
             required: true,           
            },
            isBooked: { 
                type: Boolean,
                required: true,
                default: true         
            },
            
        },
        { timestamps: true }
    ));

   return BookedSeats;     
};
