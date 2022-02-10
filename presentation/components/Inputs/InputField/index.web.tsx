import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import {
  Image,
  Platform,
  // ReturnKeyTypeOptions,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {thousandSeparator} from '../../../../data/factory';
import {formsStyles} from '../../../formStyles';
import styles from '../style';
import localStyle from './styles';
import {TitleLabel} from './TitleLabel';
import {CONSTANT_DATA} from '../../../../common/utils/constant';
import {useDimensions} from '../../../utils/dimensions.hook';

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
  placeholder?: any;
  style?: object;
  styleChildDiv?: object;
  returnKeyType?: any;
  backgroundColor?: string;
  ref?: any;
  isAccueil?: boolean;
  autoFocus?: boolean;
  textTransform?: 'none' | 'sentences' | 'words' | 'characters';
}
export const InputField = ({
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
  placeholder,
  style,
  styleChildDiv,
  returnKeyType,
  backgroundColor,

  isAccueil,
  autoFocus,
  textTransform = 'none',
}: Props) => {
  const handleChange = (name: string, value: string) => {
    let bSend = true;
    let data = value;

    if (type === 'numeric') {
      data = value.replace(/[^0-9]/g, '').toString();
    }
    if (type === 'numericFloat') {
      data = value.replace(/[^0-9.]/g, '').toString();
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

    switch (textTransform) {
      case 'none': {
        bSend && onChange(name, data, true);
        break;
      }
      case 'words': {
        bSend &&
          onChange(name, data.split(' ').map(capitalize).join(' '), true);
        break;
      }
      case 'characters': {
        bSend && onChange(name, data.toUpperCase(), true);
        break;
      }
    }
  };

  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [errorToDisplay, setErrorToDisplay] = useState(error);
  const keyboardType = type === 'anneeScolaire' ? 'phone-pad' : 'default';
  const [screenWidth] = useDimensions();

  useEffect(() => {
    setTimeout(() => {
      setErrorToDisplay(error);
    }, 150);
  }, [error]);
  return (
    <View
      style={[
        {maxHeight: screenWidth > 767 ? 100 : undefined},
        styles.container,
      ]}>
      {label && !isAccueil && <TitleLabel label={label} required={required} />}
      {label && isAccueil && (
        <Text
          style={{
            fontFamily: 'Poppins',
            fontWeight: '500',
            fontSize: 15,
            lineHeight: 20,
            color: '#FFFFFF',
            marginBottom: 13,
          }}>
          {label}
        </Text>
      )}
      <View
        style={[
          type === 'textArea'
            ? formsStyles.itemInputStyleTextArea
            : formsStyles.itemInputStyle,
          /*required && */ showError && error !== '' && formsStyles.inputError,
          {
            backgroundColor: isEditable
              ? backgroundColor || '#ffffff'
              : 'rgba(240, 244, 248, 0.87)',
          },
          styleChildDiv,
        ]}>
        <TextInput
          autoFocus={autoFocus}
          style={[localStyle.textIput, {textAlignVertical: 'top'}, style]}
          value={value}
          multiline={type === 'textArea'}
          numberOfLines={9}
          onChangeText={(value: any) => {
            handleChange(name, value);
          }}
          onBlur={onBlur}
          onFocus={onFocus}
          maxLength={maxLength}
          placeholder={placeholder ? placeholder : ''}
          editable={isEditable}
          secureTextEntry={type === 'password' && !isPasswordShown}
          returnKeyType={'next' || returnKeyType}
          keyboardType={
            type === 'numeric' || type === 'telephone' || type === 'price'
              ? 'numeric'
              : keyboardType
          }
          //onSubmitEditing={onSubmitEditing}
          //blurOnSubmit={false}
        />

        {type === 'password' && (
          <TouchableOpacity
            onPress={() => {
              setIsPasswordShown(!isPasswordShown);
            }}>
            <View
              style={{
                width: 60,
                height: 50,
              }}>
              {isPasswordShown && (
                <Image
                  style={[formsStyles.iconEye]}
                  source={require('../../../resources/assets/images/visibility.png')}
                />
              )}
              {!isPasswordShown && (
                <Image
                  style={[formsStyles.iconEye]}
                  // source={require('../../../../ressources/images/Shownot.png')}
                  source={require('../../../resources/assets/images/novisibility.png')}
                />
              )}
            </View>
          </TouchableOpacity>
        )}
      </View>
      <View style={{height: 30}}>
        {
          /*required &&*/ showError &&
            errorToDisplay !== '' &&
            Platform.select({
              web: (
                <Text style={styles.textError}>
                  <div className=".exo2">{errorToDisplay}</div>
                </Text>
              ),
              native: <Text style={styles.textError}>{errorToDisplay}</Text>,
            })
        }
      </View>
    </View>
  );
};

InputField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  error: PropTypes.string,
  required: PropTypes.bool,
  showError: PropTypes.bool,
  value: PropTypes.any,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  type: PropTypes.string,
  maxLength: PropTypes.number,
  isEditable: PropTypes.bool,
};

InputField.defaultProps = {
  label: '',
  name: '',
  required: false,
  showError: false,
  value: '',
  error: '',
  maxLength: CONSTANT_DATA.MAX_CASUAL_FIELD_LENGTH,
  type: '',
  isEditable: true,
};
