const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database')


mongoose.connect(config.database);

mongoose.connection.on('connected', () =>{
    console.log('Conectado a la base de datos ',config.database)
})

//Errores
mongoose.connection.on('error', (err) =>{
    console.log('ERROR ', err)
})

const app = express();

const users = require('./routes/users');

//Número de puerto
const port = 3666;

// CORS
app.use(cors());

//Carpeta estática

app.use(express.static(path.join(__dirname, 'public')));

// Body Parser
app.use(bodyParser.json());

// Midleware del pasaporte
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users); //Todo lo que en a pag vaya a users accederá a esta carpeta

//Mensaje en el index Route
app.get('/', (req, res) =>{
    res.send('Final de camino inválido');
});

//Iniciar el servidor
app.listen(port, () => {
    console.log('Servidor iniciado en', port);
});

