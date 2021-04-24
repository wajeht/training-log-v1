require('dotenv').config();
const app = require('../app.js');
const PORT = process.env.PORT || 6969;

app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    }

    console.log(`Server started on port ${PORT}!`);
});
