import {StyleSheet} from 'react-native';
// import {COLORS} from '../../resources/constants';

export const styles = StyleSheet.create({
  containers: {
    justifyContent: 'flex-start',
    flexDirection: 'column',
    // marginLeft: 0,
    // marginTop: 0,
    margin: 8.2,
    alignItems: 'center',
    borderRadius: 10,
  },
  itemView: {
    // margin: 5,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemNom: {fontSize: 14, fontWeight: '400', color: '#4F4F4F'},
  itemList: {
    // backgroundColor: COLORS.Gray6,
    // borderRadius: 20,
    // marginBottom: 10,
    // justifyContent: 'flex-start',
    // flexDirection: 'row',
  },
  itemListName: {
    fontWeight: '600',
    fontSize: 16,
    paddingHorizontal: 16,
  },
  itemListDescription: {
    fontSize: 14,
    paddingHorizontal: 16,
  },
  itemListFooterG: {
    fontSize: 14,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  itemListFooterD: {
    fontSize: 14,
    fontWeight: '600',
    paddingRight: 12,
  },
  itemListFooter: {
    fontSize: 14,
    paddingRight: 12,
  },
});
