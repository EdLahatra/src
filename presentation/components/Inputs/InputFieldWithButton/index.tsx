import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import {CONSTANT_DATA} from '../../../../common/utils/constant';
import {thousandSeparator} from '../../../../data/factory';

import styles from '../style';
import localStyle from './styles';
import {TitleLabel} from './TitleLabel';
interface Props {
  label?: string;
  required?: boolean;
  value?: any;
  onChange?: any;
  name?: any;
  error?: any;
  showError?: boolean;
  onBlur?: any;
  onFocus?: any;
  maxLength?: any;
  type?: string;
  isEditable?: boolean;
  onSubmitEditing?: any;
  action: any;
  isScan: boolean;
}
export const InputFieldWithButton = ({
  label,
  required,
  value,
  onChange,
  name,
  error,
  showError,
  onBlur,
  onFocus,
  maxLength,
  type,
  isEditable,
  onSubmitEditing,
  action,
}: Props) => {
  let windowDim = Dimensions.get('window').width;

  const [widthScreen, setWidthScreen] = useState(windowDim);
  const changeWidth = () => {
    setWidthScreen(Dimensions.get('window').width);
  };
  Dimensions.addEventListener('change', changeWidth);

  const handleChange = (name: string, value: string) => {
    let bSend = true;
    let data = value;

    if (type === 'numeric') {
      data = value.replace(/[^0-9]/g, '').toString();
    }
    if (type === 'alphanumeric') {
      data = value.replace(/[^A-Za-z0-9\s]/g, '').toString();
    }

    if (type === 'anneeScolaire') {
      data = value.replace(/[^0-9-]/g, '').toString();
    }
    if (type === 'price') {
      data = value.replace(/[^0-9]/g, '').toString();
      data = thousandSeparator(data, ' ');
    }
    if (type === 'telephone') {
      data = value.replace(/[^0-9]/g, '').toString();
      if (data.length > 10) {
        bSend = false;
      }
    }

    bSend && onChange(name, data, true);
  };

  const [isPasswordShown] = useState(false);
  const [errorToDisplay, setErrorToDisplay] = useState(error);
  const keyboardType = type === 'anneeScolaire' ? 'phone-pad' : 'default';

  useEffect(() => {
    setTimeout(() => {
      setErrorToDisplay(error);
    }, 150);
  }, [error]);

  const handleScan = () => {
    action(false);
  };
  return (
    <View
      style={[
        {
          maxHeight: 120,
          width: '100%',
          flexDirection: 'row',
          flexWrap: 'wrap',
          backgroundColor: 'white',
          position: 'relative',
          zIndex: 1,
        },
        styles.container,
      ]}>
      <TitleLabel label={label} required={required} />

      <TextInput
        style={[
          localStyle.textIput,
          {
            textAlignVertical: 'top',
            maxWidth: widthScreen - 106,
          },
        ]}
        value={value}
        multiline={type === 'textArea'}
        numberOfLines={9}
        onChangeText={(value: any) => handleChange(name, value)}
        onBlur={onBlur}
        onFocus={onFocus}
        maxLength={maxLength}
        editable={isEditable}
        secureTextEntry={type === 'password' && !isPasswordShown}
        keyboardType={
          type === 'numeric' || type === 'telephone' || type === 'price'
            ? 'numeric'
            : keyboardType
        }
        onSubmitEditing={onSubmitEditing}
      />

      <TouchableOpacity
        style={[
          {
            flex: 0,
            backgroundColor: '#fff',
            width: 50,
            height: 50,
            marginLeft: 20,
          },
        ]}
        onPress={handleScan}>
        <Image
          source={require('../../../../ressources/images/scan.png')}
          style={[
            localStyle.itemInputStyle,
            {
              width: 50,
              height: 50,
              alignItems: 'center',
              backgroundColor: '#fff',
            },
          ]}
        />
      </TouchableOpacity>
      {required && showError && errorToDisplay !== '' && (
        <Text style={styles.textError}>{errorToDisplay}</Text>
      )}
    </View>
  );
};

InputFieldWithButton.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  error: PropTypes.string,
  required: PropTypes.bool,
  showError: PropTypes.bool,
  value: PropTypes.any,
  onChange: PropTypes.func,
  action: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  type: PropTypes.string,
  maxLength: PropTypes.number,
  isEditable: PropTypes.bool,
  isScan: PropTypes.bool,
};

InputFieldWithButton.defaultProps = {
  label: '',
  name: '',
  required: false,
  showError: false,
  value: '',
  error: '',
  maxLength: CONSTANT_DATA.MAX_CASUAL_FIELD_LENGTH,
  type: '',
  isEditable: true,
  isScan: false,
};
