const { PORT } = require("./utils/config");
const app = require("./app");
require('dotenv').config();




app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
