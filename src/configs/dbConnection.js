
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB)
.then(() => console.log("*** DB CONNECTED***"))
.catch((err) =>console.log("*** DB NOT CONNECTED*** ", err))