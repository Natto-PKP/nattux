import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const server = express();

server.use(express.urlencoded({ extended: true }));
server.use(cors());

export default server;
