import React from 'react';
import {Image} from 'react-native';

export default (_props: any) => {
  return (
    <div className="cntLoader">
      <span className="spinner loading">
        <Image
          source={require('../../resources/images/drawable/logoo_mazto.png')}
          style={{
            width: '100%',
            height: '100%',
            resizeMode: 'contain',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        />
      </span>
    </div>
  );
};
