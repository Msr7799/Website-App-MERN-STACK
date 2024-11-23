const mongoose = require('mongoose');



module.exports =  async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
            console.log("Connected to MongoDB! ( ^__^ ) ")

    } catch (error) {
        console.log("Connection failed To MongoDB! ( *__* )" , error.message);
        throw error;
    }
}
/*
// Connect to MongoDB
mongoose.connect('mongodb://localhost/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });

// Define schema for User

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
  isActive: { type: Boolean, default: true },
  createdDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now }
});


// Create model for User
const User = mongoose.model('User', userSchema);

// Export User model
module.exports = User */
