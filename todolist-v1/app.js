
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"))
var items = ["buy food", "feed diandian" ,"clean the bedroom"];  // a to do list
var workItems = [];
app.get("/", function(req, res) {
  var today = new Date();
  var currentday = today.getDay();
  var day = "";

  var option = {
    weekday: "long",
    day: "numeric",
    month : "long",
  };
  var day = today.toLocaleDateString("en-US",option);
  res.render('lists', {listTitle: day , newItem: items}); //no "" for day,otherwise the valueOfday is always day
});                                                        // render all the vars together

app.post("/",function(req,res){
   var newItem = req.body.newItem;
   console.log(req.body);
   if(req.body.list === "Work"){
     workItems.push(newItem);
     res.redirect("/work");
   }
   else{
     items.push(newItem);  // add new item
    res.redirect("/");
   }

})

app.get("/work",function(req,res){
  res.render("lists",{listTitle: "Work List", newItem: workItems});
})
app.post("/",function(req,res){
   var newItem = req.body.newItem;
     workItems.push(newItem);
     res.redirect("/work");
   })
app.get("/contact", function(req,res){
  res.render("contact")
})
app.listen(3000, function() {
  console.log("Server started on port 3000");
})
