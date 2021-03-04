
const Joi = require('joi');
const express = require('express');
const app = express();
const env = process.env;

const { Client } = require('pg');

const client = new Client({
    user: env.SPRING_USERNAME,
    host: 'localhost',
    database: 'books',
    password: env.SPRING_PASSWORD,
    port: 5432,
});

client.connect();


app.use(express.json());
app.set('view engine', 'pug');

const courses = [
     {id: 1, name: 'course1'},
     {id: 2, name: 'course2'},
     {id: 3, name: 'course3'}
]
    



//ROUTERS
app.get('/', (req , res) =>{
     res.render('index', { title: 'Hey', message: 'Hello there!' })
});

app.get('/api/courses', async function(req,   res) {
     const {rows, fields} = await client.query('SELECT * from users;');
     res.send(rows);
});

app.post('/api/courses', (req, res)=>{
     const {error} = validateCourse(req.body);
     if(error)return res.status(400).send(error.details[0].message)
        
    
     const course = {
          id: courses.length + 1,
          name : req.body.name
     }
     courses.push(course);
     res.send(course);
});

app.put('api/courses/:id', (req , res)=>{  
     const course = courses.find(c => c.id === parseInt(req.params.id));
     if(!course)return res.status(404).send('The courses with given ID was not found')
     

     const {error} = validateCourse(req.body);
     if(error)return res.status(400).send(error.details[0].message)
        
   
     course.name = req.body.name;
     res.send(course);
}); 
function validateCourse (course){
     const schema = {
          name: Joi.string().min(3).required(),
     }
        return Joi.validate(course, schema);
};

app.delete('/api/courses/:id', (req,res)=>{
     const course = courses.find(c => c.id === parseInt(req.params.id));
     if(!course) return res.status(404).send('The courses with given ID was not found')

    const index = courses.indexOf(courses);
    courses.slice(index, 1);
    res.send(course);

})
 



app.get('/api/courses/:id', (req, res)=>{
     const course = courses.find(c => c.id === parseInt(req.params.id));
     if(!course)return res.status(404).send('The courses with given ID was not found')
          res.send(course);
});
//we listen the server
const PORT = process.env.PORT || 80;
app.listen(PORT , () =>{
     console.log(`${PORT} is working`);
});

