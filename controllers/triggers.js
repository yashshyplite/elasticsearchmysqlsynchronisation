'use strict'
require('array.prototype.flatmap').shim();
  
const insert =async(added)=>{
        // console.log("XX");
        var add =[];
        added.forEach(function(o){
            var e = {};
            Object.keys(o).forEach(function(k){
              var v = o[k];
              e[k] = String(v);
            });
            add.push(e);
          });
        const body = add.flatMap(doc => [{ index: { _index: 'orders' , _id:parseInt(doc.id)} }, doc])
        const { body: bulkResponse } = await client.bulk({ refresh: true, body })
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
    
    var e=Object.values(updated)[0];
    var idd=Object.keys(updated)[0];
    // console.log(u,idd);
    var doc = {};
    Object.keys(e).forEach(function(k){
      var v = e[k];
      doc[k] = String(v);
    });
    // console.log(e);
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
