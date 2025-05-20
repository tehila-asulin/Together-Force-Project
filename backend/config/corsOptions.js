// var whitelist = ['http://localhost:5173']
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   },
//   credentials: true 
// }
const whitelist = ['http://localhost:5173'];

const corsOptions = {
  origin: function (origin, callback) {
    // לאפשר גם בקשות בלי origin (לדוגמה מ-Postman או קריאות מהשרת עצמו)
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

module.exports = corsOptions;
