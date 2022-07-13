require('dotenv').config();
//const mongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');



const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)
const url = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@bancosca.c1bol8w.mongodb.net/SCA?retryWrites=true&w=majority`


//conexao com o mongoose
mongoose.connect(
        url
    )
    .then(() => {
        console.log('conectamos ao mongoDB')
            //app.listen(27017)
    })
    .catch((err) => console.log(err))

console.log('MongoDB conected');

module.exports = {};



// mongoClient.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@bancosca.c1bol8w.mongodb.net/?retryWrites=true&w=majority`, { useUnifiedTopology: true },
//     (erro, connection) => {
//         if (erro) return console.log(erro);
//         global.connection = connection.db('bancosca');
//         console.log('connected!');
//     });
//mongodb+srv:@bancosca.c1bol8w.mongodb.net/?retryWrites=true&w=majority