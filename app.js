const express = require('express')
const cors = require('cors')
const mysql2 = require('mysql2')

const app = express();
app.use(cors());
app.use(express.json());

// Use MySQL DB for Store Employee Data
const db = mysql2.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : "baxture"
});

db.connect(function(err) {
    if (err) throw err;
    console.log("Successfully connected to Database");
  });


// Get All Data of Employee
app.get('/', (req,res)=>{
    const sql =  "SELECT * FROM employee";
    db.query(sql,(err,result)=>{
        if(err){
            res.status(404).json({error:"No record found"})
        }
        else{
            res.status(200).json(result)
        }   
    })
})

// Get Employee Data base upon Employee Id
app.get('/employee/:id', async(req,res)=>{
    try{
        const sql = "SELECT * FROM employee WHERE id=?"
        const id =   await req.params.id;
        db.query(sql,[id],(err,result)=>{
            if(err){
                res.status(404).json({error:"No record found"})
            }
            else{
                res.status(200).json(result)
            }
        })
    }catch(error){
        res.status(500).json({ error: error.message });
    }
})

// Create new Employee
app.post('/employee', async(req,res) =>{ 
    const sql = "INSERT INTO employee (`id`,`name`,`age`,`hobbies`) VALUES (?)";
    await console.log(req.body)
    const values = [
        req.body.id,
        req.body.name,
        req.body.age,
        req.body.hobbies,
    ]
    db.query(sql, [values], (err,result) => {
        if(err){
            res.status(404).json({error:"No record found"})
        }
        else{
            res.status(200).json(result)
        }
    })
})

// Update All Data base upon Employee Id
app.put('/update/:id', async(req,res) =>{
    const sql = "UPDATE employee SET `id`=?, `name`=?, `age`=?, `hobbies`=? WHERE id=?";
    const id = await req.params.id;
    db.query(sql, [req.body.id,req.body.name,req.body.age,req.body.hobbies, id], (err,result)=>{
        if(err){
            res.status(404).json({error:"No record found"})
        }
        else{
            res.status(200).json(result)
        }
    })
});

// Delete Employee Data base upon Id 
app.delete('/delete/:id', async(req,res) =>{
    const sql = "DELETE FROM employee WHERE id=?";
    const id = await req.params.id;
    db.query(sql,[id],(err,result)=>{
        if(err){
            res.status(404).json({error:"No record found"})
        }
        else{
            res.status(200).json(result)
        }   
    })
})

app.listen(5000, ()=>{
    console.log("Server is running")
});