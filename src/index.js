const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();

const customers = [];

app.use(express.json());

app.post('/account', (req, res) => {
    const { name, cpf } = req.body;

    const customerAlreadyExists = customers.some(
        (customer) => customer.cpf === cpf
    );
    if(customerAlreadyExists) {
        return res.status(400).json({ error: "Customer already exists!" });
    }

    customers.push({ 
        id: uuidv4(), 
        name, 
        cpf, 
        statement: [] 
    });

    return res.status(201).send();
});

app.get('/courses', (req, res) => {
    const query = req.query;
    console.log(query);
    return res.json([
        'Curso 1',
        'Curso 2',
        'Curso 3', 
    ]);
});

app.put('/courses/:id', (req, res) => {
    const { id } = req.params;
    console.log(id);
    return res.json([
        'Curso 1',
        'Curso 4',
        'Curso 3',
        'Curso 2',
    ]);
});

app.patch('/courses/:id', (req, res) => {
    return res.json([
        'Curso 1',
        'Curso 4',
        'Curso 3',
        'Curso 6',
    ]);
});

app.delete('/courses/:id', (req, res) => {
    return res.json([
        'Curso 1',
        'Curso 4',
        'Curso 6',
    ]);
});

app.listen(3333);