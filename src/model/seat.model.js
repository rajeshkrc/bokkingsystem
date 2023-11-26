module.exports = mongoose => {
    const Seat = mongoose.model(
        "seats",
        mongoose.Schema({
            rowId: { 
             type: mongoose.Schema.Types.ObjectId,
             ref: 'rows',
             required: true,
             index: true,
            },
            seatNo: { 
             type: Number,
             required: true,           
            },
            isBooked: { 
                type: Boolean,
                required: true,
                default: false         
            },
            
        },
        { timestamps: true }
    ));

   return Seat;     
};
