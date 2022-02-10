import React, {useEffect, useState} from 'react';
import {
  View,
  RefreshControl,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';

import {Aide} from './Aide';
import {AppelOffres} from './AppelOffres';
import {Demandes} from './Demandes';
import {DevenirPrestataire} from './DevenirPrestataire';
import {Favoris} from './Favoris';
import {Informations} from './Informations';
import {InviterDesAmins} from './InviterDesAmins';
import {MesInterets} from './MesInterets';
import {My} from './My';
import {OnelineStatut} from './OnelineStatut';
import {Parametres} from './Parametres';
import {PageContainer} from '../../layout/PageContainer';
import {Item, ItemList} from '../../components/Profil/item';

import mapDispatchToProps from '../../../services/redux/mapDispatchToProps';
import mapStateToProps from '../../../services/redux/mapStateToProps';

import {images, COLORS, FONTS, icons, toUri} from '../../resources/constants';
import {useWidthHeight} from '../../../hooks/dimension';

import {styles} from './styles';

export const Profil = ({navigation, signoutUtilisateur}) => {
  const [refreshing, setRefreshing] = useState(false);

  const {width, isMobile} = useWidthHeight();

  useEffect(() => {}, []);

  const init = () => {
    setRefreshing(true);
  };

  const toScreen = (key: number) => {
    switch (key) {
      case 0:
        return <Aide />;
      case 0:
        return <AppelOffres />;
      case 0:
        return <Demandes />;
      case 0:
        return <DevenirPrestataire />;
      case 0:
        return <Favoris />;
      case 0:
        return <Informations />;
      case 0:
        return <InviterDesAmins />;
      case 0:
        return <MesInterets />;
      case 0:
        return <My />;
      case 0:
        return <OnelineStatut />;
      case 0:
        return <Parametres />;
      default:
        break;
    }
  };

  return (
    <View>
      <PageContainer
        title={'Profil'}
        isNotHaveHeader
        refresh={<RefreshControl refreshing={refreshing} onRefresh={init} />}>
        <View style={styles.containers}>
          <Image
            source={toUri(images.hero)}
            resizeMode="cover"
            style={{
              width: width > 1140 ? 1100 : width,
              height: 150,
            }}
          />
          <View style={{top: -110}}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {}}
                style={{
                  padding: 4,
                  backgroundColor: COLORS.primary,
                  borderRadius: 158 / 2,
                }}>
                <Image
                  source={toUri(images.image2)}
                  resizeMode="contain"
                  style={{
                    width: 150,
                    height: 150,
                    borderRadius: 150 / 2,
                  }}
                />
              </TouchableOpacity>
              <View style={{marginLeft: 240, top: -30}}>
                <Text style={{color: COLORS.secondary, ...FONTS.h3}}>
                  Jhon Doe
                </Text>
              </View>
            </View>
            {!isMobile && (
              <View style={styles.isMobile}>
                <View
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                  }}>
                  <View>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('HomeScreen')}>
                      <Text>Home</Text>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <Text>Des Servivce</Text>
                  </View>
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        signoutUtilisateur();
                        navigation.navigate('LoginScreen');
                      }}>
                      <Text>Se déconnecter</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
            <View
              style={{
                justifyContent: 'flex-start',
                flexDirection: 'row',
                marginTop: 10,
              }}>
              <View style={{width: width > 1140 ? 300 : width}}>
                <View>
                  <Item title={'Mon App'} />
                  <ItemList icon={toUri(icons.like)} title={'Favoris'} />
                  <ItemList
                    icon={toUri(icons.point_interest)}
                    title={'Mes intérêts'}
                  />
                  <Item title={'Acheter'} />
                  <ItemList
                    icon={toUri(icons.demande)}
                    title={'Gérer les demandes'}
                  />
                  <ItemList
                    icon={toUri(icons.offre_watch)}
                    title={"Faire un appel d'offres"}
                  />
                  <Item title={'Informations Générales'} />
                  <ItemList
                    icon={toUri(icons.setting_set)}
                    title={'Paramètres'}
                  />
                  <ItemList
                    icon={toUri(icons.icons_status)}
                    title={'Statut en ligne'}
                  />
                  <ItemList icon={toUri(icons.imagespay)} title={'Paiements'} />
                  <ItemList
                    icon={toUri(icons.invitefriends)}
                    title={'Inviter des amins'}
                  />
                  <ItemList
                    icon={toUri(icons.prestataire)}
                    title={'Devenir prestataire'}
                  />
                  <ItemList icon={toUri(icons.help)} title={'Aide'} />
                </View>
              </View>
              {toScreen(0)}
            </View>
          </View>
        </View>
      </PageContainer>
    </View>
  );
};

export const ProfilScreen: any = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profil);
