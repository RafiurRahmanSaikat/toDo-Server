const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
//..................................................................Middlewares ..............
app.use(cors());
app.use(express.json());
const uri =
  "mongodb+srv://AllUtilityTools:2EysSRGR7iMt1TDs@cluster0.8thupxf.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
const DbConnect = async () => {
  try {
    await client.connect();
    console.log("Database connected");
  } catch (error) {
    console.error(error);
  }
};
DbConnect();

const TODO = client.db("AllUtilityTools").collection("ToDo");

// ,............................................................................GET REQ Start.............................................
app.get("/mytask", async (req, res) => {
  const { search } = req.query;
  const result = await TODO.find({ userEmail: search }).toArray();
  res.send(result);
  console.log(search,result);
});
// ,............................................................................GET REQ END.............................................

// ,............................................................................POST REQ Start.............................................

// app.post("/addtask", async (req, res) => {
//   try {
//     const result = await [yourDB].insertOne(req.body);

//     if (result.insertedId) {
//       res.send({
//         success: true,
//         message: `Successfully Added  with id ${result.insertedId}`,
//       });
//     } else {
//       res.send({
//         success: false,
//         error: "Couldn't Added",
//       });
//     }
//   } catch (error) {
//     console.log(error.name, error.message);
//     res.send({
//       success: false,
//       error: error.message,
//     });
//   }
// });
// // ,.............................................................................POST REQ End...............................................
// // ............................................................................Patch  Req Start..................................

// app.patch("/updatetask", async (req, res) => {
//   const id = req.query.id;
//   const UpdateData = req.body;
//   const result = await [DB].updateOne(
//     { _id: ObjectId(id) },
//     { $set: req.body }
//   );
//   if (result.matchedCount) {
//     res.send({
//       success: true,
//       message: `successfully updated `,
//     });
//   } else {
//     res.send({
//       success: false,
//       error: "Couldn't update  the product",
//     });
//   }
//   //
// });

// // ..................................................................Patch  Req End................................
// //....... ............................................................DELETE start.....................................

// app.delete("/deletetask", async (req, res) => {
//   const id = req.query.id;
//   const result = await [DB].deleteOne({ _id: ObjectId(id) });
//   if (result.deletedCount) {
//     res.send({
//       success: true,
//       message: `Successfully Deleted `,
//     });
//   } else {
//     res.send({
//       success: true,
//       message: `Failed to Delete`,
//     });
//   }
// });

// // ......................................................................DELETE end......................................

app.listen(port, (req, res) => {
  console.log("OK server is running", port);
});
