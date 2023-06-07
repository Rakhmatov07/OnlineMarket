require("dotenv/config");
const express = require("express");
const router = require("./routes");
const app = express();
const PORT = process.env.PORT || 7000;

app.use(express.json());
app.use('/api', router);



app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});