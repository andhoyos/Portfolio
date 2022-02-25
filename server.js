const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const { google } = require("googleapis");
const { datacatalog } = require("googleapis/build/src/apis/datacatalog");

dotenv.config();
let initialPath = path.join(__dirname, "public");
const app = express();

app.use(express.static(initialPath));
app.use(express.json());
app.get("/", (req, res) => {
  res.sendFile(path.join(initialPath, "index.html"));
});
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
app.post("/mail", (req, res) => {
  const { firstName, lastName, email, msg } = req.body;

  const clientID = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;
  const refreshToken = process.env.REFRESH_TOKEN;
  const redirectURI = process.env.REDIRECT_URI;
  const mail = process.env.EMAIL;

  const oAuth2Client = new google.auth.OAuth2(
    clientID,
    clientSecret,
    redirectURI
  );
  oAuth2Client.setCredentials({ refresh_token: refreshToken });
  async function sendMail() {
    try {
      const accessToken = await oAuth2Client.getAccessToken();
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAUTH2",
          user: mail,
          clientId: clientID,
          clientSecret: clientSecret,
          refreshToken: refreshToken,
          accessToken: accessToken,
        },
      });

      const mailOptions = {
        from: "email from <anddreshoy@gmail.com>",
        to: "andresfabianhoyos@gmail.com",
        subject: "portfolio",
        text: `First name: ${firstName},
       \nLast name: ${lastName},
       \nEmail: ${email},
       \nMessage: ${msg}`,
      };

      const result = await transporter.sendMail(mailOptions, (err, result) => {
        if (err) {
          console.log(err);
          res.json("Opps, an unexpected error has occurred please, try again.");
        } else {
          res.json("Thank you for contacting me, I will respond soon");
        }
      });
    } catch (err) {
      res.json("Opps, an unexpected error has occurred please, try again.");
      console.log(err);
    }
  }
  sendMail();
});
app.listen(process.env.PORT || 5000, () => {
  console.log("servidor iniciado en puerto 5000");
});
