const express = require('express');
const router = express.Router();
const {home,insertpage,updatepage,deletepage,searchpage}=require('../controllers/renderpages');
const {insertinfo,updateinfo,deleteinfo,searchinfo}=require('../controllers/postmethods')

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

module.exports = router;