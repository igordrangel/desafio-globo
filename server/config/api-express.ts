import { Express } from "express";
import { rootPathApp } from "../index";

const express = require("express");
const consign = require("consign");
const bodyParser = require("body-parser");
const cors = require('cors');

module.exports = () => {
	const api: Express = express();
	api.use(cors({origin: "*"}));
	api.use(bodyParser.json());
	consign({cwd: rootPathApp, extensions: ['.js']}).include('/controllers').into(api);
	consign({cwd: rootPathApp, extensions: ['.js']}).include('/middleware/authentication.js').into(api);
	return api;
};
