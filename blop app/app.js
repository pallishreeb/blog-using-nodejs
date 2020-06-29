const express = require("express");
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require("mongoose");
const ejs = require('ejs')
const methodOverride= require('method-override')
const app= express();
const Article = require('./models/article')

mongoose.connect('mongodb://localhost/blog',
{useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true}
)

const articleRouter = require('./routes/articles')

app.set('view engine','ejs')

app.use(express.urlencoded({extended:false}))

app.use(methodOverride('_method'))

app.get('/', async(req,res)=>{
  
const articles = await Article.find().sort({createdAt:'desc'})


  res.render('articles/index',{articles:articles})
})

app.use('/articles',articleRouter)


    app.listen(3000,(req,res)=>{
        console.log('server created')
    });
