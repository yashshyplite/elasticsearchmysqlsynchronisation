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
const insertsellerpage = (req,res)=>{
    res.render('insertsellerpage');
}
const updatesellerpage = (req,res)=>{
    res.render('updatesellerpage');
}
const sellersearchpage = (req,res)=>{
    res.render('sellersearchpage');
}
const trackingsearchpage=(req,res)=>{
    res.render('trackingsearchpage');
}
const updatetrackingpage=(req,res)=>{
    res.render('trackingupdatepage');
}
module.exports  = {
    home,insertpage,updatepage,deletepage,searchpage,insertsellerpage,updatesellerpage
    ,sellersearchpage,trackingsearchpage,updatetrackingpage
}