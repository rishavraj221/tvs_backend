const jwt = require("jsonwebtoken");

const employees = [
  {
    id: "emp22a001",
    name: "Ram Kishan",
    role: "employee",
    username: "ramkishan",
    password: "r@mkish@n",
  },
];

const admin = {
  id: "adm22a001",
  name: "Sitaram Tiwari",
  role: "admin",
  username: "sitaram",
  password: "sit@r@m",
};

const giveToken = (event) => {
  let token;

  if (event["role"] === "admin") {
    if (
      event["username"] === admin["username"] &&
      event["password"] === admin["password"]
    ) {
      const { password, ...payload } = admin;
      token = jwt.sign(payload, "tvs_winner");
    }
  }

  if (event["role"] === "emp") {
    if (
      event["username"] === employees[0]["username"] &&
      event["password"] === employees[0]["password"]
    ) {
      const { password, ...payload } = employees[0];
      token = jwt.sign(payload, "tvs_winner");
    }
  }

  if (!token)
    return {
      statusCode: 401,
      body: "Invalid credentials!",
    };

  const response = {
    statusCode: 200,
    body: JSON.stringify(token),
  };
  return response;
};

module.exports.giveToken = giveToken;
