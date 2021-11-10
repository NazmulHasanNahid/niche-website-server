const express = require('express')
const app = express()
const cors = require('cors');
require('dotenv').config()
const { MongoClient } = require('mongodb');
const port = process.env.PORT || 5000;

app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ggpou.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
console.log(uri)


async function run(){
  try{
     await client.connect();
    // console.log('database successfully port run');

    const database = client.db('product');
    const productsCollection =database.collection('cycle');
    
    //GET API
    app.get('/products', async (req ,res)=> {
       const cursor = productsCollection.find({});
       const  products = await cursor.toArray();
       res.send(products);
    })

    //POST API
    app.post('/products', async(req, res)=>{
        const product = req.body;
        const result = await productsCollection.insertOne(product);
        res.json(result)
    });
  
   

  }
  finally{
      //await client.close();
  }

}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello Cycle mart')
})

app.listen(port, () => {
  console.log(`listening at ${port}`)
})