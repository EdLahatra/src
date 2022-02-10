/**********************************************************
 *
 *             Import from react lib
 *
 **********************************************************/
import React, {useState} from 'react';
import {Button} from 'react-native';
/**********************************************************
 *
 *             Import from source code
 *
 **********************************************************/

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
    return (
      <div className="cnt-loader small">
        <Loading />
      </div>
    );
  }

  return (
    <Button
      onPress={onPressBtn}
      title={props && props.title && props.title.length > 3 ? props.title : ''}
    />
  );
}
