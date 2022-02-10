import React from 'react';
import {Alert, Modal, StyleSheet, Text, View} from 'react-native';
import {buttonsStyles} from '../../boutonStyle';
import {ButtonComponent} from '../Inputs/Button';

interface Props {
  content?: string;
  title?: string;
  btn1?: string;
  btn2?: string;
  handleBtn1?: any;
  handleBtn2?: any;
}
const ConfirmationModal = ({
  content,
  title,
  handleBtn1,
  handleBtn2,
  btn1,
  btn2,
}: Props) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}>
      <View style={styles.centeredView}>
        <View style={[styles.modalView]}>
          <Text style={[styles.modalText, styles.bold]}>{title}</Text>
          <Text style={[styles.modalText]}>{content}</Text>
          <View
            style={[
              {
                height: 60,
                paddingRight: 14,
              },
              styles.displayHorizontal,
            ]}>
            {btn2 && (
              <ButtonComponent
                onPress={handleBtn2}
                styleBtnTxt={[buttonsStyles.btnAnnuler, styles.btnStylesTxt]}
                styleBtnOuter={[
                  {
                    maxWidth: 300,
                    flex: 0,
                    alignSelf: 'center',
                  },
                  buttonsStyles.btnAnnulerOuter,
                  styles.btnStyles,
                ]}
                title={btn2}
                type="annuler"
              />
            )}
            {btn1 && (
              <ButtonComponent
                onPress={handleBtn1}
                styleBtnTxt={[buttonsStyles.btnValider, styles.btnStylesTxt]}
                styleBtnOuter={[
                  {
                    maxWidth: 300,
                    flex: 0,
                    alignSelf: 'center',
                  },
                  buttonsStyles.btnValiderOuter,
                  styles.btnStyles,
                ]}
                title={btn1}
                type="valider"
              />
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  colorWhite: {
    color: 'white',
  },
  info: {
    backgroundColor: 'black',
    width: 20,
    borderRadius: 15,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    marginRight: 20,
    marginLeft: 20,
    fontSize: 16,
    fontWeight: 'normal',
    color: 'black',
  },
  bold: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  displayHorizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'center',
    width: '100%',
  },
  btnStyles: {
    paddingHorizontal: 1,
    marginHorizontal: 5,
    minWidth: 1,
  },
  btnStylesTxt: {
    paddingHorizontal: 10,
    margin: 0,
    fontSize: 14,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, .8)',
  },

  webcenteredView: {
    position: 'absolute',
    flex: 1,
    top: 1,
    bottom: 1,
    left: 1,
    right: 1,
    zIndex: 999,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(0, 0, 0, .8)',
  },
  modalView: {
    // margin: 20,
    marginVertical: 20,
    marginHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'flex-start',
    minWidth: 300,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 15,
    textAlign: 'left',
  },
});

export default ConfirmationModal;
