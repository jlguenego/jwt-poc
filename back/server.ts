import express from "express";
import serveIndex from "serve-index";

const app = express();
const port = 3000;
const www = ".";

app.get("/ws/now", (req, res) => res.json({ date: new Date() }));

app.use(express.static(www));
app.use(serveIndex(www, { icons: true }));

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
