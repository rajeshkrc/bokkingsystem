const dotenv = require('dotenv');
dotenv.config();

const db = require("../src/model");
const { 
    train: Train,
    seat: Seat,
    coach: Coach,
    row: Row,
} = require("../src/model");


db.mongoose.connect(db.url).then(() => {
    console.log("Connected to mongodb");
}).catch(error => {
    console.log("Cannot connect to the database!", error);
    process.exit();
});

db.mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to db on port ${process.env.MONGODB_LOCAL_PORT}`);
});

db.mongoose.connection.on('error', err => {
    console.log(err.message);
  });

db.mongoose.connection.on('disconnected', () => {
    console.log('Mongoose connection is disconnected...');
  });
 
  (async function(){
    try{
        await Seat.deleteMany({});
        await Row.deleteMany({});
        await Coach.deleteMany({});
        await Train.deleteMany({});    

        const trainData = await Train.insertMany([{
            trainno: process.env.TRAIN_NO,
        }]);


    let coachData = await Coach.insertMany([{trainId: trainData[0]._id, coachNo: '22222', coachType: "AC1", totalSeats: 70, bookedSeats:0 }]);

        let rowData = [];
        for (let row = 1; row <=  process.env.TOTAL_SEATS_IN_COACH/process.env.MAX_SEATS_IN_ROW; row++) {
            rowData.push({
                coachId: coachData[0]._id,
                rowNo: row,
                maxSeats: process.env.MAX_SEATS_IN_ROW,
                bookedSeats: 0,
                availableSeats: process.env.MAX_SEATS_IN_ROW
            });
        
        }

        rowData.push({
            coachId: coachData[0]._id,
            rowNo: (rowData.length+1),
            maxSeats: process.env.MIN_SEATS_IN_ROW,
            bookedSeats: 0,
            availableSeats: process.env.MIN_SEATS_IN_ROW
        })

        await Row.insertMany(rowData);
        rowData = await Row.find().sort({rowNo: 1});

    
        const seatData = [];
        for (const r of rowData) {
            for (let i =1; i<= r.maxSeats; i++) {
                seatData.push({
                    rowId: r._id,
                    seatNo: (seatData.length + 1),
                    isBooked: false
                })            
            }
            
        }
        
        await Seat.insertMany(seatData); 
    } catch (ex) {
        console.log(ex);
    }
    
  })();
  