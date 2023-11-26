module.exports = mongoose => {
    const Train = mongoose.model(
        "trains",
        mongoose.Schema({
            trainno: { 
             type: String,
             unique: true,
             required: true,             
            },            
        },
        { timestamps: true }
    ));

   return Train;     
};
