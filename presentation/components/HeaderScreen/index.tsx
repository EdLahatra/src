import React, {useState} from 'react';

import {View, Text, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {connect} from 'react-redux';

import mapDispatchToProps from '../../../services/redux/mapDispatchToProps';
import mapStateToProps from '../../../services/redux/mapStateToProps';
import {styles} from './styles';

import {icons, toUri, images} from '../../resources/constants';
import {useWidthHeight} from '../../../hooks/dimension';

import MenuModal from '../MenuModal';
import {infoInitial} from '../../resources/constants/initial';

type Props = {
  title: string;
  utilisateur: any;
  signoutUtilisateur: any;
  parametres: any;
  initialScreenUsers: any;
};

export function FHeaderScreen(props: Props) {
  const {width, isWeb} = useWidthHeight();

  const {navigate, goBack} = useNavigation<any>();

  const [showMenu, setShowMenu] = useState(false);

  const {
    utilisateur,
    title,
    signoutUtilisateur,
    parametres,
    initialScreenUsers,
  } = props;

  const {name, logo} = parametres?.info || infoInitial;

  return (
    <View style={[styles.containers, isWeb ? {} : {height: 55}]}>
      <View style={[styles.v1, {width: width > 1140 ? 1100 : '100%'}]}>
        <View
          style={[
            styles.vLeft,
            isWeb
              ? {flex: 1}
              : {
                  height: 55,
                  alignItems: 'center',
                },
          ]}>
          {isWeb ? (
            <TouchableOpacity onPress={() => navigate('HomeScreen')}>
              <View style={styles.vlogo}>
                <Image
                  source={{uri: logo}}
                  resizeMode="contain"
                  style={{
                    width: !isWeb ? 55 : 70,
                    height: !isWeb ? 55 : 70,
                  }}
                />
                {isWeb && (
                  <View style={styles.v1logo}>
                    <Text style={styles.tHeader}>{name}</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => goBack()}>
              <View
                style={{
                  alignItems: 'center',
                  alignSelf: 'center',
                  marginLeft: 10,
                }}>
                <Image
                  source={toUri(icons.back)}
                  resizeMode="contain"
                  style={{
                    width: 40,
                    height: 30,
                    tintColor: 'white',
                  }}
                />
              </View>
            </TouchableOpacity>
          )}
        </View>
        {!isWeb && (
          <View
            style={{
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <Text style={{color: 'white', fontSize: 18}}>
              {title || 'Home'}
            </Text>
          </View>
        )}
        {!isWeb && (
          <View style={{marginRight: 10}}>
            {utilisateur && utilisateur?.accessToken ? (
              <TouchableOpacity onPress={() => setShowMenu(true)}>
                <Image
                  source={toUri(images.picture)}
                  resizeMode="contain"
                  style={{
                    width: 55,
                    height: 55,
                    borderRadius: 100,
                  }}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  initialScreenUsers(true);
                  navigate('LoginScreen');
                }}>
                <Image
                  source={toUri(icons.help)}
                  resizeMode="contain"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: 'transparent',
                    tintColor: 'white',
                  }}
                />
              </TouchableOpacity>
            )}
          </View>
        )}
        {isWeb && (
          <View style={styles.vHeaderLink}>
            <View style={styles.currency}>
              <TouchableOpacity onPress={() => navigate('CategorieScreen')}>
                <Text style={styles.tHeader}>Les offres</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.currency}>
              <TouchableOpacity onPress={() => navigate('ExplorerScreen')}>
                <Text style={styles.tHeader}>Explorer</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.currency}>
              <Image
                source={icons.langue?.default}
                resizeMode="contain"
                style={{
                  width: 14,
                  height: 14,
                  // marginBottom: 4,
                  marginRight: 6,
                  alignSelf: 'center',
                }}
              />
              <Text style={styles.tHeaderLogo}>Français</Text>
            </View>
            <View style={[styles.currency, {flex: 1, alignSelf: 'center'}]}>
              <Image
                source={icons.currency?.default}
                resizeMode="contain"
                style={{
                  width: 14,
                  height: 14,
                  // marginBottom: 4,
                  marginRight: 6,
                }}
              />
              <Text style={styles.tHeaderLogo}>USD</Text>
            </View>
          </View>
        )}
        {isWeb &&
          (utilisateur && utilisateur?.accessToken ? (
            <View style={{marginRight: 10}}>
              <TouchableOpacity onPress={() => setShowMenu(true)}>
                <Image
                  source={toUri(images.picture)}
                  resizeMode="contain"
                  style={{
                    width: 55,
                    height: 55,
                    borderRadius: 50,
                  }}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.v2}>
              <View style={styles.currency}>
                <TouchableOpacity onPress={() => navigate('LoginScreen')}>
                  <Text style={styles.tHeader}>Connexion</Text>
                </TouchableOpacity>
              </View>
              {/* <View style={styles.currency}>
              <Text style={styles.tHeader}>Créer un compte</Text>
            </View> */}
            </View>
          ))}
      </View>
      {showMenu && (
        <MenuModal
          showModal={showMenu}
          hideModal={() => setShowMenu(false)}
          moveToProfile={() => {
            navigate('Profil');
            setShowMenu(false);
          }}
          deconnecter={() => {
            signoutUtilisateur({
              data: null,
              utilisateur: null,
              accessToken: null,
            });
            navigate('LoginScreen');
            setShowMenu(false);
          }}
        />
      )}
    </View>
  );
}

export const HeaderScreen: any = connect(
  mapStateToProps,
  mapDispatchToProps,
)(FHeaderScreen);
