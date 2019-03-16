const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '12345',
    database : 'facedetection'
  }
});

db.select('*').from('users').then(data => console.log(data));
const app = express();

app.use(bodyParser.json());
app.use(cors());
const database = {
	users:[

		{
			id: '123',
			name: 'John',
			email: 'john@gmail.com',
			password: 'cookies',
			entries: 0,
			joined: new Date()
		},
		{
			id: '124',
			name: 'Sally',
			email: 'sally@gmail.com',
			password: 'bananas',
			entries: 0,
			joined: new Date()
		}

	]
}

const portnumber = 3000;

app.get('/', (req, res)=>{
	res.send(database.users);
})



//for POST request for /signin page
app.post('/signin', (req, res) => signin.handleSignIn(db, bcrypt))

//for POST request for /register page
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

//for GET request for /profile/:id
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) } )

//for PUT request for /image page
app.put('/image', (req, res) => { image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})

app.listen(portnumber, ()=>{
	console.log('app is running on ' + portnumber);
})


