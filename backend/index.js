const express = require('express');
const app = express();
const bcrypt = require('bcrypt');

app.use(express.json())

const users = [];
const polls = [];

app.get('/users', (req, res) => {
    res.json(users);
})

app.post('/users', async (req, res) => {
    try{
        const hashedPassword= await bcrypt.hash(req.body.password, 10)
        const user = { email: req.body.email, password: hashedPassword }
        users.push(user)
        res.status(201).send()
    }catch{
        res.status(500).send();
    }

})

app.post('/users/login', async (req,res) =>{
    const user = users.find(user => user.email = req.body.email)
    if(user == null){
        return res.status(400).send("Cannot find user")
    }
    try{
        if(await bcrypt.compare(req.body.password, user.password)){
            res.send('Success')
        }else{
            res.send('Not Allowed')
        }
    }catch{
        res.status(500).send();
    }
})

app.get('/polls', (req, res) => {
    res.json(polls);
})


app.post('/polls', async (req, res) =>{
    try{
        const poll = {
            title: req.body.title, 
            type: req.body.poll, 
            option1: req.body.option1,
            option2: req.body.option2,
            option3: req.body.option3 
        };

        polls.push(poll);
        res.status(201).send();
    }catch{
        res.status(501).send();
    }
})

app.listen(3000)