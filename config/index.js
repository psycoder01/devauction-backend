const dotenv = require('dotenv');

//Enviroment Config
dotenv.config();

const variables = {
  DB_URI : process.env.DB_URI,
  TOKEN : process.env.TOKEN,
  PORT : process.env.PORT,
  IMG_STORE:process.env.IMG_STORE
}

module.exports =  variables;
