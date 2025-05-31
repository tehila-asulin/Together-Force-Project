import { io } from 'socket.io-client';

const socket = io('http://localhost:9100'); 

export default socket;
