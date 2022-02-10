import React, {useEffect} from 'react';

import {View, Text, Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import mapDispatchToProps from '../../../services/redux/mapDispatchToProps';
import mapStateToProps from '../../../services/redux/mapStateToProps';
import {styles} from './styles';
import style from '../../style';

import {icons} from '../../resources/constants';
import {useWidthHeight} from '../../../hooks/dimension';
import {infoInitial} from '../../resources/constants/initial';

type Props = {
  title: string;
  parametres?: any;
  getAllContact?: any;
  contact?: any;
  categorie?: any;
};

const cmt = [
  'Événements',
  'Blog',
  'Forum',
  'Normes de la communauté',
  'Podcast',
  'Affiliés',
  'Inviter un ami',
  'Devenir prestataire',
];

const data = ['path1', 'path', 'social', 'twits'];

export function FFooterScreen(props: Props) {
  const {width, isWeb} = useWidthHeight();
  const {navigate} = useNavigation();
  const {parametres, getAllContact, contact, categorie} = props;

  const {name, logo, footer_description} = parametres?.info || infoInitial;

  const init = () => {
    getAllContact({}, () => {});
  };

  useEffect(() => {
    init();
  }, []);

  const contactList = contact?.contactList?.items || [];

  const categorieList = categorie?.items || [];

  return (
    <View style={styles.containers}>
      <View
        style={[
          {flex: 1, padding: 20},
          styles.v1,
          isWeb ? {} : {flexDirection: 'column'},
          {width: width > 1140 ? 1100 : '100%'},
        ]}>
        <View style={[styles.item, {flex: 1}]}>
          <View style={[style.vertical]}>
            <View style={[style.flex_start]}>
              <Image
                source={{uri: logo}}
                resizeMode="contain"
                style={{
                  width: 70,
                  height: 70,
                }}
              />
              <View
                style={{
                  margin: 10,
                  flex: 1,
                  alignSelf: 'center',
                }}>
                <Text style={[styles.tFooterLogo]}>{name}</Text>
              </View>
            </View>
            <Text style={{fontSize: 12, color: 'white'}}>
              {footer_description}
            </Text>
          </View>
          <View style={[style.inline, {marginTop: 10}]}>
            {data.map((item, key) => (
              <View key={key}>
                <Image
                  source={icons[item]?.default}
                  resizeMode="contain"
                  style={{
                    width: 20,
                    height: 20,
                  }}
                />
              </View>
            ))}
          </View>
        </View>
        <View style={[styles.item, {marginLeft: 20}]}>
          <View>
            <Text style={[styles.tFooterLogo]}>Categorie</Text>
          </View>
          {categorieList.map(({nom, id}, key) => (
            <TouchableOpacity
              key={key}
              style={{flex: 1}}
              onPress={() => navigate('CategorieScreen', {id})}>
              <Text style={{fontSize: 12, color: 'white'}}>{nom}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={[styles.item, {marginLeft: 20}]}>
          <View>
            <Text style={[styles.tFooterLogo]}>Communauté</Text>
          </View>
          {cmt.map((name, key) => (
            <View key={key} style={{flex: 1}}>
              <Text style={{fontSize: 12, color: 'white'}}>{name}</Text>
            </View>
          ))}
        </View>
        <View style={[styles.item, {marginLeft: 20}]}>
          <View>
            <Text style={[styles.tFooterLogo]}>Contactez-nous</Text>
          </View>
          {contactList?.map(({icon, name}, key) => (
            <View key={key} style={[style.flex_start, {flex: 1}]}>
              <Image
                source={{uri: icon}}
                resizeMode="contain"
                style={{
                  width: 20,
                  height: 20,
                  marginRight: 10,
                }}
              />
              <Text style={[styles.tFooterContact]}>{name}</Text>
            </View>
          ))}
        </View>
      </View>
      <View
        style={[
          styles.v2,
          {width: width > 1140 ? 1100 : '100%'},
          isWeb ? {marginTop: 30} : {flexDirection: 'column'},
        ]}>
        <View>
          <Text style={[styles.tFooterContact]}>© LOGO 2021 </Text>
        </View>
        <View>
          <Text style={[styles.tFooterContact]}>
            Mentions légales | CGV | A propos de nous
          </Text>
        </View>
        {!isWeb && <View style={{height: 100, width}} />}
      </View>
    </View>
  );
}

export const FooterScreen: any = connect(
  mapStateToProps,
  mapDispatchToProps,
)(FFooterScreen);
