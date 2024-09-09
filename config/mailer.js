const nodemailer = require("nodemailer");

const trasporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "henilpatel1508@gmail.com",
    pass: "ukjl zmpc gvlp icjr",
  },
});

console.log(trasporter);
async function sendData(to, subject, html) {
  const mailFormat = {
    from: "henilpatel1508@gmail.com",
    to: to,
    subject: subject,
    html: html,
  };
  await trasporter.sendMail(mailFormat, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Sent mail");
    }
  });
}
module.exports = sendData;
