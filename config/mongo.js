const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const dbConnect = () => {
    const DB_URI = process.env.DB_URI;
    // mongoose.connect(DB_URI, {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    // }, (err) => {
    //     if (err) {
    //         console.log("Error connection");
    //     } else {
    //         console.log('Database connected successfully');
    //     }
    // });
    main().catch(err => console.log(err));
    async function main() {
        await mongoose.connect(DB_URI).then(() => {
            console.log('Database connected successfully');
        }).catch(err => {
            console.log("Error connection");
        });
    }
}

module.exports = dbConnect;