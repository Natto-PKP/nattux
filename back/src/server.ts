import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

import routers from './routers';

dotenv.config();

const server = express();

server.use(express.urlencoded({ extended: true }));
server.use(cors());

server.use(express.static(path.join(__dirname, '../static')));
server.use(routers);

export default server;
