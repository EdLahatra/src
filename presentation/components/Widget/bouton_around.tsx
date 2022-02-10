/**********************************************************
 *
 *             Import from react lib
 *
 **********************************************************/
import React, {useState} from 'react';
import {Text, TouchableOpacity} from 'react-native';
/**********************************************************
 *
 *             Import from source code
 *
 **********************************************************/
import {COLORS} from '../../resources/constants';

import Loading from './loading';

export default function BoutonAround(props: any) {
  const [loading, setLoading] = useState(false);

  const onPressBtn = () => {
    if (props.clickBtn) {
      setLoading(true);
      props.clickBtn(() => setLoading(false));
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <TouchableOpacity
      style={{
        backgroundColor: 'white',
        paddingVertical: 15,
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        borderWidth: 2,
        marginRight: props.marginRight,
        marginTop: 5,
        ...props.style,
      }}
      onPress={onPressBtn}>
      <Text
        style={{
          color: props.color ? props.color : COLORS.bleu_fonce_text,
          fontSize: 15,
          fontWeight: '900',
          fontFamily: 'Roboto-Bold',
          ...props.styleText,
        }}>
        {props && props.title && props.title.length > 3 ? props.title : ''}
      </Text>
    </TouchableOpacity>
  );
}
