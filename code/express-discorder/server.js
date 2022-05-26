require("dotenv").config();
const express = require("express");
const axios = require("axios").default;

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => res.send(`
  <html>
    <head><title>Success!</title></head>
    <body>
      <h1>Success!</h1>
      <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.deviantart.com%2Fcyruscloud%2Fart%2FMegaMan-X-Revived-393813312&psig=AOvVaw3x5Oogql2w2Uoxxtlr5585&ust=1653665123905000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCLjbree8_fcCFQAAAAAdAAAAABAT" alt="MegaMan ThumbsUp" />
    </body>
  </html>
`));

app.post("/github", (req, res) => {
  const content = ":wave: Success!";
  const avatarUrl = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.deviantart.com%2Fcyruscloud%2Fart%2FMegaMan-X-Revived-393813312&psig=AOvVaw3x5Oogql2w2Uoxxtlr5585&ust=1653665123905000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCLjbree8_fcCFQAAAAAdAAAAABAT";
  axios
    .post(process.env.DISCORD_WEBHOOK_URL, {
      content: content,
      embeds: [
        {
          image: {
            url: avatarUrl,
          },
        },
      ],
    })
    .then((discordResponse) => {
      console.log("Success!");
      res.status(204).send();
    })
    .catch((err) => console.error(`Error sending to Discord: ${err}`));
});

app.use((error, req, res, next) => {
  res.status(500)
  res.send({error: error})
  console.error(error.stack)
  next(error)
})

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
