import express from 'express';
import {MongoClient} from 'mongodb';

import {db, connectToDB} from './db.js'
// let articlesInfo = [{
//     name:'learn-react',
//     upvotes:0,
//     comments: [],
// },{
//     name:'learn-node',
//     upvotes:0,
//     comments: [],
// },{
//     name:'mongodb',
//     upvotes:0,
//     comments: [],
// }]

const app = express();

app.use(express.json());

app.get('/api/articles/:name',async (req, res)=>{
    const {name} = req.params;

    // const client = new MongoClient('mongodb://127.0.0.1:27017');
    // await client.connect();

    // const db = client.db('react-blog-db'); //use react-blog-db

    const article = await db.collection('articles').findOne({name})

    if(article){
        res.json(article);
    } else{
        res.sendStatus(404).send('article not found');
    }   
})

//upvote end point
app.put('/api/articles/:name/upvote', async (req,res)=>{
    const {name} = req.params;
    
    // const client = new MongoClient('mongodb://127.0.0.1:27017')
    // await client.connect();
    // const db = client.db('react-blog-db')
    await db.collection('articles').updateOne({name},{
        $inc: {upvotes: 1}
    });

    const article = await db.collection('articles').findOne({name})

    if(article){
        res.json(article);
    } else{
        res.send('that article doesn\'t exist')
    }
})

// comments endpoint
app.post('/api/articles/:name/comments',async (req,res)=>{
    const {name} = req.params;
    const {postedBy, text} = req.body;

    // const client = new MongoClient('mongodb://127.0.0.1:27017')
    // await client.connect();

    // const db = client.db('react-blog-db');

    await db.collection('articles').updateOne({name},{
        $push: {comments:{postedBy, text}},
    });

    const article = await db.collection('articles').findOne({name})

    if(article){
        
        res.json(article)
    } else{
        res.send('the article not exist')
    }

})

connectToDB(() =>{
    console.log('connected')
    app.listen(8000, ()=>{
    console.log('server is listening on port 8000')
    })  
})


