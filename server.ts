import './mongoose-connection';
import app from './src/app';

app({ logger: process.env.NODE_ENV === 'development' ? { prettyPrint: true } : false }).listen(
    process.env.PORT || 5000
);
