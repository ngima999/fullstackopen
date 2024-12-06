const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://ngima9100:${password}@cluster0.0bylj.mongodb.net/personApp?retryWrites=true&w=majority&appName=Cluster0`
  

mongoose.set('strictQuery',false)
mongoose.connect(url)

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Contact = mongoose.model('Contact', phonebookSchema)

const contact = new Contact({
  name: 'Sita',
  number: '98786545'
})

contact.save().then(result => {
  console.log(`added ${contact.name} number ${contact.number} to phonebook`)

})


Contact
  .find({})
  .then(result=> {
    // ...
    console.log("phonebook:")
    result.forEach((contact)=>{
      console.log(`${contact.name} ${contact.number}`);
    })
    mongoose.connection.close()
  });