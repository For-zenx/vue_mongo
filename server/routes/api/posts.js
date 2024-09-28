const express = require('express');
const mongodb = require('mongodb');
require('dotenv').config();

const router = express.Router();

// Get Posts
router.get('/', async (req, res) => {
    const posts = await loadPostCollection();
    res.send(await posts.find({}).toArray());
});

// Add Posts
router.post('/', async (req, res) => {
    const posts = await loadPostCollection();
    await posts.insertOne({
        text: req.body.text,
        created_at: new Date(),
    });
    res.status(201).send();
})

// Delete Post
router.delete('/:id', async (req, res) => {
    const posts = await loadPostCollection();
    await posts.deleteOne({_id: new mongodb.ObjectId(req.params.id)});
    res.status(200).send()
})

async function loadPostCollection() {
    const client = await mongodb.MongoClient.connect(process.env.MONGODB_URI);
    return client.db('vuemongo').collection('posts');
}

module.exports = router;