module.exports = mongoose => {
    const Coach = mongoose.model(
        "coaches",
        mongoose.Schema({
            trainId: { 
             type: mongoose.Schema.Types.ObjectId,
             ref: 'trains',
             required: true,
             index: true,
            },
            coachNo: { 
             type: String,
             required: true,           
            },
            coachType: { 
                type: String,
                required: true,           
            },
            totalSeats: { 
                type: Number,
                required: true,           
            },
            bookedSeats: { 
                type: Number,
                required: true, 
                default: 0          
            },
            
        },
        { timestamps: true }
    ));

   return Coach;     
};
