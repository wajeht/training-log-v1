const app = require('../app.js');
const config = require('../config/config.js');
const PORT = config.port.serverPort || 6969;

app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    }

    console.log(`Server started on port ${PORT}!`);
});
