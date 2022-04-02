//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Socrates' young companions, Glaucon and Adeimantus, continue the argument of Thrasymachus for the sake of furthering the discussion. Glaucon gives a lecture in which he argues first that the origin of justice was in social contracts aimed at preventing one from suffering injustice and being unable to take revenge, second that all those who practice justice do so unwillingly and out of fear of punishment, and third that the life of the unjust man is far more blessed than that of the just man. Glaucon would like Socrates to prove that justice is not only desirable, but that it belongs to the highest class of desirable things: those desired both for their own sake and their consequences";
const aboutContent = "Socrates and his companions conclude their discussion concerning the lifestyle of the guardians, thus concluding their initial assessment of the city as a whole. Socrates assumes each person will be happy engaging in the occupation that suits them best. If the city as a whole is happy, then individuals are happy.";
const contactContent = "While visiting the Piraeus with Glaucon, Polemarchus tells Socrates to join him for a romp. Socrates then asks Cephalus, Polemarchus, and Thrasymachus their definitions of justice. Cephalus defines justice as giving what is owed. Polemarchus says justice is.. Socrates overturns their definitions and says that it is to one's advantage to be just and disadvantage to be unjust. The first book ends in aporia concerning its essence.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];


app.get ("/", function (req,res){
res.render("home",{StartingContent: homeStartingContent,
posts:posts
});

	});

app.get("/about", function(req,res){
	res.render("about",{aboutContent:aboutContent});

});

app.get("/contact", function(req,res){
res.render("contact",{contactContent:contactContent});
	});

	app.get("/compose", function(req,res){
	res.render("compose");
		});

app.post("/compose", function(req ,res){
const post = {
	title: req.body.postTitle,
	content: req.body.postBody
};
posts.push(post);
res.redirect("/");

});

app.get("/posts/:postName", function(req,res){
const requestedTitle = _.lowerCase(req.params.postName);

posts.forEach(function(post){
const storedTitle = _.lowerCase(post.title);

if(storedTitle === requestedTitle) {
 res.render("post",{
	 title:post.title,
	 content:post.content
 });
}
});
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
