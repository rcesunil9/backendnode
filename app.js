const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morganLogger = require('morgan');
const mongoose = require('mongoose');
const environment = require('dotenv');
const cors = require('cors');
const path = require('path');
const Routes = require('./Routes')

environment.config();

const app = express();

app.options('*', cors());
app.use(cors());
app.use(express.static(path.join(__dirname,"../build")));

app.use(session({ secret: process.env.TOKEN_SECRET }));
const run = async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });
}
run();

app.use(morganLogger('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({
  verify: (req, res, buf) => {
    req.rawBody = buf
  }
}));
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: true,
    cookie: { maxAge: 3600000 }
}));


app.use('/api/users', Routes.users);
app.use('/api/contacts', Routes.contacts);
app.use('/api/contactgroups', Routes.contactGroups);
app.use('/api/cocarts', Routes.coCarts);
app.use('/api/products', Routes.products);
app.use('/api/members', Routes.members);
app.use('/api/chats', Routes.chats);
app.use('/api/messages', Routes.messages);
app.use('/api/wallmart', Routes.Wallmart);
app.use('/api/socials', Routes.socials);

app.use(function (err, req, res, next) {
  if(err.message)
    res.status(404).json({ status: "Error", message: err.message});
  else if (err.status === 404)
    res.status(404).json({ message: "Not found" });
  else
    res.status(500).json({ message: "Something looks wrong :( !!!"});
});

const http = require('http').Server(app);
const io = require('socket.io')(http, {
  cors: {
    // origin: "http://localhost:3000",
    origin: "*",
    methods: ["GET", "POST"]
  }
});


io.on('connection', socket => {
  console.log('connection established')
  socket.on('sendMessage', message => {
    io.emit('newMessage', message);
  })
});



http.listen(process.env.PORT || 5000, () => console.log(`Listening on port: ${process.env.PORT || 5000}`));


// app.listen(process.env.PORT || 3000, function () {
//     console.log('Node server listening on port 3000');
// });