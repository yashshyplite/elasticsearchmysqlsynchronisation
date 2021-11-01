require('dotenv').config()
var LiveSelect = require('@vlasky/mysql-live-select');
const { Client } = require('@elastic/elasticsearch')

const {triggers} = require('../controllers/orderstriggers');
const {sellertriggers}=require('../controllers/sellerstriggers');
const {trackingtriggers}=require('../controllers/trackingtriggers')


global.liveDb= new LiveSelect({
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    port: process.env.MYSQL_PORT
}).on('error',(err)=>{
        throw err;
}).on('ready',()=>{
    console.log("connected");
});

liveDb.select('select * from orders', null,
LiveMysqlKeySelector.Columns(['id']), [ {
  table: 'orders',
  database: 'nodemysql'
} ]).on('update',triggers);

liveDb.select('select * from sellers', null,
LiveMysqlKeySelector.Columns(['sellerID']), [ {
  table: 'sellers',
  database: 'nodemysql'
} ]).on('update',sellertriggers);

liveDb.select('select * from tracking', null,
LiveMysqlKeySelector.Columns(['orderID']), [ {
  table: 'tracking',
  database: 'nodemysql'
} ]).on('update',trackingtriggers);

global.client = new Client({
  node: 'http://localhost:9200',
});
