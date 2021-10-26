'use strict'

require('array.prototype.flatmap').shim();
var check=async(findid)=>{
    // console.log(findid);
    const {body} =await client.search({
        index:'orders',
        body: {
          query : {
            match:{
                _id:findid
            }
        }
        }
      })
    //   console.log(body.hits);
    return body.hits.hits
}
const insert =async(added)=>{
    if(check(added[0].id).length!=0){
        console.log("XX");
        const body = added.flatMap(doc => [{ index: { _index: 'orders' , _id:doc.id} }, doc])
        const { body: bulkResponse } = await client.bulk({ refresh: true, body })
    }
}
const deletefrom=async (deleteid)=>{
    await client.delete({
        index: "orders",
        id: deleteid
    });
}
// const del=async ()=>{
//     await client.delete({
//         index: "orders",
//         id: "17950757"
//     });
// }
var updatein= async(updated)=>{
    
    var doc=Object.values(updated)[0];
    var idd=Object.keys(updated)[0];
    // console.log(u,idd);
    await client.update({
      index: 'orders',
      id: idd,
      body: {
        doc
      }
    })
  }

const triggers = function(diff, data){
    console.log("data ------------------>\n",diff);
    var added=Object.values(diff.added);
    if(added.length)insert(added);
    if(diff.removed!=null){
        var deleted=Object.keys(diff.removed);
        if(deleted.length)deletefrom(deleted[0]);
    }
    if(diff.changed!=null){
        var updated=diff.changed;
        if(Object.keys(updated).length)updatein(updated);
    }
};
module.exports = {triggers};
