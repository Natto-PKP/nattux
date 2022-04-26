import server from './server';

server.listen(process.env.POST || 8888);
