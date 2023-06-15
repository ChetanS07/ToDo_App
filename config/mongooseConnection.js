const mongoose = require('mongoose')

mongoose.connect(
    process.env.DB_URL_ATLAS,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
).then(() => {
    console.log('Database Connection Successful...');
}).catch(err => {
    console.log('Failed to establish Database Connection with error : ');
    console.log(err)
})