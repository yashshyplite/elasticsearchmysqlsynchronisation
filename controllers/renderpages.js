const popup = require('node-popup');

const home = (req,res)=>{
    res.render('home');
}
const insertpage = (req,res)=>{
    res.render('insertpage');
}
const updatepage = (req,res)=>{
    res.render('updatepage');
}
const deletepage = (req,res)=>{
    res.render('deletepage');
}
const searchpage = (req,res)=>{
    res.render('searchpage');
}
module.exports  = {
    home,insertpage,updatepage,deletepage,searchpage
}