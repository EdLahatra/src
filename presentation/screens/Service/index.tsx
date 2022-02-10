import React, {useEffect, useState} from 'react';
import {
  View,
  RefreshControl,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

import {PageContainer} from '../../layout/PageContainer';

import {connect} from 'react-redux';
import mapDispatchToProps from '../../../services/redux/mapDispatchToProps';
import mapStateToProps from '../../../services/redux/mapStateToProps';

import {images, icons} from '../../resources/constants';
import {styles} from './styles';
import {toUri} from '../../../presentation/resources/constants';
import {useWidthHeight} from '../../../hooks/dimension';
import Carousel from '../../components/Carousel';
import {infoInitial} from '../../../presentation/resources/constants/initial';
import {ItemDelai} from '../../components/Service/ItemDelai';
import {ComparerTitle} from '../../components/Service/ComparerTitle';
import {ComparerTotal} from '../../components/Service/ComparerTotal';
import {Modification} from '../../components/Service/Modification';
import {ComparerBody} from '../../components/Service/ComparerBody';
import {AproposPrestataire} from '../../components/Service/AproposPrestataire';
import {uniqByKeepFirst} from '../../../data/factory';

const Service = ({getByIdServices, parametres, services}) => {
  const [refreshing, setRefreshing] = useState(true);
  const [prix_pluss, setPrix_plus] = useState<any>({});

  const {width} = useWidthHeight();
  const {params} = useRoute();
  const {navigate} = useNavigation<any>();

  useEffect(() => {
    getByIdService();
  }, []);

  const init = () => {
    setRefreshing(true);
    getByIdService();
  };

  const getByIdService = () => {
    getByIdServices(
      {},
      () => {
        setRefreshing(false);
        // if (res?._id) {
        //   setService({...res, id: res?._id});
        // }
      },
      // @ts-ignore
      '/' + params?.id,
    );
  };

  const {name} = parametres?.info || infoInitial;

  const listItem = [
    {imageUrl: toUri(images.hero), nom: 'nom', description: 'description'},
    {imageUrl: toUri(images.hero), nom: 'nom1', description: 'description1'},
    {imageUrl: toUri(images.hero), nom: 'nom2', description: 'description2'},
  ];

  const widthScreen = width > 1140 ? 1140 : width;

  // @ts-ignore
  const service = services?.service ? services?.service[params?.id] || {} : {};

  const offre =
    Array.isArray(service?.offre) && Array.isArray(service?.offre_items)
      ? service?.offre.map(({items, ...all}) => {
          const new_items = Array.isArray(items)
            ? service?.offre_items.filter(({_id}) => items.includes(_id))
            : [];
          return {
            items: new_items,
            ...all,
          };
        })
      : [];

  const items = uniqByKeepFirst(
    Array.isArray(offre)
      ? offre?.reduce((acc, {items}) => (items ? [...items, ...acc] : acc), [])
      : [],
    it => it._id,
  );

  const prestataire_categories = Array.isArray(service?.prestataire_categories)
    ? service?.prestataire_categories
    : [];

  return (
    <View>
      <PageContainer
        title={'Service'}
        refresh={<RefreshControl refreshing={refreshing} onRefresh={init} />}>
        <View style={styles.containers}>
          <View
            style={{
              marginTop: 10,
            }}>
            <View>
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
                        id: service?.categorie?.categorie?._id,
                      })
                    }
                    style={{marginRight: 5}}>
                    <Text>{service?.categorie_categorie?.nom}</Text>
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
                    <Text>{service?.nom}</Text>
                  </TouchableOpacity>
                  <Image
                    source={toUri(icons.stroke3)}
                    style={{width: 6, height: 12, tintColor: 'black'}}
                  />
                  <Text style={{marginLeft: 5}}>{service?.description}</Text>
                </View>
              </View>
              <View>
                <Text style={styles.title}>{service?.introduction}</Text>
              </View>
              <Carousel
                listItem={
                  Array.isArray(service?.imageUrl)
                    ? service?.imageUrl.map(url => ({
                        imageUrl: url,
                        nom: 'nom',
                        description: 'description',
                      }))
                    : listItem
                }
              />
              <View style={{marginTop: 20}}>
                <Text style={styles.title}>À propos de ce service</Text>
                <Text>{service?.apropos}</Text>
              </View>
              <View>
                <Text style={styles.title}>Comparer les offres</Text>
                <ComparerTitle widthScreen={widthScreen} offre={offre} />
                {items?.map(({nom, _id}, key) => (
                  <ComparerBody
                    _id={_id}
                    offre={offre}
                    title={nom}
                    key={key}
                    widthScreen={widthScreen}
                  />
                ))}
                {Array.isArray(offre) && offre[0]?.nb_modification && (
                  <Modification
                    widthScreen={widthScreen}
                    offre={offre}
                    title={'Modifications'}
                    attribut={'nb_modification'}
                  />
                )}
                {Array.isArray(offre) && offre[0]?.nb_concepts_inclus && (
                  <Modification
                    widthScreen={widthScreen}
                    offre={offre}
                    title={'Nbre de concepts inclus'}
                    attribut={'nb_concepts_inclus'}
                  />
                )}
                <View
                  style={{
                    justifyContent: 'space-around',
                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      width: widthScreen / 5,
                      alignItems: 'center',
                      // flex: 1,
                      alignSelf: 'center',
                    }}>
                    <Text>{'Délai de réalisation'}</Text>
                  </View>
                  {Array.isArray(offre) &&
                    offre[0]?.nb_concepts_inclus &&
                    offre?.map((item, key) => (
                      <ItemDelai
                        key={key}
                        {...item}
                        widthScreen={widthScreen / 4}
                        setPrix_plus={setPrix_plus}
                        prix_pluss={prix_pluss}
                      />
                    ))}
                </View>
                <ComparerTotal
                  offre={offre}
                  widthScreen={widthScreen}
                  prix_pluss={prix_pluss}
                />
              </View>
              <View>
                <Text style={styles.title}>À propos du prestataire</Text>
                <AproposPrestataire
                  prestataire={service?.prestataire || {}}
                  prestataire_categories={prestataire_categories}
                />
              </View>
            </View>
          </View>
        </View>
      </PageContainer>
    </View>
  );
};

export const ServiceScreen: any = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Service);
