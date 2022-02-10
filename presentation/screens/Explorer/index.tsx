// import React, {useState} from 'react';
// import {View, RefreshControl, Text} from 'react-native';

// import {PageContainer} from '../../layout/PageContainer';

// import {connect} from 'react-redux';
// import mapDispatchToProps from '../../../services/redux/mapDispatchToProps';
// import mapStateToProps from '../../../services/redux/mapStateToProps';

// // COLORS, FONTS, icons
// // import {images, icons} from '../../resources/constants';
// import {styles} from './styles';

// const Explorer = ({}) => {
//   const [refreshing, setRefreshing] = useState(false);
//   const init = () => {
//     setRefreshing(true);
//   };

//   return (
//     <View>
//       <PageContainer
//         title={'Explorer'}
//         refresh={<RefreshControl refreshing={refreshing} onRefresh={init} />}>
//         <View style={styles.containers}>
//           <View>
//             <Text>dfddf</Text>
//           </View>
//         </View>
//       </PageContainer>
//     </View>
//   );
// };

// export const ExplorerScreen: any = connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )(Explorer);

const ChatAPI = {
  subscribeToFriendStatus: (id: any, cb) => {
    console.log({id});
    cb({isOnline: true});
  },
  unsubscribeFromFriendStatus: (id: any, cb) => {
    console.log({id});
    cb({isOnline: false});
  },
};

import React, {useState, useEffect} from 'react';
import {View, RefreshControl, Text, TouchableOpacity} from 'react-native';

import {PageContainer} from '../../layout/PageContainer';
import {styles} from './styles';

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  function handleStatusChange(status) {
    console.log(status);

    setIsOnline(status.isOnline);
  }

  function init() {
    setRefreshing(true);
  }

  useEffect(() => {
    // Mettre à jour le titre du document en utilisant l'API du navigateur
    console.log(props);
  });

  useEffect(() => {
    ChatAPI.subscribeToFriendStatus('props.friend.id', handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(
        'props.friend.id',
        handleStatusChange,
      );
    };
  });

  if (isOnline === null) {
    return 'Chargement...';
  }

  console.log(props);

  return (
    <View>
      <PageContainer
        title={'Explorer'}
        refresh={<RefreshControl refreshing={refreshing} onRefresh={init} />}>
        <View style={styles.containers}>
          <TouchableOpacity>
            <Text>{isOnline ? 'En ligne' : 'Hors-ligne'}</Text>
          </TouchableOpacity>
        </View>
      </PageContainer>
    </View>
  );
}

export const ExplorerScreen = props => FriendStatus(props);
