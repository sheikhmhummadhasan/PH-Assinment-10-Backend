const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
const port = process.env.PORT;

const logger = (req, res, next) => {
  console.log("loger midelwere loger log", req.params);
  next();
};

app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const db = client.db("hairloop");

const run = async () => {
  try {
    // TODO:when backend is deployment this line going to commet
    await client.connect();
    // TODO:when backend is deployment this line going to commet
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment!!!!");

    const verifyToken = async (req, res, next) => {
      const authheader = req.headers.authorization;
      if (!authheader) {
        return res.status(401).send({ message: "unauthorization access" });
      }

      const token = authheader?.split(" ")[1];
      if (!token) {
        return res.status(401).send({ message: "unauthorized access" });
      }

      const query = { token: token };
      const session = await sessionColl.findOne(query);
      const userId = session.userId;
      const userQuiry = {
        _id: userId,
      };
      const User = await UserColl.findOne(userQuiry);
      console.log(User);
      req.user = User;
      next();
    };

  } finally {
    // await client.close()
  }
};
run().catch(console.dre);

app.get("/", (req, res) => {
  res.send("Surver is Runing Fine!!");
});

app.listen(port, () => {
  console.log(`Backend is Fine!! with this port ${port}`);
});
