// var redis = require("redis");
// var client;

// if (!client) {
//   client = redis.createClient({
//     port: process.env.REDIS_PORT,
//     host: process.env.REDIS_HOSTNAME,
//     password: process.env.REDIS_PASSWORD,
//   });
// }

// client.on("connect", function () {
//   console.log("connected to redis");
// });

// client.on("error", function (err) {
//   console.log("redis connection failed with error",err);
//   process.exit(1);
// });

// module.exports = {
//   saveToken: (username, data) => {
//     return client.set(username, data, function (err, val) {
//       return err ? err : val ? true : null;
//     });
//   },

//   removeToken: (username) => {
//     return client.del(username);
//   },

//   getToken: (username) => {
//     return new Promise((resolve, reject) => {
//       client.get(username, function (err, val) {
//         if (err) {
//           reject(err);
//         } else {
//           resolve(val);
//         }
//       });
//     })
//   },
// };
