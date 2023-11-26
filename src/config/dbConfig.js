module.exports = {
    url: `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@mongodb:${process.env.MONGODB_LOCAL_PORT}/${process.env.MONGODB_DATABASE}`,  
};
//url: `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@mongodb:${process.env.MONGODB_LOCAL_PORT}/${process.env.MONGODB_DATABASE}`,
//url: `mongodb://127.0.0.1:${process.env.MONGODB_LOCAL_PORT}/${process.env.MONGODB_DATABASE}`, 