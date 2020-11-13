import express, { RequestHandler } from "express";
import serveIndex from "serve-index";
import cookieParser from "cookie-parser";
import cors from "cors";
import jwt from "jsonwebtoken";

declare module "http" {
  interface IncomingMessage {
    jwt?: Object;
  }
}

const app = express();
const port = 3000;
const www = ".";
const jwtSecret = "this is a secret key. Keep it secret.";

const users = [{ login: "jlouis", password: "toto", role: "admin" }];

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.post("/ws/login", (req, res) => {
  const { login, password } = req.body;
  const user = users.find((u) => u.login === login && u.password === password);
  if (!user) {
    res.status(401).end();
    return;
  }
  const jwtToken = jwt.sign({ login: user.login, role: user.role }, jwtSecret);
  res.cookie("jwt", jwtToken, { maxAge: 3600 * 24 * 365, httpOnly: true });
  res.status(204).end();
});

app.post("/ws/logout", (req, res) => {
  res.cookie("jwt", "", { expires: new Date(0) });
  res.status(204).end();
});

const jwtMw = (secret: string): RequestHandler => (req, res, next) => {
  try {
    const jwtDecoded = jwt.verify(req.cookies.jwt, secret);
    console.log("jwtDecoded: ", jwtDecoded);
    // try {
    //   authorizeCheck(req, jwtDecoded);
    // } catch (error) {
    //   res.status(403).end();
    // }
    req.jwt = jwtDecoded;
    next();
  } catch (error) {
    res.status(401).end();
  }
};

app.get("/ws/secret", jwtMw(jwtSecret), (req, res) => {
  res.json({
    secret: "this is my nice secret",
    login: req.jwt["login"],
  });
});

app.use(express.static(www));
app.use(serveIndex(www, { icons: true }));

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
