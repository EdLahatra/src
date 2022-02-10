import React, {useEffect} from 'react';
import {AppRegistry, Platform} from 'react-native';
import {Navigation} from './navigation';

import {socketST} from '../services/technique/Socket';

export function App() {
  useEffect(() => {
    const initSocket = async () => {
      try {
        const socket = await socketST.connectToServer();
        socket.on('orange_money_callback', (data: any) => {
          const {
            data: {statut},
          } = data;
          if (statut === 'Succès') {
            // showInfoMessage('Paiement effectué avec succés. ');
          } else if (statut === 'Échoué') {
            // showErrorMessage(
            //   'Une erreur pendant la transaction. Veuillez vérifier votre solde et votre code.',
            // );
          }
        });
      } catch (error) {
        //
      }
    };

    initSocket();
  }, []);

  return <Navigation />;
}

AppRegistry.registerComponent('example', () => App);
if (Platform.OS === 'web') {
  AppRegistry.runApplication('example', {
    rootTag: document.getElementById('root'),
  });
}
