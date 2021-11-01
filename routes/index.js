const express = require('express');
const router = express.Router();
const {home,insertpage,updatepage,deletepage,searchpage,insertsellerpage,updatesellerpage,sellersearchpage,
    trackingsearchpage,updatetrackingpage}=require('../controllers/renderpages');
const {insertinfo,updateinfo,deleteinfo,searchinfo}=require('../controllers/orderpostmethods')
const {insertsellerinfo,updatesellerinfo,sellersearchinfo} = require("../controllers/sellerpostmehods")
const {searchtrackinginfo,updatetrackinginfo}=require("../controllers/tracking");
router.route('/')
.get(home);


router.route('/insert')
.get(insertpage)
.post(insertinfo);

router.route('/update')
.get(updatepage)
.post(updateinfo);

router.route('/delete')
.get(deletepage)
.post(deleteinfo);
router.route('/search')
.get(searchpage)
.post(searchinfo);

router.route('/insertseller')
.get(insertsellerpage)
.post(insertsellerinfo);

router.route('/updateseller')
.get(updatesellerpage)
.post(updatesellerinfo);

router.route('/sellersearch')
.get(sellersearchpage)
.post(sellersearchinfo);

router.route('/trackingsearch')
.get(trackingsearchpage)
.post(searchtrackinginfo);

router.route('/updatetracking')
.get(updatetrackingpage)
.post(updatetrackinginfo);

module.exports = router;