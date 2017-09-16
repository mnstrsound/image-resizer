import mongoose from 'mongoose';

const mongoUrl = 'mongodb://dwmreminder:dwmreminder666@ds145223.mlab.com:45223/dwm_reminder';
let connection = false;

export function initConnection() {
    if (!connection) mongoose.connect(mongoUrl, { useMongoClient: true });
}

export function getConnection() {
    return mongoose;
}
