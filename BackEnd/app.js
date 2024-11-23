const express = require('express');
const ConnectToDb = require('./config/ConnactToDb');
require("dotenv").config();



//------------------------------------------------------------------------------
// **** Connect to DB ****

ConnectToDb();

//------------------------------------------------------------------------------
//**** IniApp ****
const app = express();

//**** Middleware ****
app.use(express.json());



//**** Routes ****


app.use("/api/auth", require("./routes/authroute"));
app.use("/api/users", require("./routes/usersRoute"));


//**** Running The Server ****
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(` ( ^__^ )  WOW GREAT *** Your APP is running on port  ${process.env.NODE_ENV} mode on port ${PORT}`));
