// const { mongoose } = require('mongoose'); // can not import this kind

import mongoose from 'mongoose';

// export const connectDB = async () => {
//     if(mongoose.connection.readyState >= 1){
//         return;
//     }
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log('Conncted To MongoDB !!!')
// }
// above I could not connect to mongo on vercel 

// now ChatGPT get a way :

let cached = global.mongoose;

if(!cached){
    cached = global.mongoose = { conn: null, promise : null };
}

export const connectDB = async () => {
    if(cached.conn) return cached.conn;

    if(!cached.promise){
        cached.promise = mongoose.connect(process.env.MONGO_URI).then(mongoose => {
            return mongoose;
        });
    }
    cached.conn = await cached.promise;
    return cached.conn;
}
