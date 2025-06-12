const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bcrypt = require('bcrypt');
const path = require('path');
const User = require('./models/User');

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Session
app.use(session({
    secret: 'grumble-secret-key',
    resave: false,
    saveUninitialized: true
}));

// MongoDB bağlantısı
mongoose.connect('mongodb://127.0.0.1:27017/grumbleDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB bağlıdır ✅'))
.catch(err => console.log('Bağlantı xətası ❌', err));

// GET: Signup
app.get('/signup', (req, res) => {
    res.render('signup');
});

// POST: Signup
app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        res.redirect('/login');
    } catch (error) {
        res.send('Xəta baş verdi: ' + error.message);
    }
});

// GET: Login
app.get('/login', (req, res) => {
    res.render('login');
});

// POST: Login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && await bcrypt.compare(password, user.password)) {
        req.session.userId = user._id;
        res.send('Giriş uğurludur 🎉');
    } else {
        res.send('Email və ya şifrə yanlışdır ❌');
    }
});

app.get('/forgot-password', (req, res) => {
  res.render('forgot-password'); // forgot-password.ejs olmalıdır
});

// Start
app.listen(3000, () => {
    console.log('🌐 Server is running at http://localhost:3000');
});
