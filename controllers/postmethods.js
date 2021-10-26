const popup = require('node-popup');

const insertinfo =(req,res)=>{
    var date= new Date(req.body.date);
    let post = {
        importedID:req.body.importedID,
        sellerID:req.body.sellerID,
        channel:req.body.channel,
        customer:req.body.customer,
        pincode:req.body.pincode,
        type:req.body.type,
        date:date.toISOString().slice(0, 19).replace('T', ' '),
        totalValue:req.body.totalvalue,
        status:req.body.status
    }
    let sql = "INSERT INTO orders SET ?;";
    liveDb.db.query(sql,post,err=>{
        if(err){
            console.log(err);
        }
        res.redirect('/insert')
    });
};
const updateinfo =(req,res)=>{
    let sql = `UPDATE orders SET ? WHERE sellerID=${req.body.sellerID} And importedID=${req.body.importedID};`;
    let body =req.body;
    let post={};
    Object.keys(body).forEach(i => {
        // console.log(i);
        if (body[i].length) {
            post[i] = body[i];
        }
    })
    var ts = new Date();
    var currentOffset = ts.getTimezoneOffset();
    var ISTOffset = 330;   // IST offset UTC +5:30 
    var ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);
    post['modified']= ISTTime.toISOString().slice(0, 19).replace('T', ' ');
    liveDb.db.query(sql,post,err=>{
        if(err){
            console.log(err);
        }
        res.redirect('/');
    });

};
const deleteinfo =(req,res)=>{
    let sql = `DELETE FROM orders WHERE sellerID=${req.body.sellerID} And importedID=${req.body.importedID};`;
    liveDb.db.query(sql,err=>{
        if(err){
            console.log(err);
        }
    })
    res.redirect('/');
};

const searchinfo =async(req,res)=>{
    var search= req.body.search;
    var sid= req.body.sellerid;
    if (search){
        const {body} =await client.search({
            index:'orders',
            body:{
                query:{
                    bool: { 
                        should: [
                        { match: { sellerID: sid}},
                        { multi_match:{
                                query:search,
                                type:"phrase",
                                fields:[ "customer", "importID","date"],
                        }}
                        ]
                    }
                }
            }
        })
        res.send(body.hits);
    }
    else{
        const {body} =await client.search({
            index:'orders',
            body:{
                query:{
                     match: { sellerID: sid}  
                }
            }
        })
        res.send(body.hits)
    }
    
};

module.exports={insertinfo,updateinfo,deleteinfo,searchinfo}