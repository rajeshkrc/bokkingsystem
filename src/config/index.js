const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT || 3000;
const resStatusCode = {
    ok: 200,
    success: 201,
    unautherization: 401,
    error: 500,
};

const validationConfig = { 
    username: { min: 4, max: 12, msg: 'Username length must be 4 to 12 characters' },
    seats: { min: 1, max: 7, msg: 'Minimum 1 and Maximum 7 seats can be booked at a time' },
};

module.exports = {
    port,
    resStatusCode,
    validationConfig,   
};
