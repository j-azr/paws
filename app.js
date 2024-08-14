const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
const port = process.env ||5391;

// Set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));

// Ensure the users.txt and pets.txt files exist
const usersFilePath = path.join(__dirname, 'users.txt');
const petsFilePath = path.join(__dirname, 'pets.txt');

if (!fs.existsSync(usersFilePath)) {
    fs.writeFileSync(usersFilePath, '');
}

if (!fs.existsSync(petsFilePath)) {
    fs.writeFileSync(petsFilePath, '');
}

// Routes
app.get('/home', (req, res) => {
    res.render('home');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/catcare', (req, res) => {
    res.render('catcare');
});

app.get('/dogcare', (req, res) => {
    res.render('dogcare');
});

app.get('/find', (req, res) => {
    res.render('find');
});

app.get('/donate', (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/login?redirect=/donate');
    } else {
        res.render('donate');
    }
});

app.get('/privacy', (req, res) => {
    res.render('privacy');
});

// Redirect root to home
app.get('/', (req, res) => {
    res.redirect('/home');
});

// User registration route
app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', (req, res) => {
    const { username, password } = req.body;

    // Validate username and password
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{4,}$/;
    if (!usernameRegex.test(username) || !passwordRegex.test(password)) {
        return res.send('Invalid username or password format.');
    }

    fs.readFile(usersFilePath, 'utf8', (err, data) => {
        if (err) throw err;
        const users = data.split('\n').filter(line => line.trim() !== '');
        const userExists = users.some(user => user.split(':')[0] === username);

        if (userExists) {
            return res.send('Username already exists. Please choose another one.');
        }

        const userData = `${username}:${password}\n`;
        fs.appendFile(usersFilePath, userData, (err) => {
            if (err) throw err;
            res.send('User registered successfully!');
        });
    });
});

// User login route
app.get('/login', (req, res) => {
    res.render('login', { redirect: req.query.redirect || '/home' });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    fs.readFile(usersFilePath, 'utf8', (err, data) => {
        if (err) throw err;
        const users = data.split('\n');
        const user = users.find((user) => user === `${username}:${password}`);

        if (user) {
            req.session.loggedIn = true;
            req.session.username = username;
            res.redirect(req.body.redirect || '/home');
        } else {
            res.send('Invalid username or password');
        }
    });
});

// Pet registration route
app.post('/register-pet', (req, res) => {
    const { petType, breed, age, gender, comp, comments, ownerName, ownerEmail } = req.body;
    const compatibility = Array.isArray(comp) ? comp.join(', ') : comp;

    fs.readFile(petsFilePath, 'utf8', (err, data) => {
        if (err) throw err;
    
        const pets = data.split('\n').filter(line => line.trim()).map(line => {
            const fields = line.split(':');
            
            const id = fields[0];
            const owner = fields[1];
            const type = fields[2];
            const breed = fields[3];
            const age = fields[4];
            const gender = fields[5];
            const compatibility = fields[6];
            const comments = fields[7];
            const email = fields.slice(8).join(':'); // Capturing the email by ignoring the owner's name
    
            return { id, owner, type, breed, age, gender, compatibility: compatibility.split(','), comments, email };
        });
    
        console.log('Parsed Pets:', pets);
    
        const filteredPets = pets.filter(pet => {
            const matchesType = petType ? pet.type === petType : true;
            const matchesBreed = breed ? pet.breed === breed : true;
            const matchesAge = age ? pet.age === age : true;
            const matchesGender = gender ? pet.gender === gender : true;
            const matchesCompatibility = compatibilityArray.every(comp => pet.compatibility.includes(comp));
            
            console.log('Matching Status:', { matchesType, matchesBreed, matchesAge, matchesGender, matchesCompatibility });
    
            return matchesType && matchesBreed && matchesAge && matchesGender && matchesCompatibility;
        });
    
        console.log('Filtered Pets:', filteredPets);
    
        if (filteredPets.length === 0) {
            res.render('browse', { pets: [], message: 'No pets available matching your criteria.' });
        } else {
            res.render('browse', { pets: filteredPets });
        }
    });
    
    
    
});


// Pet search route
app.post('/find-pet', (req, res) => {
    const { petType, breed, age, gender, compatibility } = req.body;

    const compatibilityArray = Array.isArray(compatibility) ? compatibility : [compatibility];

    fs.readFile(petsFilePath, 'utf8', (err, data) => {
        if (err) throw err;

        const pets = data.split('\n').filter(line => line.trim() !== '').map(line => {
            const [id, owner, type, breed, age, gender, compatibility, comments, email] = line.split(':');
            return { id, owner, type, breed, age, gender, compatibility: compatibility.split(','), comments, email };
        });
        console.log('Parsed Pets:', pets);

        console.log('Pet Compatibility Array:', pets.map(pet => pet.compatibility));
        
        const filteredPets = pets.filter(pet => {
            const matchesType = petType ? pet.type === petType : true;
            const matchesBreed = breed ? pet.breed === breed : true;
            const matchesAge = age ? pet.age === age : true;
            const matchesGender = gender ? pet.gender === gender : true;
            const matchesCompatibility = compatibilityArray.every(comp => pet.compatibility.includes(comp));
            
            console.log({
                matchesType,
                matchesBreed,
                matchesAge,
                matchesGender,
                matchesCompatibility,
            });

            return matchesType && matchesBreed && matchesAge && matchesGender && matchesCompatibility;
        });

        if (filteredPets.length === 0) {
            res.render('browse', { pets: [], message: 'No pets available matching your criteria.' });
        } else {
            res.render('browse', { pets: filteredPets });
        }
    });
});


// User logout route
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.send('Error logging out');
        }
        res.send('You have been logged out successfully');
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
