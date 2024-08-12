const express = require ('express')
const session = require('express-session')
const path  = require('path')

const port = process.env.PORT || 3000

const app = express()

app.use(express.urlencoded({ extended: true })); // Para dados de formulário
app.use(express.json()); // Para dados JSON

//Configurando a sessão
app.use(session({
    secret:'kamak',
    resave:false,
    saveUninitialized: true
}))

app.use(express.static(path.join(__dirname, './public')))

// Rota para servir o index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})



//rota de login
app.post('/login', (req, res)=>{
    //Verifica as credenciais do usuário
   const {username , password} = req.body 
   if(username === 'kaio' && password === '123456'){
    //criar sessão do usuário
    req.session.user = {username}
    res.sendFile(path.join(__dirname,'sucesso.html'))
   }else{
    res.status(401).send("Credencias invalidas")
   }

})
//rota protedida
app.get('/protected', (req,res)=>{
    //Verifica seo o usuario está conectado
    if(req.session.user){
        res.send(`Bem vindo, ${req.session.user.username}`)
    }else{
        res.status(401).send("Acesso Negado")
    }
})









app.listen(port, ()=>{
    console.log(`Servidor rodando em http://localhost:${port}`)
})