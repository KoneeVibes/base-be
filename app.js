const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const credentials = require("./middleware/credentials");
const cookieParser = require("cookie-parser");
const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./doc/swagger');

// middleware
app.use(credentials);
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// docs
app.disable('x-powered-by');
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

//admin api routes would go under here:
app.use("/admin/user", require("./route/inbound/user"));
app.use("/admin/project", require("./route/inbound/project"));

//user api routes would go under here:
app.use("/user/auth", require("./route/inbound/authentication"));
app.use("/user/usermanagement", require("./middleware/authorization"), require("./route/inbound/user"));
app.use("/user/gallery", require("./middleware/authorization"), require("./route/inbound/gallery"));
app.use("/user/blog", require("./middleware/authorization"), require("./route/inbound/blog"));
app.use("/user/:userId/project", require("./middleware/authorization"), require("./route/inbound/project"));

// outbound routes would go under here:
app.use("/public/gallery", require("./middleware/authentication"), require("./route/outbound/gallery"));
app.use("/public/blog", require("./middleware/authentication"), require("./route/outbound/blog"));

module.exports = app;
