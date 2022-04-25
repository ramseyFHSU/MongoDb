const mongoose = require("mongoose");
const DATABASE_URI =
  "mongodb+srv://<ramseyfhsu>:<nlkqKjFxRD3QeAtD>@cluster0.alcra.mongodb.net/CompanyDB?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    await mongoose.connect(DATABASE_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = connectDB;
