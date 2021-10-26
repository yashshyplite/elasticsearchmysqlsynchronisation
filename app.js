const express= require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine','ejs');
app.set('views','./view');

require('./bootstrap/bootstrap');
require('./bootstrap/bootstrap');
app.use('/',require('./routes'));

app.listen(3030,()=>{
    console.log("server running");
})