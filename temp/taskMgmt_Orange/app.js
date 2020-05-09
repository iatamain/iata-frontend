const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const app = express();

app.use(express.json({ extended: true }))

app.use('/api/auth', require('./routes/auth.routes'))

app.use('/api/list', require('./routes/list.routes'))


const PORT = config.get('port') || 5000;

async function start() {
    try{
        await mongoose.connect(config.get('mongoUrl'), {
            useNewUrlParser : true,
            useUnifiedTopology : true,
            useCreateIndex : true
        });
    } catch (e) {
        console.log('Server Error', e.message);
        process.exit(1);
    }
}
start();

app.listen(PORT, ()=> { console.log('App has been started on port ' + PORT) } );