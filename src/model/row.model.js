module.exports = mongoose => {
    const Row = mongoose.model(
        "rows",
        mongoose.Schema({
            coachId: { 
             type: mongoose.Schema.Types.ObjectId,
             ref: 'coaches',
             required: true,
             index: true,
            },
            rowNo: { 
             type: Number,
             required: true,           
            },
            maxSeats: { 
                type: Number,
                required: true,
                default: 7           
            },
            bookedSeats: { 
                type: Number,
                required: true, 
                default: 0          
            },
            availableSeats: { 
                type: Number,
                required: true, 
                default: 7          
            },
            
        },
        { timestamps: true }
    ));

   return Row;     
};
