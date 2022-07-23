const connectToMongoose = require('./db');
const express = require('express')
var cors = require('cors')

connectToMongoose();



const app = express()
const port = 5000
app.use(cors())//For removing cors errors while accessing backend

app.use(express.json()) //For request body
// app.get('/', (req, res) => {
//   res.send('Hello Abdul!')
// })

// Available Roots
app.use("/api/auth",require("./routes/auth"))
app.use("/api/notes",require("./routes/notes"))



app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})