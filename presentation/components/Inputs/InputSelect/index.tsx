import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import {Picker, Text, View} from 'react-native';
import {formsStyles} from '../../../formStyles';
import styles from '../style';
import {TitleLabel} from './TitleLabel';

export const InputSelect = (props: any) => {
  const {
    label,
    required,
    value,
    onChange,
    name,
    error,
    showError,
    isEditable,
    data,
  } = props;

  const [selectedValue, setSelectedValue] = useState(value);
  const handleChange = (name: string, value: string) => {
    let bSend = true;
    const _data = data.find(elt => elt.value === value);
    console.log(_data);

    setSelectedValue(value);
    bSend && onChange(name, value, true);
  };

  const [errorToDisplay, setErrorToDisplay] = useState(error);
  const dataOptions = data.map((element: any, index: number) => {
    if (!element) {
      return <Picker.Item key={index} value={''} label={''} />;
    }
    return (
      <Picker.Item key={index} value={element.value} label={element.label} />
    );
  });

  useEffect(() => {
    setTimeout(() => {
      setErrorToDisplay(error);
    }, 150);
  }, [error]);
  return (
    <View style={styles.containerSelect}>
      <TitleLabel label={label} required={required} />
      <View
        style={[
          formsStyles.itemSelectStyle,
          required && showError && error !== '' && formsStyles.inputError,
          {
            backgroundColor: isEditable
              ? '#ffffff'
              : 'rgba(240, 244, 248, 0.87)',
          },
        ]}>
        <Picker
          style={formsStyles.itemSelectPickerStyle}
          itemStyle={{backgroundColor: 'none', height: 44}}
          selectedValue={selectedValue.value}
          enabled={isEditable}
          onValueChange={itemValue => {
            handleChange(name, itemValue);
          }}>
          {dataOptions}
        </Picker>
      </View>
      {required && showError && errorToDisplay !== '' && (
        <Text style={styles.textError}>{errorToDisplay}</Text>
      )}
    </View>
  );
};

InputSelect.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  error: PropTypes.string,
  required: PropTypes.bool,
  showError: PropTypes.bool,
  value: PropTypes.any,
  onChange: PropTypes.func,
  maxLength: PropTypes.number,
  isEditable: PropTypes.bool,
  data: PropTypes.any,
};

InputSelect.defaultProps = {
  data: [],
  label: '',
  name: '',
  required: false,
  showError: false,
  value: '',
  error: '',
  maxLength: 500,
  type: '',
  isEditable: true,
};
