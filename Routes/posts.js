const express = require('express')
const req = require('express/lib/request')
const res = require('express/lib/response')
const router = express.Router()
const Post = require('../models/Post')

//ROUTES
//Gets back all posts
router.get('/', async(req, res) => {
        try {
            const posts = await Post.find()
            res.json(posts)
        } catch (err) {
            res.json({ message: err.message })
        }
    })
    // router.get('/specific', (req, res) => {
    //     res.send("Specific post")
    // })

//submits the post
router.post('/', async(req, res) => {
        const post = new Post({
                title: req.body.title,
                description: req.body.description
            })
            // res.send(post);
        try {
            const savedPost = await post.save()
            res.json(savedPost)
        } catch (err) {
            res.json({ message: err.message })
        }
    })
    //Specific post
router.get('/:postID', async(req, res) => {
    try {
        const tempPost = await Post.findById(req.params.postID)
        res.json(tempPost)
    } catch (err) {
        res.json({ message: err.message })
    }
})

//Delete a specific post
router.delete('/:postID', async(req, res) => {
    try {
        const RemovePost = await Post.remove({ _id: req.params.postID })
        res.json(RemovePost)
    } catch (err) {
        res.json({ message: err.message })
    }
})

//Update a post
router.patch('/:postID', async(req, res) => {
    try {
        const updatedPost = await Post.updateOne({ _id: req.params.postID }, { $set: { title: req.body.title } })
        res.json(updatedPost)
    } catch (err) {
        res.json({ message: err.message })
    }
})


module.exports = router