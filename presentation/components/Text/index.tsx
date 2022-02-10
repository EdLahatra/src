import React, {useState} from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import {COLORS} from '../../resources/constants';

interface PropTypes {
  text: string;
  containerStyle?: any;
  txtStyle?: any;
  numberOfLines: number;
  showLessButton: boolean;
  readMoreCharacterLimit?: any;
  lineHeight?: any;
}

const TextLessMoreView = (props: PropTypes) => {
  const [textShown, setTextShown] = useState(false); //To show your remaining Text
  const [lengthMore, setLengthMore] = useState(false);

  const toggleNumberOfLines = () => {
    setTextShown(!textShown);
  };

  const onTextLayout = e => {
    const {lines} = e.nativeEvent;
    if (lines && Array.isArray(lines) && lines.length > 0) {
      setLengthMore(lines.length >= props.numberOfLines);
    }
  };

  return (
    <View style={[styles.mainBody, props.containerStyle]}>
      <Text
        onLayout={e => {
          Platform.OS === 'web' &&
            setLengthMore(
              (props.text?.length * 6.5) / e.nativeEvent.layout.width >
                props.numberOfLines,
            );
        }}
        onTextLayout={onTextLayout}
        numberOfLines={textShown ? undefined : props.numberOfLines || 1}
        style={[props.txtStyle || styles.txtStyle]}>
        {props.text || ''}
      </Text>
      {lengthMore ? (
        <Text onPress={toggleNumberOfLines} style={[styles.lessMoreStyle]}>
          {textShown ? 'Lire moins' : 'Lire plus'}
        </Text>
      ) : null}
    </View>
  );
};
const styles = StyleSheet.create({
  mainBody: {
    marginTop: 15,
  },
  txtStyle: {
    fontSize: 14,
    color: 'black',
    flex: 1,
  },
  lessMoreStyle: {
    fontSize: 13,
    color: COLORS.primary,
    marginVertical: 10,
  },
});
export default TextLessMoreView;
