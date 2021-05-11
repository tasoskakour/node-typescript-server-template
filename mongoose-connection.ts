/* eslint-disable import/prefer-default-export, no-console */
import mongoose from 'mongoose';

const { MONGODB_URI } = process.env;

if (!MONGODB_URI) {
    throw new Error('MONGODB_URI process env variable is not defined!');
}

mongoose.Promise = Promise;

const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
};

mongoose.connect(MONGODB_URI, options);

export const { connection } = mongoose;
connection.on('error', (error) => {
    if (error.message.code === 'ETIMEDOUT') {
        console.log(error);
        mongoose.connect(MONGODB_URI, options);
    }
    console.log(error);
});
connection.on('connected', () => {
    console.log(`MongoDB successfully connected to ${MONGODB_URI}`);
});
connection.on('reconnected', () => {
    console.log('MongoDB reconnected!');
});

process.on('SIGINT', async () => {
    await connection.close();
    console.log('Force to close the MongoDB conection');
    process.exit(0);
});
