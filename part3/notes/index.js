const express = require('express')
const cors = require('cors')
const app = express()

//express json-parser
app.use(express.json())
//CORS
app.use(cors())

let notes = [
    {
      id: 1,
      content: "HTML is easy",
      date: "2022-05-30T17:30:31.098Z",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only Javascript",
      date: "2022-05-30T18:39:34.091Z",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      date: "2022-05-30T19:20:14.298Z",
      important: true
    }
  ]

//HOME
app.get('/', (req, res)=>{
    res.send('<h1>Hello World!</h1>')
})

//READ ALL
app.get('/api/notes', (req, res) => {
    res.json(notes)
})

//ADD NOTE
const generateId = () => {
    const maxId = notes.length > 0
        ? Math.max(...notes.map(note=>note.id))
        : 0
    return maxId + 1;
}

app.post('/api/notes', (req, res)=>{
    const body = req.body;

    if(!body.content){
        return res.status(400).json({
            error: 'content missing'
        })
    }

    const note = {
        content: body.content,
        important: body.important || false,
        date: new Date(),
        id: generateId(),
    }
    
    notes = notes.concat(note)
    
    res.json(note);
})


//READ INDIVIDUAL
app.get('/api/notes/:id', (req, res)=>{
    const id = Number(req.params.id);
    const note = notes.find(note=> note.id === id);
    if(note){
        res.json(note);
    } else{
        res.statusMessage = "Note does not exist";
        res.status(404).end()
    }
})

//DELETE
app.delete('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id);
    notes = notes.filter(note => note.id !== id)
    res.status(204).end()
})

const PORT = 3001
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})