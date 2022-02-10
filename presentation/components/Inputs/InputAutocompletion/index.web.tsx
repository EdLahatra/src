import React, {forwardRef, useEffect} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {formsStyles} from '../../../formStyles';
import {COLORS} from '../../../resources/constants';
import {InputField} from '../InputField';

export const InputAutocompletion = forwardRef((props: any, ref: any) => {
  const {
    label,
    required,
    value,
    name,
    onChange,
    error,
    showError,
    data,
    isEditable,
    returnKeyType,
    next,
    onSubmitEditing,
    onLoad,
  } = props;
  let editable = isEditable;
  if (typeof isEditable === 'undefined') {
    editable = true;
  }

  const [list, setList] = React.useState(data);
  const [displayError, setDisplayError] = React.useState(showError);
  useEffect(() => {
    setDisplayError(showError);
  }, [showError]);

  // const [tempList, setTempList] = React.useState(data);
  const [vl, setVl] = React.useState('');
  const [isFocusing, setIsFocusing] = React.useState(false);
  const Item = ({title, value}: any) => (
    <TouchableOpacity
      onPress={() => {
        handleInputFieldClick(name, value, true);
      }}
      style={[
        formsStyles.autoCompleteTxt,
        {backgroundColor: COLORS.Gray6, margin: 4},
      ]}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
  const renderItem = ({item}: any) => (
    <Item title={item.label} value={item.value} />
  );
  const handleInputFieldChange = (
    name: string,
    value: string,
    isFired: boolean,
  ) => {
    const _list: any = list && list.length > 0 ? [...list] : [];
    const _data: any =
      _list.length > 0 &&
      _list.filter(
        item => item.label?.toLowerCase().indexOf(value.toLowerCase()) > -1,
      );
    setVl(value);

    if (_data.length === 0) {
      onChange(name, value, isFired);
    } else {
      onChange(name, value, isFired);
    }
  };
  const handleInputFieldClick = (
    name: string,
    value: string,
    isFired?: boolean,
  ) => {
    onChange(name, value, isFired);
    setIsFocusing(false);
  };

  const onblur = () => {
    setTimeout(() => {
      setIsFocusing(false);
    }, 100);
  };
  const onfocus = () => {
    setIsFocusing(true);
  };

  React.useEffect(() => {
    setList(data);
  }, []);
  React.useEffect(() => {
    setList(data);
  }, [data]);

  useEffect(() => {
    onLoad && onLoad(ref, name);
  }, []);

  return (
    <View style={{maxWidth: 300, marginHorizontal: 4}}>
      <InputField
        label={label}
        required={required}
        value={value}
        name={name}
        isEditable={editable}
        onChange={(name, value, isFired) =>
          handleInputFieldChange(name, value, isFired)
        }
        error={error}
        showError={displayError}
        onBlur={() => {
          editable && onblur();
        }}
        onFocus={() => {
          editable && onfocus();
        }}
        returnKeyType={returnKeyType}
        onSubmitEditing={() => onSubmitEditing && onSubmitEditing(next)}
      />

      {isFocusing && data.length > 0 && (
        <View
          style={[
            {
              flex: 1,
              position: 'absolute',
              marginTop: 100,
              zIndex: 99,
            },
          ]}>
          <FlatList
            style={[formsStyles.autoComplete]}
            data={data
              .filter(
                item =>
                  item.label?.toLowerCase().indexOf(vl.toLowerCase()) > -1,
              )
              .filter((item: any, idx: number) => idx < 10)}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      )}
    </View>
  );
});
