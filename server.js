const express = require('express');
const path = require('path');
const app = express();
const hbs = require('express-handlebars');
const multer = require('multer');
const upload = multer({ dest: './public/data/uploads/' });
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
app.use(express.urlencoded({ extended: false }));

app.get(['/', '/home'], (req, res) => {
	res.render('index');
});

app.get('/about', (req, res) => {
	res.render('about.hbs', { layout: 'dark' });
});
app.post('/contact/send-message', upload.single('file'), (req, res) => {
	const { author, sender, title, message } = req.body;

	if (author && sender && title && message && req.file) {
		const fileName = req.file.originalname;
		res.render('contact', {
			isSent: true,
			fileName: fileName,
		});
	} else {
		res.render('contact', { isError: true });
	}
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

app.get('/contact', (req, res) => {
	res.render('contact');
});
app.use((req, res) => {
	res.status(404).render('404');
});

app.use(express.json());
app.listen('8000', () => {
	console.log('app is running');
});
