import {StyleSheet} from 'react-native';
import {COLORS, FONTS} from '../../resources/constants';

export const styles = StyleSheet.create({
  containers: {
    height: '100%',
    width: '100%',
  },
  containt: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: COLORS.secondary,
  },
  vtitle: {
    marginBottom: 16,
  },
  v1: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: '8%',
    paddingRight: '8%',
  },
  vInput: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  searcInput: {
    flex: 1,
  },
  vplus: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
  },
  tplus: {
    textTransform: 'uppercase',
    ...FONTS.body3,
    color: COLORS.white,
    marginLeft: 10,
  },
  title: {
    ...FONTS.body1,
    color: COLORS.primary,
    fontWeight: '800',
  },
  titleInput: {
    ...FONTS.body1,
    color: COLORS.Gray6,
    marginBottom: 10,
  },
  description: {
    ...FONTS.body4,
    color: COLORS.white,
  },
  vdescription: {
    marginBottom: 16,
  },
  v2: {
    // flex: 1,
  },
  stroke1: {
    width: 1,
    height: 14,
    transform: [{rotate: '90deg'}],
    borderWidth: 1.5,
    borderColor: COLORS.Gray6,
    opacity: 0.4,
  },
  stroke3: {
    width: 6,
    height: 12,
  },
  vlogos: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingLeft: 40,
    paddingRight: 40,
    marginVertical: 20,
    height: 80,
    borderBottomWidth: 1,
    borderBottomColor: '#d7dbe1',
    borderTopWidth: 1,
    borderTopColor: '#d7dbe1',
  },
  vlogosMobile: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 0,
    paddingLeft: 0,
    paddingRight: 0,
    margin: 15,
  },
  vItemlogos: {
    justifyContent: 'center',
    minHeight: 60,
    alignSelf: 'center',
  },
  vItemlogosMobile: {
    justifyContent: 'space-between',
  },
  section1: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 30,
    // backgroundColor: 'red',
  },
  containt_s11: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 10,
    // backgroundColor: 'red',
  },
  containt_s2: {
    flex: 1,
    alignSelf: 'center',
    padding: 20,
    marginLeft: 40,
  },
  containt_s2_v1: {
    marginBottom: 20,
  },
  containt_s2_v1_text: {
    fontSize: 35,
    fontWeight: '900',
    color: COLORS.gray90,
    fontFamily: 'Roboto',
  },
  containt_s2_v2: {
    marginBottom: 20,
  },
  containt_s2_v1_text2: {
    fontSize: 15,
    fontWeight: '900',
    color: COLORS.gray90,
    fontFamily: 'Roboto',
  },
  containt_s1: {
    // justifyContent: 'space-between',
    // flexDirection: 'row',
    // backgroundColor: 'green',
  },
  section_description: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 0,
    // paddingLeft: 60,
    // paddingRight: 60,
    backgroundColor: '#ebebeb',
  },
  section_description1: {
    flex: 1,
  },
  section_description2: {},
  section_description1_v: {},
  section_description1_t: {},
  section_avis: {
    padding: 20,
    paddingLeft: 40,
    paddingRight: 40,
  },
  text12: {
    ...FONTS.body4,
    color: COLORS.black,
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 15,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'rgb(220, 220, 220)',
    transform: [{rotate: '180deg'}],
  },
  section_description3: {
    // flex: 1,
    backgroundColor: COLORS.primary,
  },
  section_description31: {
    // flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    // padding: 20,
    paddingLeft: 60,
    paddingRight: 60,
    paddingTop: 0,
    alignItems: 'center',
  },
  s3_title: {
    color: COLORS.Gray6,
    fontWeight: '800',
    fontSize: 40,
    lineHeight: 64,
  },
  s3_title1: {
    color: COLORS.Gray6,
    fontSize: 16,
  },
  s3_plus: {
    color: COLORS.Gray6,
    fontSize: 16,
  },
  s3_view: {
    // flex: 1,
    // backgroundColor: 'red',
  },
  images_phone: {
    // backgroundColor: 'red',
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  view_blank: {
    height: 50,
    // width: 200,
  },
  section_description4: {
    flex: 1,
    // padding: 60,
  },
  s4_v_item: {
    flex: 1,
  },
  s4_v: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    // flex: 1,
  },
  s4_title_item: {
    color: COLORS.gray90,
    fontSize: 20,
    fontWeight: '600',
  },
  s4_plus: {
    color: COLORS.primary,
  },
  s4_title: {
    color: COLORS.gray90,
    fontSize: 40,
  },
  s4_v1: {
    marginTop: 50,
  },
  avisItem: {
    alignItems: 'center',
  },
  avisItemTittle: {
    alignSelf: 'center',
    flex: 1,
    alignItems: 'center',
    margin: 10,
    marginBottom: 0,
    backgroundColor: '#dcdcdc',
    borderRadius: 10,
    padding: 20,
    maxWidth: 500,
    // paddingVertical: 20,
  },
  imgPhone2: {
    marginTop: 17,
    width: 202,
    height: 438,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  imgUrl_guide1: {
    width: 202,
    height: 438,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  imgUrl_guide: {
    width: 232,
    height: 455,
    // flex: 1,
    alignItems: 'center',
  },
  viewPicture: {
    alignSelf: 'center',
    flex: 1,
    alignItems: 'center',
    margin: 20,
  },
  mobileSection1: {
    flexDirection: 'column',
    paddingLeft: 10,
    paddingRight: 10,
  },
  mobilesection_description: {
    flexDirection: 'column',
    paddingLeft: 10,
    paddingRight: 10,
  },
  img_iPhone_X: {
    width: 232,
    height: 455,
    alignItems: 'center',
  },
});
