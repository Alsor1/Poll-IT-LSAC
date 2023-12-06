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
    option2: String,
    option3: String,
    votes: {
      type: [Number],
      default: [0,0,0]

    },
    voted: [String],
    userCreator: String,
});

const Poll = mongoose.model('Poll', pollSchema);

// Create a new poll
app.post('/poll-it/polls', async (req, res) => {
    const { title, type, option1, option2, option3 } = req.body;
    const userId = req.headers['user-id'];
    
    try {
        const newPoll = new Poll({
            title,
            type,
            option1,
            option2,
            option3,
            userCreator: userId,
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

app.delete('/poll-it/polls/:pollId', async (req, res) => {
  const userId = req.headers['user-id'];
  const pollId = req.params.pollId;

  try {

    const poll = await Poll.findOne({ _id: pollId, userCreator: userId });
    if (!poll) {
      res.status(404).json({ error: 'Poll not found or you do not have permission to delete it' });
    } else {
      await Poll.findByIdAndDelete(pollId);
      res.status(200).json({ message: 'Poll deleted successfully' });
    }
  } catch (error) {
    console.error('Error deleting poll', error);
    res.status(500).send('Internal Server Error');
  }
});


app.get('/poll-it/polls', async (req, res) => {
  try {
    const polls = await fetchPolls();
    res.json(polls);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/poll-it/polls', async (req, res) =>{
  const id = req.body.id;
  const check = req.body.checked;
  const poll = Poll.find({_id:id})
  poll.votes[check]++;
  poll.save();
})


// Vote on a poll
app.post('/poll-it/polls/vote', async (req, res) => {
  const { pollId, userId, selectedOption } = req.body;

  try {
    const poll = await Poll.findById(pollId);

    if (!poll) {
      res.status(404).json({ error: 'Poll not found' });
    } else {
      // Check if the user has already voted
      if (!poll.voted.includes(userId)) {
        // Update votes based on the selected option
        const optionIndex = ['option1', 'option2', 'option3'].indexOf(selectedOption);
        poll.votes[optionIndex]++;

        // Add the user to the list of voted users
        poll.voted.push(userId);

        // Save the updated poll
        await poll.save();

        res.status(200).json({ message: 'Vote submitted successfully' });
      } else {
        res.status(400).json({ error: 'User has already voted in this poll' });
      }
    }
  } catch (error) {
    console.error('Error submitting vote', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/poll-it/polls/vote-multiple', async (req, res) => {
  const { pollId, userId, selectedOptions } = req.body;

  try {
    const poll = await Poll.findById(pollId);

    if (!poll) {
      res.status(404).json({ error: 'Poll not found' });
    } else {
      // Check if the user has already voted
      if (!poll.voted.includes(userId)) {
        // Update votes based on the selected options
       
          poll.votes[0]=selectedOptions[0];
          poll.votes[1]=selectedOptions[1];
          poll.votes[2]=selectedOptions[2];


        // Add the user to the list of voted users
        poll.voted.push(userId);

        // Save the updated poll
        await poll.save();

        res.status(200).json({ message: 'Vote submitted successfully' });
      } else {
        res.status(400).json({ error: 'User has already voted in this poll' });
      }
    }
  } catch (error) {
    console.error('Error submitting vote', error);
    res.status(500).send('Internal Server Error');
  }
});