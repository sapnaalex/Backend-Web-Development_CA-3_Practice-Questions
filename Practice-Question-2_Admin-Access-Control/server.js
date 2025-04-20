const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
app.use(express.json());

app.get("/", (req, res)=>{
    res.send("Server is live");
})

const admin = {
    username: "superadmin",
    password: "topsecret",
    employeeID: "ADM007"
};

app.post("/admin/login", (req, res)=>{
    const{username, password} = req.body;
    if(username == admin.username && password == admin.password){
        const token = jwt.sign({employeeID: admin.employeeID}, process.env.JWT_SECRET, {expiresIn:"1m"});
        res.json({ token});
    }else{
        res.status(401).json({ message: "Unauthorized"});
    }
});

app.get("/admin/dashboard", (req, res)=>{
    const authHeader = req.header.authorization;
    if(!authHeader|| !authHeader.startsWith("Bearer ")){
        res.status(401).json({ message: "Token is missing or invalid"});
    }
    const token = authHeader.split(" ")[1];
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.json({ message: "Welcome Admin", employeeID: decoded.employeeID });
    }catch{
        res.status(403).json({ message: "Forbidden access"});
    }
});

PORT=process.env.PORT||3000;
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})