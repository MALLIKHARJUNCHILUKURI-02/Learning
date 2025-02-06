import express from "express";
const app = express();
const port = 3000;

app.get("/",(req, res)=>{
    res.send("<h1>Mallikharjun Reddy</h1>");
    // console.log(req.rawHeaders);
});


app.get("/about",(req,res) => {
    res.send("<h1>About Malikharjun</h1>")
});

app.get("/contact",(req,res) => {
    res.send("Contact Mallikharjun")
});
app.listen(port, () =>{
    console.log(`Server Is Running On Port ${port}.`);
});
