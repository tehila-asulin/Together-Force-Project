// // // // require("dotenv").config();

// // // // const express = require('express');
// // // // const mongoose = require('mongoose');
// // // // const cors = require("cors");
// // // // const bodyParser = require('body-parser');

// // // // const volunteerRoutes = require('./routes/volunteerRoutes');
// // // // const volunteeringRoutes = require('./routes/volunteeringRoutes');
// // // // const organizationRoutes = require('./routes/organizationRoutes');

// // // // const corsOptions = require("./config/corsOptions");
// // // // const connectDB = require("./config/dbConn");

// // // // const app = express();
// // // // const PORT = process.env.PORT || 8000;

// // // // app.use(express.json({ limit: '10mb' }));
// // // // app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// // // // // Middlewares
// // // // app.use(cors(corsOptions));
// // // // app.use(bodyParser.json()); 

// // // // // Routes
// // // // app.use('/api/volunteerRoutes', volunteerRoutes);
// // // // app.use('/api/volunteeringRoutes', volunteeringRoutes);
// // // // app.use('/api/organizationRoutes', organizationRoutes);
// // // // app.use("/api/auth", require("./routes/authRoutes"));

// // // // // Connect to DB and start server
// // // // connectDB();
// // // // //image


// // // // mongoose.connect(process.env.CONNECTION_URL, {
// // // //     useNewUrlParser: true,
// // // //     useUnifiedTopology: true
// // // // })
// // // // .then(() => {
// // // //     app.listen(PORT, () => {
// // // //         console.log(` Server running on port ${PORT}`);
// // // //     });
// // // // })
// // // // .catch((error) => {
// // // //     console.log(error.message);
// // // // });


// // // // // העלאת תמונות
// // // // import { v2 as cloudinary } from 'cloudinary';
// // // // const api_secret=env.API_SECRET
// // // // (async function() {

// // // //     // Configuration
// // // //     cloudinary.config({ 
// // // //         cloud_name: 'dnnbtiob4', 
// // // //         api_key: '754526529756258', 
// // // //         api_secret: api_secret
// // // //     });
    
// // // //     // Upload an image
// // // //      const uploadResult = await cloudinary.uploader
// // // //        .upload(
// // // //            'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
// // // //                public_id: 'shoes',
// // // //            }
// // // //        )
// // // //        .catch((error) => {
// // // //            console.log(error);
// // // //        });
    
// // // //     console.log(uploadResult);
    
// // // //     // Optimize delivery by resizing and applying auto-format and auto-quality
// // // //     const optimizeUrl = cloudinary.url('shoes', {
// // // //         fetch_format: 'auto',
// // // //         quality: 'auto'
// // // //     });
    
// // // //     console.log(optimizeUrl);
    
// // // //     // Transform the image: auto-crop to square aspect_ratio
// // // //     const autoCropUrl = cloudinary.url('shoes', {
// // // //         crop: 'auto',
// // // //         gravity: 'auto',
// // // //         width: 500,
// // // //         height: 500,
// // // //     });
    
// // // //     console.log(autoCropUrl);    
// // // // })();


// // // require("dotenv").config();

// // // const express = require('express');
// // // const mongoose = require('mongoose');
// // // const cors = require("cors");
// // // const bodyParser = require('body-parser');
// // // const fileUpload = require('express-fileupload');

// // // const volunteerRoutes = require('./routes/volunteerRoutes');
// // // const volunteeringRoutes = require('./routes/volunteeringRoutes');
// // // const organizationRoutes = require('./routes/organizationRoutes');
// // // const authRoutes = require('./routes/authRoutes');

// // // const corsOptions = require("./config/corsOptions");
// // // const connectDB = require("./config/dbConn");

// // // const { v2: cloudinary } = require('cloudinary');

// // // // Cloudinary config
// // // cloudinary.config({
// // //   cloud_name: process.env.CLOUD_NAME,
// // //   api_key: process.env.API_KEY,
// // //   api_secret: process.env.API_SECRET,
// // // });

// // // const app = express();
// // // const PORT = process.env.PORT || 8000;

// // // // Middlewares
// // // app.use(cors(corsOptions));
// // // app.use(bodyParser.json());
// // // app.use(express.json({ limit: '10mb' }));
// // // app.use(express.urlencoded({ extended: true, limit: '10mb' }));
// // // app.use(fileUpload({ useTempFiles: true }));

// // // // Routes
// // // app.use('/api/volunteerRoutes', volunteerRoutes);
// // // app.use('/api/volunteeringRoutes', volunteeringRoutes);
// // // app.use('/api/organizationRoutes', organizationRoutes);
// // // app.use("/api/auth", authRoutes);

// // // // Connect to DB and start server
// // // connectDB();

// // // mongoose.connect(process.env.CONNECTION_URL, {
// // //     useNewUrlParser: true,
// // //     useUnifiedTopology: true
// // // })
// // // .then(() => {
// // //     app.listen(PORT, () => {
// // //         console.log(`Server running on port ${PORT}`);
// // //     });
// // // })
// // // .catch((error) => {
// // //     console.log(error.message);
// // // });
// // require("dotenv").config();

// // const express = require('express');
// // const mongoose = require('mongoose');
// // const cors = require("cors");
// // const bodyParser = require('body-parser');
// // const fileUpload = require('express-fileupload');

// // const volunteerRoutes = require('./routes/volunteerRoutes');
// // const volunteeringRoutes = require('./routes/volunteeringRoutes');
// // const organizationRoutes = require('./routes/organizationRoutes');
// // const authRoutes = require('./routes/authRoutes');

// // const corsOptions = require("./config/corsOptions");
// // const connectDB = require("./config/dbConn");

// // const { v2: cloudinary } = require('cloudinary');

// // // Cloudinary config
// // cloudinary.config({
// //   cloud_name: process.env.CLOUD_NAME,
// //   api_key: process.env.API_KEY,
// //   api_secret: process.env.API_SECRET,
// // });

// // const app = express();
// // const PORT = process.env.PORT || 8000;

// // // Middlewares
// // app.use(cors(corsOptions));
// // app.use(bodyParser.json());
// // app.use(express.json());
// // // app.use(express.urlencoded({ extended: true, limit: '10mb' }));
// // app.use(fileUpload({
// //   createParentPath: true,  // יוצר את התיקיה אם היא לא קיימת // מגביל את גודל הקובץ ל־10MB
// //   abortOnLimit: true,  // אם הקובץ חורג מהמגבלה, תעצור את הבקשה
// //   safeFileNames: true,  // שומר על שמות קבצים בטוחים
// // }));


// // // Routes
// // app.use('/api/volunteerRoutes', volunteerRoutes);
// // app.use('/api/volunteeringRoutes', volunteeringRoutes);
// // app.use('/api/organizationRoutes', organizationRoutes);
// // app.use("/api/auth", authRoutes);

// // // Connect to DB and start server
// // connectDB();

// // mongoose.connect(process.env.CONNECTION_URL, {
// //     useNewUrlParser: true,
// //     useUnifiedTopology: true
// // })
// // .then(() => {
// //     app.listen(PORT, () => {
// //         console.log(`Server running on port ${PORT}`);
// //     });
// // })
// // .catch((error) => {
// //     console.log(error.message);
// // });
// // require("dotenv").config();

// // const express = require('express');
// // const mongoose = require('mongoose');
// // const cors = require("cors");
// // const bodyParser = require('body-parser');
// // const fileUpload = require('express-fileupload');

// // const volunteerRoutes = require('./routes/volunteerRoutes');
// // const volunteeringRoutes = require('./routes/volunteeringRoutes');
// // const organizationRoutes = require('./routes/organizationRoutes');
// // const authRoutes = require('./routes/authRoutes');

// // const corsOptions = require("./config/corsOptions");
// // const connectDB = require("./config/dbConn");

// // const { v2: cloudinary } = require('cloudinary');

// // // === Cloudinary Config ===
// // cloudinary.config({
// //   cloud_name: process.env.CLOUD_NAME,
// //   api_key: process.env.API_KEY,
// //   api_secret: process.env.API_SECRET,
// // });

// // const app = express();
// // const PORT = process.env.PORT || 8000;

// // // === Middlewares ===
// // app.use(cors(corsOptions));
// // app.use(bodyParser.json());
// // app.use(express.json());

// // app.use(
// //   fileUpload({
// //     useTempFiles: true,                 // שמירת קבצים זמנית
// //     tempFileDir: '/tmp/',              // תיקיה זמנית
// //     createParentPath: true,
// //     limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
// //     abortOnLimit: true,
// //     safeFileNames: true,
// //     preserveExtension: true,
// //   })
// // );

// // // === Routes ===
// // app.use('/api/volunteerRoutes', volunteerRoutes);
// // app.use('/api/volunteeringRoutes', volunteeringRoutes);
// // app.use('/api/organizationRoutes', organizationRoutes);
// // app.use('/api/auth', authRoutes);

// // // === Connect to DB and Start Server ===
// // connectDB();

// // mongoose
// //   .connect(process.env.CONNECTION_URL, {
// //     useNewUrlParser: true,
// //     useUnifiedTopology: true,
// //   })
// //   .then(() => {
// //     app.listen(PORT, () => {
// //       console.log(`✅ Server running on port ${PORT}`);
// //     });
// //   })
// //   .catch((error) => {
// //     console.error('❌ MongoDB connection error:', error.message);
// //   });
// require("dotenv").config();

// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require("cors");
// const bodyParser = require('body-parser');
// const fileUpload = require('express-fileupload'); // ✅

// const volunteerRoutes = require('./routes/volunteerRoutes');
// const volunteeringRoutes = require('./routes/volunteeringRoutes');
// const organizationRoutes = require('./routes/organizationRoutes');
// const authRoutes = require('./routes/authRoutes');

// const corsOptions = require("./config/corsOptions");
// const connectDB = require("./config/dbConn");

// const { v2: cloudinary } = require('cloudinary');

// // === Cloudinary Config ===
// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.API_KEY,
//   api_secret: process.env.API_SECRET,
// });

// const app = express();
// const PORT = process.env.PORT || 8000;

// // === Middlewares ===
// app.use(cors(corsOptions));
// app.use(bodyParser.json());
// app.use(express.json());

// // ✅ שימוש ב־express-fileupload
// app.use(
//   fileUpload({
//     useTempFiles: true,                 // שמירת קבצים זמנית
//     tempFileDir: '/tmp/',              // תיקיה זמנית
//     createParentPath: true,
//     limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
//     abortOnLimit: true,
//     safeFileNames: true,
//     preserveExtension: true,
//   })
// );

// // === Routes ===
// app.use('/api/volunteerRoutes', volunteerRoutes);
// app.use('/api/volunteeringRoutes', volunteeringRoutes);
// app.use('/api/organizationRoutes', organizationRoutes);
// app.use('/api/auth', authRoutes);

// // === Connect to DB and Start Server ===
// connectDB();

// mongoose
//   .connect(process.env.CONNECTION_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log(`✅ Server running on port ${PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.error('❌ MongoDB connection error:', error.message);
//   });
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';


require("dotenv").config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload'); // ✅

const volunteerRoutes = require('./routes/volunteerRoutes');
const volunteeringRoutes = require('./routes/volunteeringRoutes');
const organizationRoutes = require('./routes/organizationRoutes');
const authRoutes = require('./routes/authRoutes');

const corsOptions = require("./config/corsOptions");
const connectDB = require("./config/dbConn");

const { v2: cloudinary } = require('cloudinary');

// === Cloudinary Config ===
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const app = express();
const PORT = process.env.PORT || 8000;

// === Middlewares ===
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.json());

// ✅ שימוש ב־express-fileupload
app.use(
  fileUpload({
    useTempFiles: true,                 // שמירת קבצים זמנית
    tempFileDir: '/tmp/',              // תיקיה זמנית
    createParentPath: true,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
    abortOnLimit: true,
    safeFileNames: true,
    preserveExtension: true,
  })
);

// === Routes ===
app.use('/api/volunteerRoutes', volunteerRoutes);
app.use('/api/volunteeringRoutes', volunteeringRoutes);  // כאן התקן את הנתיב
app.use('/api/organizationRoutes', organizationRoutes);
app.use('/api/auth', authRoutes);

// === Connect to DB and Start Server ===
connectDB();

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error.message);
  });
