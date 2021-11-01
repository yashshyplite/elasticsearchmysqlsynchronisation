const insertTracking=async(post)=>{
    var sql = "INSERT IGNORE INTO tracking (OrderID,pincode,date,totalValue,created,status) VALUES ?";
    var items = Object.values(post);
    var arr=[items.map(item => [item.id, item.pincode, item.date,item.totalValue,item.created,item.status])];
    // console.log(arr);
    liveDb.db.query(sql,arr,err=>{
        if(err){
            console.log(err);
        }
    });
}
const searchtrackinginfo =async(req,res)=>{
    var search= req.body.orderID;
    const {body} =await client.get({
        index:'tracking',
        id:search
    })
    res.send(body)
    
};

const updatetrackinginfo =(req,res)=>{
    let sql = `UPDATE tracking SET ? WHERE orderID=${req.body.orderID};`;
    let body =req.body;
    let post={};
    Object.keys(body).forEach(i => {
        // console.log(i);
        if (body[i].length&&i!='orderID') {
            var date= new Date(body[i]);
            post[i] = date.toISOString().slice(0, 19).replace('T', ' ');
        }
    })
    liveDb.db.query(sql,post,err=>{
        if(err){
            console.log(err);
        }
        res.redirect('/');
    });

};
module.exports={insertTracking,searchtrackinginfo,updatetrackinginfo};