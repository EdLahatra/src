import React from 'react';
import {
  Text,
  View,
  RefreshControl,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
} from 'react-native';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {PageContainer} from '../../layout/PageContainer';

import mapDispatchToProps from '../../../services/redux/mapDispatchToProps';
import mapStateToProps from '../../../services/redux/mapStateToProps';

import {styles} from './styles';
import {useWidthHeight} from '../../../hooks/dimension';
import {ItemCategorie} from '../../components/Categorie/item';
import {ItemListCategorie} from '../../components/Categorie/itemList';

import useCategorie from './useCategorie';
import {COLORS, FONTS, icons, toUri} from '../../resources/constants';
import {infoInitial} from '../../resources/constants/initial';

const Categorie = ({
  getAllCategorie,
  categorie,
  getAllServices,
  services,
  getAllSous_categorie,
  sous_categorie,
  navigation,
  getByIdServices,
  parametres,
}) => {
  const {width} = useWidthHeight();
  const {navigate} = useNavigation<any>();
  const {
    setSelected,
    init,
    list,
    services_list,
    categorie_list,
    // sous_categorie_list,
    getService,
    selected,
    refreshing,
    setRefreshing,
    // search,
    setSearch,
    // service,
    // setService,
    categorie_sous,
  } = useCategorie({
    getAllCategorie,
    categorie,
    getAllServices,
    services,
    getAllSous_categorie,
    sous_categorie,
    navigation,
  });

  const goToServices = (id: string, cb: any) => {
    setRefreshing(true);
    getByIdServices(
      {},
      () => {
        typeof cb === 'function' && cb();
        setRefreshing(false);
        navigate('ServiceScreen', {id});
      },
      '/' + id,
    );
  };

  const {name} = parametres?.info || infoInitial;

  console.log(categorie_list);

  return (
    <View>
      <PageContainer
        title={'Categorie'}
        refresh={<RefreshControl refreshing={refreshing} onRefresh={init} />}>
        <View style={styles.containers}>
          <View
            style={{
              paddingVertical: 20,
            }}>
            <View
              style={{
                // backgroundColor: 'red',
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <View style={{backgroundColor: 'red'}} />
              <View>
                <View>
                  <Text>Saisissez le service</Text>
                </View>
                <View
                  style={
                    {
                      // backgroundColor: 'red',
                    }
                  }>
                  <View
                    style={{
                      backgroundColor: COLORS.secondary,
                      borderRadius: 8,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <TextInput
                      style={styles.searcInput}
                      onChange={() => {}}
                      placeholder="ex : Logo Design"
                    />
                    <View
                      style={{
                        backgroundColor: COLORS.primary,
                        margin: 8,
                        borderRadius: 8,
                        alignItems: 'center',
                        maxWidth: 230,
                      }}>
                      <TouchableOpacity
                        onPress={() => {}}
                        style={{flex: 1, padding: 12, maxHeight: 40}}>
                        <Text
                          style={{
                            ...FONTS.body3,
                            color: COLORS.white,
                            fontSize: 18,
                            lineHeight: 14,
                          }}>
                          {'Trouver'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
              <View style={{backgroundColor: 'red'}} />
            </View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              pagingEnabled={true}>
              {Array.isArray(list) &&
                list.map(
                  (
                    item: JSX.IntrinsicAttributes & {
                      id: any;
                      nom: any;
                      imageUrl: any;
                    },
                    key: string | number | null | undefined,
                  ) => (
                    <TouchableOpacity
                      key={key}
                      onPress={() => {
                        setSelected(item);
                        navigation.setParams({id: item?.id});
                        setSearch('');
                        getService('?categorie__categorie=' + item.id);
                      }}>
                      <ItemCategorie {...item} selected={selected} />
                    </TouchableOpacity>
                  ),
                )}
            </ScrollView>
          </View>
          <View style={[styles.flex_start_row]}>
            <View
              style={[
                styles.flex_start_row,
                {
                  marginRight: 5,
                  alignItems: 'center',
                  // backgroundColor: 'red',
                },
              ]}>
              <TouchableOpacity
                onPress={() => navigate('HomeScreen')}
                style={{marginRight: 5}}>
                <Text>{name}</Text>
              </TouchableOpacity>
              <Image
                source={toUri(icons.stroke3)}
                style={{width: 6, height: 12, tintColor: 'black'}}
              />
            </View>
            <View
              style={[
                styles.flex_start_row,
                {
                  marginRight: 5,
                  alignItems: 'center',
                },
              ]}>
              <TouchableOpacity
                onPress={() =>
                  navigate('CategorieScreen', {
                    id: selected?._id,
                  })
                }
                style={{marginRight: 5}}>
                <Text>{selected?.nom}</Text>
              </TouchableOpacity>
              <Image
                source={toUri(icons.stroke3)}
                style={{width: 6, height: 12, tintColor: 'black'}}
              />
            </View>
            <View
              style={[
                styles.flex_start_row,
                {
                  marginRight: 5,
                  alignItems: 'center',
                },
              ]}>
              <TouchableOpacity onPress={() => {}} style={{marginRight: 5}}>
                <Text>{categorie_sous?.nom}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={[
              styles.services_list,
              {
                justifyContent: width > 1140 ? 'flex-start' : 'space-around',
                paddingHorizontal: 20,
              },
            ]}>
            {services_list.map(({nom, description, id}, key) => {
              return (
                <View
                  key={key}
                  style={{
                    backgroundColor: '#f2f2f2',
                    height: 300,
                    width: 240,
                    justifyContent: 'flex-start',
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                    borderWidth: 1,
                    borderColor: '#efeff0',
                    marginBottom: 20,
                    marginHorizontal: 10,
                  }}>
                  <ItemListCategorie
                    key={key}
                    nom={nom}
                    description={description}
                    goToServices={(cb: any) => goToServices(id, cb)}
                  />
                  <View style={{flex: 0.1}} />
                </View>
              );
            })}
          </View>
        </View>
      </PageContainer>
    </View>
  );
};

export const CategorieScreen: any = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Categorie);
