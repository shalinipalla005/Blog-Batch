import express from "express";
import bodyParser  from "body-parser";
const app = express();
const port = 3000;

let posts = [];
let date = new Date();
let time = date.getTime();

function Post(title, content, time) {
    this.title = title;
    this.content = content;
    if(time){
        this.date = time;
    }
}

function editPost(index, title, content) {
    posts[index] = new Post(title, content);

}

function deletePost(index) {
    posts.splice(index, 1);
}

function addPost(title, content, time) {
    let post = new Post(title, content , time);
    posts.push(post);
}

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));

app.get("/", (req, res) => {
    res.render("home.ejs", {posts: posts});
});

app.get("/view/:id", (req, res) => {
    let index = req.params.id;
    let post = posts[index];
    res.render("view.ejs", {postId: index, title: post.title, content: post.content});
});

app.post("/delete", (req, res) => {
    let index = req.body["postId"];
    deletePost(index);
    res.redirect("/");
});

app.get("/edit/:id", (req, res) => {
    let index = req.params.id;
    let post = posts[index];
    res.render("create.ejs", {postId: index, title: post.title, content: post.content });
});

app.post("/update", (req, res) => {
    let title = req.body["title"];
    let content = req.body["content"];
    let index = req.body["index"];
    editPost(index, title, content);
    res.redirect("/");
});

app.get("/create", (req, res) => {
    res.render("create.ejs");
});

app.post("/save", (req, res) => {
    let title = req.body["title"];
    let content = req.body["content"];
    
    addPost(title, content);
    res.redirect("/");
});



app.listen(port, () => {
    addPost("Tech Innovations Weekly", "Stay ahead with the latest trends in technology and innovation. This week, we dive into the newest developments in AI, blockchain, and green tech. Join us as we explore groundbreaking advancements that are shaping the future. ",
        date.toLocaleString())

    addPost("Eco-Friendly Living", "Make a positive impact on the planet with this week's Eco-Friendly Living tips. Learn about sustainable practices, green products, and how you can contribute to a healthier environment. Join us in making the world a better place, one small step at a time.",
        date.toLocaleString())

    addPost("Entrepreneur's Edge","Empower your entrepreneurial spirit with insights from this week's Entrepreneur's Edge. Discover tips on starting and growing your business, overcoming challenges, and staying ahead of the competition in the dynamic world of entrepreneurship.",
        date.toLocaleString())
    console.log(`Listening port on : ${port}`)
})

	




