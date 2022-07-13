var createError = require('http-errors');
const express = require('express')
const app = express()
const Usuario = require('./banco/Usuario');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


//ler json 
app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(cookieParser());
app.use(bodyParser.json());

function mylooger(req, res, next) {
    console.log('logged');
    next();
}

// var requestTime = function(req, res, next) {
//     req.requestTime = { time: date.now() }
//     next()
// }

app.use(mylooger)
    //app.use(requestTime)


// rotas
// ROTA POST INSERINDO NO BANCO
app.post('/cadastro', async(req, res, next) => {
    res.sendFile(__dirname + "/paginas/cadastro.html");
    const {
        nome,
        responsavel,
        habilitado,
        mestre,
        tags,
        locais,
        horarios

    } = req.body;
    const usuario = {
        nome,
        responsavel,
        habilitado,
        mestre,
        tags,
        locais,
        horarios,

    }


    try {
        await Usuario.create(usuario)
        res.status(201).json({ message: 'Pessoa inserida no sistema com sucesso!' })
    } catch (error) {
        res.status(500).json({ error: error })
    }

});
// ROTA GET PEGANDO TODOS OS USUARIOS DO BANCO
app.get('/', async(req, res) => {
    try {
        const people = await Usuario.find()

        res.status(200).json(people)
    } catch (error) {
        res.status(500).json({ erro: error })
    }
});


app.get('/buscar/:id', async(req, res) => {
    const id = req.params.id

    try {
        const usuario = await Usuario.findOne({ _id: id })

        if (!usuario) {
            res.status(422).json({ message: 'Usuário não encontrado!' })
            return
        }

        res.status(200).json(usuario)
    } catch (error) {
        res.status(500).json({ erro: error })
    }
})

app.patch('/alterar/:id', async(req, res) => {
    const id = req.params.id

    const { nome, responsavel } = req.body

    const usuario = {
        nome,
        responsavel

    }

    try {
        const updatedUsuario = await Usuario.updateOne({ _id: id }, usuario)

        if (updatedUsuario.matchedCount === 0) {
            res.status(422).json({ message: 'Usuário não encontrado!' })
            return
        }

        res.status(200).json(usuario)
    } catch (error) {
        res.status(500).json({ erro: error })
    }
})

app.delete('/deletar/:id', async(req, res) => {
    const id = req.params.id

    const usuario = await Person.findOne({ _id: id })

    if (!usuario) {
        res.status(422).json({ message: 'Usuário não encontrado!' })
        return
    }

    try {
        await Usuario.deleteOne({ _id: id })

        res.status(200).json({ message: 'Usuário removido com sucesso!' })
    } catch (error) {
        res.status(500).json({ erro: error })
    }
})

app.get('/mensagen', (req, res, next) => res.send('chamou pelo delete ok'));

app.post('/', (req, res, next) => res.sendFile(__dirname + '/paginas/cadastro.html'));

app.delete('/', (req, res, next) => res.send('chamou pelo delete ok'));


app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({ error: err });
});


module.exports = app