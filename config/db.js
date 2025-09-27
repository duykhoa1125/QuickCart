import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
    //check if global.mongoose is undefined, if so, initialize it
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
    if(cached.conn) {
        return cached.conn;
    }

    if(!cached.promise) {
        const opts = {
          // (tắt tính năng mongoose giữ lệnh khi chưa có kết nối).
          bufferCommands: false,
        };

        cached.promise = mongoose.connect(`${process.env.MONGODB_URI}/quickcart`,opts).then((mongoose)=> {
            return mongoose;
        })
    }
    cached.conn = await cached.promise;
    return cached.conn;
}

export default connectDB;