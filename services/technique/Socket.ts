import {io, Socket} from 'socket.io-client';

import url from '../../data/config';
import store from '../redux/store';

const socketEvents = {
  connect: 'connect',
  connectError: 'connect_error',
};

class SocketST {
  private static socket: Socket;
  /**
   * @summary Connecte l'application front au serveur SocketST.socket
   * @returns {Promise}
   */
  connectToServer = (): Promise<Socket> =>
    new Promise((resolve, reject) => {
      const {user} = store.getState();
      if (SocketST.socket && SocketST.socket.connected) {
        resolve(SocketST.socket);
        return;
      }
      if (user?.data?.accessToken) {
        const {accessToken: token} = user.data;
        SocketST.socket = io(url.baseURL, {query: {token}});
        SocketST.socket.on(socketEvents.connect, () => {
          resolve(SocketST.socket);
        });
        SocketST.socket.on(socketEvents.connectError, () =>
          reject({message: 'Impossible de se connecter au serveur'}),
        );
      } else {
        reject({message: "Veuillez d'abord vous authentifier"});
      }
    });
}

export const socketST = new SocketST();
