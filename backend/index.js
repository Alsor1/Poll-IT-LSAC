const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 3001;

app.use(cors());

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/poll-it', { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

// Define MongoDB Schema and Model for User
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

// Register user
app.post('/poll-it/users', async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(409).json({ error: 'User already exists' });
    } else {
    const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        email,
        password: hashedPassword,
      });

      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    }
  } catch (error) {
    console.error('Error registering user', error);
    res.status(500).send('Internal Server Error');
  }
});


app.post('/poll-it/login', async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await User.findOne({ email });
        
        if (!user) {
            res.status(401).json({ error: 'Invalid credentials' });
        } else {
            const passwordMatch = await bcrypt.compare(password, user.password);
            
            if (passwordMatch) {
                res.status(200).json({ message: 'Login successful' ,
                user: {
                  userId: user._id,
                },
              });
                
            } else {
                res.status(401).json({ error: 'Invalid credentials' });
            }
        }
    } catch (error) {
        console.error('Error during login', error);
        res.status(500).send('Internal Server Error');
    }
});

// Create poll
const pollSchema = new mongoose.Schema({
    title: String,
    type: String,
    option1: String,
    value1: {
      type: Number,
      default: 0,
    },
    option2: String,
    value2: {
      type: Number,
      default: 0,
    },
    option3: String,
    value3: {
      type: Number,
      default: 0,
    },
    voted: [String]
});

const Poll = mongoose.model('Poll', pollSchema);

// Create a new poll
app.post('/poll-it/polls', async (req, res) => {
    const { title, type, option1, option2, option3 } = req.body;
    
    try {
        const newPoll = new Poll({
            title,
            type,
            option1,
            option2,
            option3,
        });
        
        const savedPoll = await newPoll.save();
        res.status(201).json(savedPoll);
    } catch (error) {
        console.error('Error creating poll', error);
        res.status(500).send('Internal Server Error');
    }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Fetch poll data
const fetchPolls = async () => {
  try {
    const polls = await Poll.find();
    return polls;
  } catch (error) {
    console.error('Error fetching poll data', error);
    throw error;
  }
};

app.get('/poll-it/polls', async (req, res) => {
  try {
    const polls = await fetchPolls();
    res.json(polls);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});