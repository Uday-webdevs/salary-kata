const app = require("./app");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

const isTest = process.env.NODE_ENV === "test";

app.listen(PORT, () => {
  if (isTest) {
    console.log(`Server is runnint on port ${PORT}`);
  }
});
