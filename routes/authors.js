const express = require("express")
const router = express.Router() //creates the router portion of the express variable
const Author = require("../models/author")

const bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

//All Authors Route
router.get('/', async (req, res) => {
  let searchOptions= {}
  if (req.query.name != null && req.query.name != '') {
    searchOptions.name = new RegExp(req.query.name, 'i')
  } 
  try {
    const authors = await Author.find(searchOptions)
    res.render('authors/index', {
      authors: authors ,
      searchOptions: req.query 
    })
  } catch {
    res.redirect('/')
  }
})

//New Author Route
router.get("/new", ( req, res) => {
    res.render("authors/new", {author: new Author()})
})

//Create Author Route
router.post("/", urlencodedParser , async ( req, res) => {
   // console.log(req.body)
    const author = new Author({
        name: req.body.name
    }) 

    try {
        const newAuthor = await author.save()
        //res.redirect(`authors/${newAuthor.id}`)
        res.redirect(`authors`)
      } catch {
        res.render('authors/new', {
          author: author,
          errorMessage: 'Error creating Author'
        })
      }

})

//exportsa information from this file, exports router
module.exports = router