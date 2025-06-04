const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/dbConn');
const corsOptions = require('./config/corsOptions');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST","DELETE","PUT"],
    credentials: true
  }
});


app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
    createParentPath: true,
    limits: { fileSize: 10 * 1024 * 1024 },
    abortOnLimit: true,
    safeFileNames: true,
    preserveExtension: true,
  })
);
app.use(cookieParser());

const volunteeringController = require('./controllers/volunteeringController')(io);
const organizationController=require('./controllers/organizationController')(io)
const volunteerController=require('./controllers/volunteerController')(io)
const volunteerRoutes = require('./routes/volunteerRoutes')(volunteerController)
const volunteeringRoutes = require('./routes/volunteeringRoutes')(volunteeringController);
const organizationRoutes = require('./routes/organizationRoutes')(organizationController)
const authRoutes = require('./routes/authRoutes');

app.use('/api/volunteerRoutes', volunteerRoutes);
app.use('/api/volunteeringRoutes', volunteeringRoutes);
app.use('/api/organizationRoutes', organizationRoutes);
app.use('/api/auth', authRoutes);

connectDB();

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 9100;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = io;



