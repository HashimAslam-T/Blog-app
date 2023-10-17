const express = require('express');
const router1 = require('./routers/authenticationRouter');
const router2 = require('./routers/blogPostRouter');
const router3 = require('./routers/commentsRouter')
const router4 = require('./routers/tagsRouter')


const app = express();

app.use(express.json());
app.use('/',router1);
app.use('/',router2);
app.use('/',router3);
app.use('/',router4);


app.listen(3000,()=>{
    console.log('Server runs!!');
})
