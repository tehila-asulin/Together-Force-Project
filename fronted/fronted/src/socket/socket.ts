import { io } from 'socket.io-client';

const socket = io('http://localhost:9100'); // או הכתובת המתאימה שלך

export default socket;
