import React from 'react';
import {Text, View} from 'react-native';
import {formsStyles} from '../../../formStyles';
import PropTypes from 'prop-types';
export const TitleLabel = (props: any) => {
  const {label, required} = props;
  return (
    <View
      style={{
        minHeight: 32,
        marginVertical: 6,
        // backgroundColor: 'red',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
      {label && (
        <Text style={[formsStyles.labelStyle]}>
          {label} {required && <Text>*</Text>} :
        </Text>
      )}
    </View>
  );
};

TitleLabel.prototype = {
  label: PropTypes.string,
  required: PropTypes.bool,
};
TitleLabel.defaultProps = {
  label: '',
  required: false,
};
