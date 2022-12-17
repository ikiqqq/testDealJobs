const mongoose = require("mongoose")
mongoose.set("strictQuery", true);

// const connectDb = () => mongoose.connect(process.env.MONGO_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })

function connectDb () {
  return mongoose
              .connect(process.env.MONGO_URL, {
                  useNewUrlParser: true,
                  useUnifiedTopology: true
              })
                  .then(() => {
                      console.log('Database Connect')
                  })
                  .catch(err => {
                      console.log(err)
                  })            
}

module.exports =  {
  connectDb,
  // mongoose,
  // Schema,
  // ObjectId,
  // model
}