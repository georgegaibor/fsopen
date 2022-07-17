const mongoose = require('mongoose')


const input = process.argv.length

if(input > 5){
  console.log('Too many arguments')
  process.exit(1)
}else if(input < 3){
  console.log('Please provide the password as an argument')
  process.exit(1)
}


const password = process.argv[2]
const inputName = process.argv[3]
const inputNumber = process.argv[4]
const url = `mongodb+srv://phone:${password}@phonecluster.nlq8h1w.mongodb.net/
?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

mongoose
  .connect(url)
  .then(() => {
    console.log('connected')

    if(input === 3){
      console.log('phonebook')

      Person.find({}).then(result => {
        result.forEach(person => {
          console.log(`${person.name} ${person.number}`)
        })
        return mongoose.connection.close()
      })

    }else if(input === 5){
      const person = new Person({
        name: inputName,
        number: inputNumber,
      })
      person.save().then(() => {
        console.log(`added ${inputName} number ${inputNumber} to phonebook`)
        return mongoose.connection.close()
      })
    }
  })
  .catch((err) => console.log(err))
