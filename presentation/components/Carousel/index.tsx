import * as React from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import config from '../../../data/config';
import {globalStyle} from '../../globalStyle';
import {Loader} from '../Loader';

type Props = {
  listItem: any[];
};

export default ({listItem}: Props) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  // const {navigate, goBack} = useNavigation<NavigationProps>();
  const sliderWidth = useWindowDimensions().width;
  const _renderItem = (data: any) => {
    const {item} = data;
    // {uri: `${config.baseURL}api/content/${srcImage}`}
    const {imageUrl, nom, description} = item;

    return (
      <TouchableOpacity key={item.id} onPress={() => {}}>
        <View
          style={{
            borderRadius: 16,
            margin: 16,
            marginLeft: 0,
            flexDirection: 'row',
            padding: 0,
            // height: 80,
            flex: 1,
            flexGrow: 1,
            width: '100%',
            height: 120,
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            backgroundColor: '#fff',

            shadowColor: '#000',
            shadowOffset: {width: 0, height: 6},
            shadowOpacity: 0.06,
            shadowRadius: 16,
            elevation: 7,
          }}>
          <View
            style={{
              backgroundColor: '#D8D8D8',
              flexBasis: 120,
              width: 120,
              // height: 120,
            }}>
            {listItem.length > 0 ? (
              <Image
                source={{uri: `${config.baseURL}api/content/${imageUrl}`}}
                style={{
                  width: 120,
                  height: 120,
                }}
              />
            ) : (
              <Loader />
            )}
          </View>

          <View
            style={{
              padding: 8,
              paddingRight: 12,
              paddingLeft: 12,
              flex: 1,
              flexGrow: 1,
              justifyContent: 'flex-start',
              // height: 120,
              alignItems: 'flex-start',
            }}>
            <Text
              numberOfLines={1}
              style={[
                globalStyle.titlePrimaryH2,
                {marginTop: 4, marginBottom: 4},
              ]}>
              {nom}
            </Text>
            <Text
              style={[globalStyle.paragraphe, {fontSize: 14}]}
              numberOfLines={3}>
              {description && description}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View
      style={{
        flex: 1,
        marginTop: 8,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexGrow: 1,
      }}>
      <Carousel
        layout={'default'}
        data={listItem.length > 0 ? listItem : []}
        sliderWidth={sliderWidth}
        itemWidth={sliderWidth - 32}
        loop={true}
        autoplay={true}
        autoplayDelay={2000}
        autoplayInterval={4000}
        containerCustomStyle={{
          overflow: 'visible',
        }}
        renderItem={_renderItem}
        onSnapToItem={index => setActiveIndex(index)}
      />
      <Pagination
        dotsLength={listItem.length > 0 ? listItem.length : 0}
        activeDotIndex={activeIndex}
        containerStyle={{
          alignSelf: 'center',
          margin: -28,
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          // backgroundColor: 'red',
          flexGrow: 1,
          flexBasis: 16,
          padding: 0,
          // maxHeight: 16,
          maxWidth: sliderWidth,
          overflow: 'visible',
        }}
        dotStyle={{
          width: 8,
          height: 8,
          borderRadius: 5,
          margin: 0,
          padding: 0,
          marginHorizontal: 0,
          marginVertical: 0,
          backgroundColor: '#1D5C42',
        }}
        inactiveDotStyle={{
          // Define styles for inactive dots here
          width: 8,
          height: 8,
        }}
        inactiveDotOpacity={0.3}
        inactiveDotScale={0.8}
      />
    </View>
  );
};
