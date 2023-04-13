const ENGINE_DB = process.env.ENGINE_DB;

const getProperties = async (req, res) => {
   const data ={
    nosql:{
        id:'_id'
    },
    mysql:{
        id:'id'
    }
   }
   return data[ENGINE_DB];
}

 
module.exports = getProperties