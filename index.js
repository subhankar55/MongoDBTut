// getting-started.js
const mongoose = require('mongoose');

async function main() {
  // Connect to DB
  await mongoose.connect('mongodb://127.0.0.1:27017/test');

  // Schema
  const kittyschema = new mongoose.Schema({ name: String });

  // Method
  kittyschema.methods.speak = function speak() {
    const greet = this.name
      ? "Meow! name is: " + this.name
      : "Name not available";
    console.log(greet);
  };

  // Model
  const Kitten = mongoose.model('kitten', kittyschema);

  // Documents
  const silent = new Kitten({ name: 'Silent' });
  const fluffy = new Kitten({ name: 'Fluffy' });

  // Use method
  fluffy.speak();

  // Save to DB
  await silent.save();
  await fluffy.save();

  // Fetch from DB
  const kittens = await Kitten.find();
  console.log(kittens);
}

// Run main
main().catch(err => console.log(err));
