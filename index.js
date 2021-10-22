var express     = require('express'),
    app         = express(),
    bodyParser = require('body-parser'),
    expressSanitizer = require('express-sanitizer'),
    mongoose    = require('mongoose');
mongoose.connect("mongodb://octacode2:octacode@ds145293.mlab.com:45293/restful_blog_app", {
    useMongoClient: true
});
app.set("view_engine", "ejs");
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());

var port = process.env.PORT || 5000;

var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: {type: Date, default: Date.now}
})

var Blog = mongoose.model("Blog", blogSchema);

/*for(i=0;i<10;i++)
  Blog.create({
    title: "Sundar bacha "+i,
    image: "https://s5.favim.com/orig/53/beautiful-child-sad-Favim.com-491668.jpg",
    body: "Bacha sundar hai "+10*i
  }, function(err,entry){
    if(!err)
      console.log(entry);
  });
*/

//RESTFUL ROUTES
app.get('/', function(req, res){
  res.redirect('/blogs');
});

app.get('/blogs', function(req, res){
    Blog.find({}, function(err, blogs){
      if(err)
        console.log('Error fetching blogs');
      else {
        res.render('blogs.ejs',{blogs: blogs});
      }
    });
});

app.get('/blogs/new', function(req,res){
  res.render('new.ejs');
});

app.post('/blogs', function(req, res){
  req.body.blog.body = req.sanitize(req.body.blog.body);
  Blog.create(req.body.blog, function(err, newBlog){
    if(!err){
        res.redirect('/blogs');
    }
  });
});

app.get('/blogs/:id', function(req, res){
  Blog.findById(req.params.id, function(err, blog){
    if(!err){
      res.render('show.ejs', {blog:blog});
    }
    else res.redirect('/blogs');
  });
});

app.get('/blogs/:id/edit', function(req, res){
  Blog.findById(req.params.id, function(err, blog){
    if(!err){
      res.render('edit.ejs', {blog:blog});
    }
    else {
      res.redirect('/blogs');
    }
  });
});

//UPDATE BLOG
app.post('/blogs/:id', function(req,res){
  req.body.blog.body = req.sanitize(req.body.blog.body);
  Blog.findByIdAndUpdate(req.params.id, req.body.blog,function(err, updatedBlog){
    console.log(req.body.blog);
    res.redirect('/blogs/'+req.params.id);
  });
});

//DELETE BLOG
app.post('/blogs_delete/:id', function(req, res){
  Blog.findByIdAndRemove(req.params.id, function(err, blog){
    res.redirect('/blogs');
  });
});

app.listen(port, function(){
  console.log("Blogging app sunn rha hai!")
})
