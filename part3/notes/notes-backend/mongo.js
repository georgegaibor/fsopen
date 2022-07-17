const mongoose = require('mongoose')

if (process.argv.length < 1) {
  console.log(`Please provide the password as an argument: 
    node mongo.js <password>`)
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fsopen:${password}@cluster0.f9nzer6.mongodb.net/
?retryWrites=true&w=majority`

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

mongoose
  .connect(url)
  .then(() => {
    console.log('connected')

    const notes = [
      {
        content: 'HTML is easy',
        date: new Date(),
        important: true,
      },
      {
        content: 'Mongoose makes use of mongo easy',
        date: new Date(),
        important: true,
      },
      {
        content: 'Callback-functions suck',
        date: new Date(),
        important: false,
      },
    ]

    return Note.insertMany(notes)
  })
  .then(() => {
    console.log('notes saved!')
    return mongoose.connection.close()
  })
  .catch((err) => console.log(err))
