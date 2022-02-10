import React from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Platform,
} from 'react-native';

import {toUri, images} from '../../resources/constants';

interface Props {
  content?: string;
  title?: string;
  btn1?: string;
  btn2?: string;
  handleBtn1?: any;
  handleBtn2?: any;
  showModal: boolean;
  hideModal?: any;
  moveToProfile?: any;
  deconnecter?: any;
}

const MenuModal = ({
  showModal,
  hideModal,
  moveToProfile,
  deconnecter,
}: Props) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={showModal}
      onRequestClose={hideModal}>
      <TouchableWithoutFeedback onPress={hideModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity onPress={moveToProfile} style={styles.menu}>
              <Image style={styles.iconView} source={toUri(images.u_user)} />
              <Text style={styles.menuCard}>Mon Profil</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={deconnecter} style={styles.menu}>
              <Image
                style={styles.iconView}
                source={toUri(images.power_settings_new)}
              />
              <Text style={styles.menuCard}>Se déconnecter</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
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
    // width: '100%',
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
    paddingHorizontal: 10,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    backgroundColor: 'rgba(0, 0, 0, 0)',
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
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  modalView: {
    paddingHorizontal: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    position: 'absolute',
    // top: 66,
    top: Platform.OS === 'web' ? 66 : 50,
    right: 16,
    height: 128,
    width: 212,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: 'rgba(0,0,0,.8)',
    shadowOffset: {
      width: 1,
      height: 6,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 6,
    zIndex: 10,
  },
  modalText: {
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 15,
    textAlign: 'left',
  },
  menuCard: {
    fontSize: 16,
    lineHeight: 40,
    color: '#4f4f4f',
    height: 40,
  },
  iconView: {
    marginRight: 15,
    width: 24,
    height: 24,
  },
  menu: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 8,
    alignItems: 'center',
  },
});

export default MenuModal;
