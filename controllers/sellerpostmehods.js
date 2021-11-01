const insertsellerinfo =(req,res)=>{
    var date= new Date(req.body.date);
    let sql = "INSERT INTO sellers SET ?;";
    liveDb.db.query(sql,req.body,err=>{
        if(err){
            console.log(err);
        }
        res.redirect('/insertseller')
    });
};

const updatesellerinfo =(req,res)=>{
    let sql = `UPDATE sellers SET ? WHERE sellerID=${req.body.sellerID}`;
    let body =req.body;
    let post={};
    Object.keys(body).forEach(i => {
        // console.log(i);
        if (body[i].length) {
            post[i] = body[i];
        }
    })
    console.log(post);
    liveDb.db.query(sql,post,err=>{
        if(err){
            console.log(err);
        }
        res.redirect('/');
    });

};
const sellersearchinfo =async(req,res)=>{
    var search= req.body.sellersearch;
    const {body} =await client.search({
        index:'sellers',
        body:{
            query:{
                multi_match : {
                    query: search,
                    type:  "phrase",
                    fields:     [ "sellername", "mobileNo","email","address"],
                }
            }
        }
    })
    res.send(body.hits)
    
};
module.exports={insertsellerinfo,updatesellerinfo,sellersearchinfo};