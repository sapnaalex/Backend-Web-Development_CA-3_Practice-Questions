// require("dotenv").config();
// const express = require("express");
// const jwt = require("jsonwebtoken");

// const app = express();

// app.use(express.json());

// class EmployeeAuth{
//     constructor(){
//         this.credentials = {
//             username: 'admin',
//             password: 'secret123',
//             employeeID: 'EMP001'
//         };
//     }

//     login(req, res){
//         const { username, password} = req.body;
//         if(username==this.credentials.username && password == this.credentials.password){
//             const token = jwt.sign({ employeeID: this.credentials.employeeID}, process.env.JWT_SECRET, { expiresIn: '1m' });
//             res.json({ token });
//         }else{
//             res.status(401).json({ message: 'Invalid credentials.' });

//         }
//     }

//     dashboard(req, res){
//         const authHeader = req.headers.authorization;
//         if(!authHeader || !authHeader.startsWith("Bearer ")){
//             return res.status(401).json({message: 'Token missing or invalid' });

//         }
//         const token = authHeader.split(" ")[1];
//         try{
//             const decoded = jwt.verify(token, process.env.JWT_SECRET);
//             res.json({ message: 'Welcome to dashboard', employeeID: decoded.employeeID });
//         }catch{
//             res.status(403).json({ message: 'Token verification failed'});
//         }
//     }
// }

// const employeeAuth = new EmployeeAuth();

// app.post('/login', (req, res)=> employeeAuth.login(req, res));
// app.get('/dashboard', (req, res)=> employeeAuth.dashboard(req, res));

// PORT=process.env.PORT;
// app.listen(PORT, ()=> console.log(`Employee Server is running on port ${PORT}`));




const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
app.use(express.json());

const credentials = {
    username: 'admin',
    password: 'secret123',
    employeeID: 'EMP001'
};

app.post('/login', (req, res)=>{
    const{username, password}  =req.body;
    if(username == credentials.username && password == credentials.password){
        const token = jwt.sign({ employeeID: credentials.employeeID}, process.env.JWT_SECRET, {expiresIn: '1m'});
        res.json({ token});
    }else{
        res.status(401).json({ message: "Invalid credentials"});
    }
});

app.get('/dashboard',(req, res)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({message: "Token missing or Invalid"});
    }
    const token = authHeader.split(" ")[1];
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.json({message: "Welcome to dashboard", employeeID: decoded.employeeID });
    }catch{
        res.status(403).json({ message: 'Token verification failed'});
    }
});


PORT=process.env.PORT||3000;
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})