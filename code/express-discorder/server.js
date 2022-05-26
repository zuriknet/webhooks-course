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
      <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d747dafd-cb0c-422a-9204-84ef337feec9/d6igsao-91f9caf5-b14a-4906-9812-05db31bec70d.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2Q3NDdkYWZkLWNiMGMtNDIyYS05MjA0LTg0ZWYzMzdmZWVjOVwvZDZpZ3Nhby05MWY5Y2FmNS1iMTRhLTQ5MDYtOTgxMi0wNWRiMzFiZWM3MGQuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.Z3pArIKFp1Hw2JnZyV0BhY_FiMONgdSin9GCFHPKits" alt="MegaMan ThumbsUp" />
    </body>
  </html>
`));

app.post("/github", (req, res) => {
  const content = ":wave: Success!";
  const avatarUrl = "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d747dafd-cb0c-422a-9204-84ef337feec9/d6igsao-91f9caf5-b14a-4906-9812-05db31bec70d.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2Q3NDdkYWZkLWNiMGMtNDIyYS05MjA0LTg0ZWYzMzdmZWVjOVwvZDZpZ3Nhby05MWY5Y2FmNS1iMTRhLTQ5MDYtOTgxMi0wNWRiMzFiZWM3MGQuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.Z3pArIKFp1Hw2JnZyV0BhY_FiMONgdSin9GCFHPKits";
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
