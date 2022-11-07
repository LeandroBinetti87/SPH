const apiRoutes = require('./routes/api.js');
const authRoutes = require('./routes/auth.js');
const tokenAuth = require('./middlewares/tokenAuth.js');
const express = require('express');
const { SERVER_PORT, SERVER_IP } = require('./config/server.js');
const app = express();

var cors = require('cors');
//app.use(cors({
//    origin: 'http://localhost:3000',
//}));

app.use(cors()); //Abro cors para todo WARNING

app.use(express.static('public'));
app.use('/api', tokenAuth, apiRoutes);
app.use('/', authRoutes);

app.listen(SERVER_PORT, () => {
    console.log(`Server is running in PORT ${SERVER_PORT} and IP ${SERVER_IP}`);
});