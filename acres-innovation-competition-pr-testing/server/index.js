const express = require('express')
const { indexRouter } = require('./router/indexRouter')
const cors = require('cors');
const bodyParser = require('body-parser');


const app = express()
// Enable CORS for all routes
app.use(cors({origin:"*"}));

// Parse application/json
app.use(bodyParser.json());
app.use('/',indexRouter)


app.listen(1000,()=>{
    console.log('listening')
})
