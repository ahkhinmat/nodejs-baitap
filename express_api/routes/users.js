import express  from 'express';
const router = express.Router();
const users=[
    {
        firstName: "Jhon",
        lasrName: "Doe",
        age:"25"
    }   ,
    {
        firstName: "Kha",
        lasrName: "DoPêtre",
        age:"24"
    }   
];

// tất cả các route ở đây đều bắt đầu  với /users
router.get('/' , (req,res)=>{
    console.log(users);
    //res.send(users);
   res.send(`${new Date()}Hello!`);
  
});



export default router;