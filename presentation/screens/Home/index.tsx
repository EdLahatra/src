import React, {useEffect, useState} from 'react';
import {
  View,
  RefreshControl,
  Text,
  Image,
  Animated,
  ImageBackground,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {PageContainer} from '../../layout/PageContainer';

import mapDispatchToProps from '../../../services/redux/mapDispatchToProps';
import mapStateToProps from '../../../services/redux/mapStateToProps';

import {icons, images, toUri} from '../../resources/constants';
import {infoInitial} from '../../resources/constants/initial';
import {styles} from './styles';
import style from '../../style';

import {useWidthHeight} from '../../../hooks/dimension';
import {ButtonComponent} from '../../components/Inputs/Button';

import TextLessMoreView from '../../components/Text';
import {renderDotsView} from '../../components/RenderDotsView';

export const Home = ({
  parametres,
  getAllAvis,
  avis: {list},
  getAllDiscover,
  discover: {discoverList},
}) => {
  const [refreshing, setRefreshing] = useState(false);

  const {width, isWeb} = useWidthHeight();
  const {navigate} = useNavigation<any>();

  useEffect(() => {
    init();
    setRefreshing(false);
  }, []);

  const init = () => {
    setRefreshing(true);
    getAllAvis({}, () => {
      getAllDiscover();
      setRefreshing(false);
    });
  };

  const logos = {
    airbnb: icons.airbnb?.default || icons.airbnb,
    fedEx: icons.fedEx?.default || icons.fedEx,
    google: icons.google?.default || icons.google,
    hubspot: icons.hubspot?.default || icons.hubspot,
    microsoft: icons.microsoft?.default || icons.microsoft,
  };

  const position = new Animated.Value(6);

  const {
    presentation,
    videoUrl,
    image_fv,
    title_service,
    description_service,
    plus_service,
    guides_description,
    url_guide,
    url_guide1,
    services = [],
    descriptions = [],
    avis_description,
  } = parametres?.info || infoInitial;

  const avis = list?.items || [];
  const discovers = Array.isArray(discoverList?.items)
    ? discoverList?.items
    : [];

  return (
    <View>
      <PageContainer
        refresh={<RefreshControl refreshing={refreshing} onRefresh={init} />}>
        <View style={styles.containers}>
          <View style={styles.containt}>
            <View
              style={[
                styles.v1,
                {
                  width: width > 1140 ? 1100 / 3 : width,
                  height: width > 1140 ? 1100 / 3 : width,
                },
              ]}>
              <View style={styles.vtitle}>
                <Text style={styles.title}>{title_service}</Text>
              </View>
              <View style={styles.vdescription}>
                <Text style={styles.description} numberOfLines={2}>
                  {presentation}
                </Text>
              </View>
              <Text style={styles.titleInput}>Saisissez le service</Text>
              <View style={styles.vInput}>
                <TextInput
                  style={styles.searcInput}
                  onChange={() => {}}
                  placeholder="ex : Logo Design"
                />
                <ButtonComponent title="Trouver" onPress={() => {}} />
              </View>
              <View style={styles.vplus}>
                <Image source={icons.stroke1?.default} style={styles.stroke1} />
                <Image source={icons.stroke3?.default} style={styles.stroke3} />
                <Text style={styles.tplus}>Lire plus</Text>
              </View>
            </View>
            {isWeb && (
              <View style={styles.v2}>
                <Image
                  source={{uri: videoUrl}}
                  resizeMode="cover"
                  style={{
                    width: width > 1140 ? 1100 / 2 : width,
                    height: width > 1140 ? 1100 / 2.5 : width,
                  }}
                />
              </View>
            )}
          </View>
          <View style={[isWeb ? styles.vlogos : styles.vlogosMobile]}>
            {Object.values(logos)?.map(value => (
              <View
                key={value}
                style={isWeb ? styles.vItemlogos : styles.vItemlogosMobile}>
                <TouchableOpacity>
                  <Image
                    source={value}
                    // resizeMode="cover"
                    style={{
                      width:
                        width > 1140
                          ? logos.microsoft || logos.hubspot
                            ? 110
                            : 100
                          : width / 6,
                      height:
                        width > 1140
                          ? value === logos.microsoft || value === logos.hubspot
                            ? 24
                            : 34
                          : 15,
                      overflow: 'visible',
                      resizeMode: 'cover',
                    }}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
          <View style={[styles.section1, isWeb ? {} : styles.mobileSection1]}>
            <View style={styles.containt_s1}>
              <View style={styles.containt_s11}>
                <View style={{marginRight: width > 1140 ? 15 : 0}}>
                  <Image
                    source={{uri: services[0]?.imageUrl}}
                    resizeMode="cover"
                    style={{
                      width: width > 1140 ? 227 : width / 2 - 10,
                      height: width > 1140 ? 315 : width / 3,
                    }}
                  />
                </View>
                <View style={[style.vertical]}>
                  <View />
                  <Image
                    source={{uri: services[1]?.imageUrl}}
                    resizeMode="cover"
                    style={{
                      width: width > 1140 ? 227 : width / 2 - 10,
                      height: width > 1140 ? 1100 / 4 : width / 4,
                    }}
                  />
                </View>
              </View>
              <View style={styles.containt_s11}>
                <View style={{marginRight: width > 1140 ? 15 : 0}}>
                  <Image
                    source={{uri: services[2]?.imageUrl}}
                    resizeMode="cover"
                    style={{
                      width: width > 1140 ? 227 : width / 2,
                      height: width > 1140 ? 1100 / 4 : width / 3,
                    }}
                  />
                </View>
                <View>
                  <Image
                    source={{uri: services[3]?.imageUrl}}
                    resizeMode="cover"
                    style={{
                      width: width > 1140 ? 227 : width / 2,
                      height: width > 1140 ? 1100 / 4 : width / 3,
                    }}
                  />
                </View>
              </View>
            </View>
            <View style={[styles.containt_s2, isWeb ? {} : {padding: 0}]}>
              <View style={styles.containt_s2_v1}>
                <Text style={styles.containt_s2_v1_text}>{plus_service}</Text>
              </View>
              <View style={styles.containt_s2_v2}>
                <TextLessMoreView
                  text={description_service}
                  numberOfLines={2}
                  showLessButton={true}
                  txtStyle={styles.containt_s2_v1_text2}
                />
              </View>
              <View style={style.inline}>
                <ButtonComponent
                  title="Voir toutes les services"
                  onPress={() => navigate('CategorieScreen')}
                />
                <View />
              </View>
            </View>
          </View>
          <View
            style={[
              styles.section_description,
              isWeb ? {} : styles.mobilesection_description,
            ]}>
            <View
              style={[
                styles.section_description1,
                {flex: 1, backgroundColor: '#ebebeb', padding: 40},
                style.vertical,
              ]}>
              <View style={styles.section_description1_v}>
                <Text style={styles.title}>Description</Text>
              </View>
              <View>
                {descriptions?.map(({_id, title, imageUrl, description}) => (
                  <View key={_id} style={[style.inline, {margin: 10}]}>
                    <View style={{margin: 20}}>
                      <Image
                        source={{uri: imageUrl}}
                        // resizeMode="cover"
                        style={{
                          width: 50,
                          height: 50,
                        }}
                      />
                    </View>
                    <View
                      style={{
                        flex: 1,
                        alignSelf: 'center',
                      }}>
                      <Text style={{}}>{title}</Text>
                      <Text>{description}</Text>
                    </View>
                  </View>
                ))}
              </View>
              <View />
            </View>
            {isWeb && (
              <View style={styles.section_description2}>
                <Image
                  source={{uri: image_fv}}
                  style={{
                    width: width > 1140 ? 450 : width,
                    height: width > 1140 ? 700 : width,
                  }}
                />
              </View>
            )}
          </View>
          <View
            style={[
              styles.section_avis,
              isWeb
                ? {}
                : {flexDirection: 'column', paddingLeft: 10, paddingRight: 10},
            ]}>
            <View style={{margin: 20, marginLeft: 5}}>
              <Text style={styles.title}>Avis des clients</Text>
            </View>
            <View>
              <TextLessMoreView
                text={avis_description}
                numberOfLines={2}
                showLessButton={true}
              />
            </View>
            <View style={{flex: 1}}>
              <ScrollView
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                horizontal
                onMomentumScrollEnd={e => {
                  console.log({e});
                }}
                scrollEventThrottle={16}>
                {avis.map(({text, user: {nom, prenom}}, key) => (
                  <View
                    key={key}
                    style={[
                      styles.avisItem,
                      {
                        width: isWeb ? 1100 / 3 - 30 : width - 20,
                      },
                    ]}>
                    <View style={styles.avisItemTittle}>
                      <View>
                        <Text
                          style={{
                            fontSize: 18,
                            fontFamily: 'Roboto',
                            fontWeight: '700',
                          }}>
                          Efficient Collaborating
                        </Text>
                      </View>
                      <View>
                        <Text>{text}</Text>
                      </View>
                    </View>
                    <View style={styles.triangle} />
                    <View style={styles.viewPicture}>
                      <Image
                        source={toUri(images.picture)}
                        style={{
                          width: 60,
                          height: 60,
                        }}
                      />
                      <Text>{`${prenom} ${nom}`}</Text>
                      <Text>CEO at ABC Corporation</Text>
                    </View>
                  </View>
                ))}
              </ScrollView>
              <View style={{flex: 1, alignItems: 'center', margin: 20}}>
                {renderDotsView([1, 2, 3, 4, 5, 6, 7], position)}
              </View>
            </View>
          </View>
          {isWeb && (
            <View style={styles.section_description3}>
              <View style={styles.section_description31}>
                <View style={[styles.s3_view, {width: width / 4}]}>
                  <Text style={styles.s3_title}>Guides</Text>
                  <Text style={styles.s3_title1}>{guides_description}</Text>
                  <Text style={styles.s3_plus}>Lire plus</Text>
                </View>
                <View style={styles.images_phone}>
                  <ImageBackground
                    resizeMode="stretch"
                    source={{uri: url_guide}}
                    style={styles.imgUrl_guide}>
                    <Image
                      source={{uri: url_guide1}}
                      style={styles.imgUrl_guide1}
                      resizeMode="stretch"
                    />
                  </ImageBackground>
                  <View style={styles.view_blank} />
                </View>
                <View style={styles.images_phone}>
                  <View style={styles.view_blank} />
                  <ImageBackground
                    resizeMode="stretch"
                    source={toUri(images.iPhone_X)}
                    style={styles.img_iPhone_X}>
                    <Image
                      source={toUri(images.phone2)}
                      style={styles.imgPhone2}
                      resizeMode="stretch"
                    />
                  </ImageBackground>
                </View>
              </View>
            </View>
          )}
          <View
            style={[styles.section_description4, isWeb ? {} : {padding: 20}]}>
            <View style={styles.s4_v1}>
              <Text style={styles.title}>Discover the key features</Text>
            </View>
            <View style={[styles.s4_v, isWeb ? {} : {flexDirection: 'column'}]}>
              {discovers.map(({title, id, logo, description}) => (
                <View key={id} style={styles.s4_v_item}>
                  <View>
                    <Image
                      source={{uri: logo}}
                      resizeMode="contain"
                      style={{
                        width: 24,
                        height: 40,
                        marginTop: 20,
                      }}
                    />
                    <Text style={styles.s4_title_item}>{title}</Text>
                    <TextLessMoreView
                      text={description}
                      numberOfLines={1}
                      showLessButton={true}
                    />
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      </PageContainer>
    </View>
  );
};

export const HomeScreen: any = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
