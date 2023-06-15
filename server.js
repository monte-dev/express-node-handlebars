const express = require('express');
const path = require('path');
const app = express();
const hbs = require('express-handlebars');

app.engine(
	'hbs',
	hbs({
		extname: 'handlebars',
		layoutsDir: './views/layouts',
		defaultLayout: 'mainLayout',
	})
);

app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, '/public')));

app.get(['/', '/home'], (req, res) => {
	res.render('index');
});

app.get('/about', (req, res) => {
	res.render('about.hbs', { layout: 'dark' });
});

app.get('/hello/:name', (req, res) => {
	res.render('hello', { name: req.params.name });
});

app.get('/info', (req, res) => {
	res.render('info');
});

app.get('/history', (req, res) => {
	res.render('history');
});

app.get('/contact', (req, res) => {
	res.render('contact');
});

app.get('/user/', (req, res) => {
	res.render('403');
});

app.use((req, res) => {
	res.status(404).render('404');
});

app.listen('8000', () => {
	console.log('app is running');
});
