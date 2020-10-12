const mongoose = require("mongoose");
const fs = require("fs");
const file = "./config/conf.json"
let MONGOURI = null


const InitiateMongoServer = async () => {

  if (is_file(file)) {
    let jsonData = JSON.parse(fs.readFileSync(file, 'utf-8'))
    MONGOURI = `mongodb+srv://${jsonData.username}:${jsonData.password}@${jsonData.db_link}/${jsonData.db}`;
  }

  try {
    await mongoose.connect(MONGOURI, {
      useNewUrlParser: true
    });
    console.log("Connected to DB !!");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

function is_file(pathToFile) {
  try {
    var stats = fs.statSync(pathToFile);
    if (stats.isFile()) {
      //file exists
      return true;
    }
  } catch(err) {
    console.error(err)
    throw new Error("Please fill in the configuration file as shown in the example ./conf.json.example");
  }
}

module.exports = InitiateMongoServer;
