const express = require("express");
const bodyParser = require("body-parser");
//const morgan = require("morgan");

const { Firestore } = require("@google-cloud/firestore");
const firestore = new Firestore();

const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.set("case sensitive routing", true);
app.use(bodyParser.json());

//app.use(morgan("dev"));

app.get("/:id", async (req, res) => {
  const hadithSnap = await firestore
    .collection("hadith_bukhari")
    .doc(req.params.id)
    .get();

  if (hadithSnap.exists) {
    res.status(200).json({
      id: req.params.id,
      result: hadithSnap.data(),
    });
  } else {
    res.status(200).json({
      message: "Hadith not found",
    });
  }
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log("Press Ctrl+C to quit.");
});
// [END gae_node_request_example]

module.exports = app;
