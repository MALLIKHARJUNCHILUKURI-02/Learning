const fs = require("fs");

// fs.writeFile("message.txt", "Hello From Node Jss", (err) => {
//     if(err) throw err;
//     console.log("The file Has Been Saved");
// });


fs.readFile("./message.txt", 'utf8', (err, data) =>{
    if(err) throw err;
    console.log(data);
});