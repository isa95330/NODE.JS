// ------------------ IMPORTS ------------------ //


const express = require('express');


const fs = require('fs');

const bodyParser = require('body-parser');

const jsonServer = require('json-server');

// ------------------ VARIABLES ------------------ //

const jsm = jsonServer.router('db.json');

const app = express();


// ------------------ APP USE AND SET ------------------ //


app.use(bodyParser.urlencoded({ extended: false })); 


app.use(bodyParser.json()); 


app.use('/api', jsm); 


app.set('view engine', 'ejs');


// ------------------ ROUTES ------------------ //


app.get('/', (req, res) => {
    res.redirect('/articles');
});


app.get('/articles', (req, res) => {
    const articles = JSON.parse(fs.readFileSync('db.json')).articles // On récupère les tâches dans le fichier JSON.
   
    res.render('articles', { articles }) // On retourne la vue "tasks.ejs" en lui passant les tâches en paramètre.
})

/**
 * Création d'une nouvelle tâche.
 * On va créer une nouvelle tâche dans le fichier JSON.
 */
app.post('/articles/create', (req, res) => {
    const articles = JSON.parse(fs.readFileSync('db.json')).articles; // On récupère les tâches dans le fichier JSON.
    const newArticle = { // On crée une nouvelle tâche.
        id: Date.now(), // On génère un id unique pour la nouvelle tâche.
        title: req.body.title, // On récupère le titre de la nouvelle tâche.
        marque: req.body.marque, // On récupère la description de la nouvelle tâche.
        status: req.body.status, // On récupère le statut de la nouvelle tâche.
    };
    articles.push(newArticle); // On ajoute la nouvelle tâche dans le tableau des tâches.
    fs.writeFileSync('db.json', JSON.stringify({ articles })); // On earticlesstre les tâches dans le fichier JSON.
    res.redirect('/articles'); // On redirige l'internaute vers la page des tâches.
});


app.get('/articles/delete/:id', (req, res) => { // On définit la route "/tasks/delete/:id".
    const articles  = JSON.parse(fs.readFileSync('db.json')).articles; // On récupère les tâches dans le fichier JSON.
    const newArticles = articles.filter(article => article.id !== parseInt(req.params.id)); // On filtre les tâches pour ne garder que les tâches dont l'id est différent de l'id de la tâche à supprimer.
    fs.writeFileSync('db.json', JSON.stringify({ articles: newArticles })); // On enregistre les tâches dans le fichier JSON.
    res.redirect('/articles'); // On redirige l'internaute vers la page des tâches.
});

app.get('/articles/descriptions/:id', (req, res) => { // On définit la route "/tasks/delete/:id".
    const descriptions  = JSON.parse(fs.readFileSync('db.json')).articles; // On récupère les tâches dans le fichier JSON.
    const description = descriptions.find(article => parseInt(article.id) === parseInt(req.params.id)); // On filtre les tâches pour ne garder que les tâches dont l'id est différent de l'id de la tâche à supprimer.
    
  
    res.render('descriptions', { description });
  
    
    console.log (test);
    
});


// ------------------ SERVER ------------------articles
app.listen(3000, () => console.log('Le serveur est lancé sur le port 3000'));