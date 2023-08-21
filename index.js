import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
let i=0, j=0;
let data =[];
let data2 = [];
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const currentDate = new Date();
        const dayName = daysOfWeek[currentDate.getDay()];
        const monthName = monthsOfYear[currentDate.getMonth()];
        const date = currentDate.getDate();
        const year = currentDate.getFullYear();
        const formattedDate = `${dayName} ${monthName} ${date}, ${year}`;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.get("/", (req, res) => {
    
    res.locals.formattedDate = formattedDate;
    res.locals.i = i;
    res.locals.data = data;
    res.locals.mode = "/";
    res.render("today.ejs");
});
app.get("/work", (req, res) => {
    res.locals.formattedDate = "It Is Time To Hustle Baby";
    res.locals.i = j;
    res.locals.data = data2;
    res.locals.mode = "/work";
    res.render("today.ejs");
});
app.post("/work", (req, res) => {
    const inputValue = req.body.newItem;
    res.locals.formattedDate = "It Is Time To Hustle Baby";
    res.locals.mode = "/work";
    res.locals.i = j;
    res.locals.data = data2;
    if(inputValue){
        j++;
        res.locals.i = j;
        data2.push(inputValue)
        res.locals.data = data2;
    }
    res.render("today.ejs");
  });
app.post("/", (req, res) => {
    res.locals.mode = "/";
    res.locals.formattedDate = formattedDate;
    const inputValue = req.body.newItem;
    res.locals.i = i;
    res.locals.data = data;
    if(inputValue){
        i++;
        res.locals.i = i;
        data.push(inputValue)
        res.locals.data = data;
    }
    res.render("today.ejs");
  });
  
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });