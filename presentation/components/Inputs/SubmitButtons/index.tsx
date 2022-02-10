import PropTypes from 'prop-types';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {buttonsStyles} from '../../../../presentation/boutonStyle';
import {ButtonComponent} from '../Button';
import Label from '../Label';
import localStyles from './styles';
export const SubmitButtons = (props: any) => {
  const {cancelAction, submitAction, cancelTitle, submitTitle, underlineType} =
    props;
  return (
    <View style={[buttonsStyles.displayCenterSubmit]}>
      <View style={localStyles.displayHorizontalSubmit}>
        {!underlineType && (
          <ButtonComponent
            onPress={() => cancelAction()}
            styleBtnTxt={buttonsStyles.btnAnnuler}
            styleBtnOuter={buttonsStyles.btnAnnulerOuter}
            title={cancelTitle}
            type="annuler"
          />
        )}
        {underlineType && (
          <TouchableOpacity onPress={() => cancelAction()}>
            <Label title={cancelTitle} type="link" />
          </TouchableOpacity>
        )}
        {submitTitle !== '' && (
          <ButtonComponent
            onPress={submitAction}
            styleBtnTxt={buttonsStyles.btnValider}
            styleBtnOuter={buttonsStyles.btnValiderOuter}
            title={submitTitle}
            type="valider"
          />
        )}
      </View>
    </View>
  );
};
SubmitButtons.propTypes = {
  cancelAction: PropTypes.func,
  submitAction: PropTypes.func,
  cancelTitle: PropTypes.string,
  submitTitle: PropTypes.string,
  underlineType: PropTypes.bool,
};

SubmitButtons.defaultProps = {
  cancelTitle: 'Annuler',
  submitTitle: '',
};
