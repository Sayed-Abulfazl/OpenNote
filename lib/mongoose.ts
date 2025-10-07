const { mongoose } = require('mongoose');

export const connectDB = async () => {
    if(mongoose.connection.readyState >= 1){
        return;
    }
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Conncted To MongoDB !!!')
}