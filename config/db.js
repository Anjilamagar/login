import mongoose from 'mongoose';

const connectdb = async () => {
    try {
        await mongoose.connect('mongodb+srv://anjilamagar506_db_user:Anjila.@cluster0.j56riod.mongodb.net/?appName=Cluster0');
        console.log("MongoDB Connected");
    } catch (error) {
        console.error("Connection error", error);
    }
};

export default connectdb
