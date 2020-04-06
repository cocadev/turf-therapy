import {Platform, Dimensions} from 'react-native';

// constant
import Colors from './Colors';
import Layout from './Layout';

const LW = Layout.window.width;
const LH = Layout.window.height;
const CW = LW;
const CH =
  Platform.OS === 'ios'
    ? LH - (Layout.statusHeight + Layout.headerHeight)
    : LH - Layout.headerHeight;

import {responsiveFontSize} from 'react-native-responsive-dimensions';

export default {

  fontforSubtitle: {
    fontFamily: 'AvantGarde_Book-Regular',
    fontSize: responsiveFontSize(3),
  },
  fontProjectSubtitle: {
    fontFamily: 'AvantGarde_Book-Regular',
    fontSize: Layout.font.medium_size,
  },

  fontTitleHarabara: {
    fontFamily: 'HarabaraMaisBold',
    fontSize: responsiveFontSize(4.5),
  },
  fontTitleHarabaraGranular: {
    fontWeight:'bold',
    fontFamily: 'HarabaraMaisBold',
    fontSize: responsiveFontSize(3.5),
  },
  fontTitleHarabaraSmall: {
    fontFamily: 'HarabaraMaisBold',
    fontSize: responsiveFontSize(4.0),
  },
  loading: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: LW,
    height: LH,
  },
  mainContainer:{
    flex: 1,
  },
  containerborder: {
    marginBottom: 5,
  },
  inputContainer: {
    width: '100%',
    minHeight: LH*0.73 - 30,
    flexDirection:'column',
    justifyContent:'space-around',
    paddingHorizontal: 10,
  },
  add_entry_header_content:{
    paddingHorizontal:20,
    width: '100%',
    flexDirection:'row',
    justifyContent:'space-between',
  },
  add_entry_content:{
    padding:15,
    minHeight:LH*0.6,
    width: '100%',
    flexDirection:'column',
    justifyContent:'space-around',
  },
  add_preset_container:{
    paddingHorizontal:15,
    width: '100%',
  },
  add_preset_input_container:{
    width: '100%',
    minHeight: LH*0.7,
  },
  input_share_items: {
    width: (LW - 60 - 60) / 3,
  },
  picker_width: {
    // minWidth: (LW - 60) / 3,
    width: (LW) / 3 - 60,
    minWidth: 115,
  },
  input_add_preset: {
    width: 110,
    height: 50,
  },
  text_label_input: {
    color: Colors.textBlackColor,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: Layout.font.medium_size,
    marginBottom: 10,
    marginTop: 3,
  },
  text_label_output: {
    color: Colors.textBlackColor,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: Layout.font.medium_size,

    marginTop: 3,
  },
  text_label_input_for_less_than: {
    color: Colors.textBlackColor,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 0,
    marginTop: 7,
    width: '100%',
    fontSize: Layout.font.medium_size,
    // fontSize: responsiveFontSize(2),
  },
  text_less_than:{
    color: Colors.bkBlackColor20,
    width: '100%',
    textAlign: 'center',
    marginTop: 0,
    marginBottom: 10,
    fontSize: 16,
  },
  text_input: {
    textAlignVertical: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    borderColor: Colors.borderBlueColor,
    borderWidth: 1,
    borderRadius: 5,
    color: Colors.textBlackColor,
    fontWeight: 'normal',
    fontSize: Layout.font.medium_size,
    textAlign: 'center',
  },
  picker_style:{
    alignSelf: 'stretch',
    paddingHorizontal: 0,
    paddingVertical: 0,
    margin: 0,
    borderColor: Colors.borderBlueColor,
    borderWidth: 1,
    borderRadius: 5,
  },
  rn_picker_container: {
    marginLeft: 16,
    textAlignVertical: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    borderColor: Colors.borderBlueColor,
    borderWidth: 1,
    borderRadius: 5,
    width:'100%',
    color: Colors.textBlackColor,
    fontWeight: 'normal',
    fontSize: Layout.font.medium_size,
    textAlign: 'center',
  },
  text_center: {
    textAlign: 'center',
  },
  text_medium: {
    fontSize: Layout.font.medium_size,
    fontWeight: 'normal',
  },
  border_topline: {
    marginTop: 10,
    marginVertical: 5,
    borderTopWidth: 0,
    borderTopColor: Colors.mainGreenColor,
  },
  output_border: {
    width:'32%',
    marginBottom: 5,
    paddingHorizontal: 2,
  },
  output_bigcontainer: {
    marginTop: 5,
    borderRadius: 5,
  },
  text_output: {
    color: Colors.textBlueColor,
  },
  title_text: {
    width: '100%',
    color: Colors.bkBlackColor,
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  title_container: {
    marginTop: LH/40,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 10,
    height: '10%',
    alignItems: 'center',
    borderBottomColor: Colors.mainGreenColor,
  },
  output_big: {
    width: '100%',
    color: Colors.bkBlackColor,
    fontWeight: 'bold',
    fontSize: Layout.font.h2_size,
  },
  output_normal: {
    width: '100%',
    color: Colors.bkBlackColor,
    fontWeight: 'bold',
    fontSize: Layout.font.btn_size,
    borderColor: Colors.lightGrayColor,
    borderWidth: 1,
    borderRadius: 5,
    textAlign: 'center',
  },
  text_output_subtitle: {
    textAlign: 'center',
    color: Colors.bkBlackColor20,
    fontWeight: 'bold',
    fontSize: Layout.font.medium_size,
    marginBottom: 2,
    marginTop: 5,
  },

  shadowStyle: {
    borderWidth: 1,
    borderColor: '#ddd',
    // borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 1,
  },
  shadow: {
    shadowColor: Colors.bkBlackColor,
    shadowOpacity: 0.25,
    shadowOffset: {width: 0, height: 10},
    shadowRadius: 10,
    borderRadius: 5,
  },
  fit_image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  action_bar: {
    height:LH*0.15,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  action_item: {
    borderWidth: 2,
    borderRadius: 30,
    borderColor: Colors.borderBlueColor,
    paddingHorizontal: 10,
    width: '25%',
    aspectRatio: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  save_application_btn: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: Colors.borderBlueColor,
    paddingHorizontal: 10,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 7,
  },
  save_application_btn_text:{
    fontSize:Layout.font.btn_size,
    fontWeight: 'bold',
  },
  action_item_text: {
    fontWeight: 'bold',
  },
  analysis_container: {
    marginTop: 5,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  analysis_container_text: {
    fontSize: Layout.font.h2_size,
    fontWeight: 'bold',

  },
  infobtn_container: {
    marginLeft: 10,
    height: 30,
    aspectRatio: 1,
  },
  app_data_input_container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
  },
  project_name_input_container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  row_center_container:{
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: LH /32,
  },
  app_data_text: {
    flex: 1,
    fontSize: Layout.font.btn_size,
    fontWeight: 'bold',
  },
  output_save_container: {
    marginTop: 10,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  add_preset_action_container: {
    height: LH*0.1,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  app_rate_container: {
    marginTop: 15,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  entry_item_text_container: {
    marginTop: 15,
    width: '48%',
    flexDirection: 'column',
    justifyContent:'flex-start',
    alignItems: 'center',
  },
  entry_item_text: {
    width: '80%',
    color: Colors.bkBlackColor,
    fontWeight: 'bold',
    fontSize: Layout.font.btn_size,
    borderColor: Colors.lightGrayColor,
    borderWidth: 1,
    borderRadius: 5,
    textAlign: 'center',
  },
  app_rate_output: {
    minWidth: '30%',
    color: Colors.bkBlackColor,
    fontWeight: 'bold',
    fontSize: Layout.font.btn_size,
    borderColor: Colors.lightGrayColor,
    borderWidth: 1,
    borderRadius: 5,
    textAlign: 'center',
  },
  headerLeftIcon: {
    width:'25%',
  },
  headerLeftBack: {
    width: LW  / 5,
    position: 'absolute',
    height:'100%',
    left:25,
    justifyContent:'center'
  },
  headerRightLogo: {
    width: (LW - 60 - 60) / 3,
    height:'100%',
    position: 'absolute',
    justifyContent:'center',
    alignItems:'flex-end',
    right:15,
  },
  info_title_text: {
    fontSize: Layout.font.h2_size,
    fontWeight: 'bold',
  },
  info_content_emphasize_text: {
    color:Colors.bkBlackColor,
    fontSize:22,
  },

  info_content_text: {
    marginVertical:LH*0.03,
    fontSize: Layout.font.btn_size,
    color:Colors.textNormalBlackColor
  },
  info_last_content_text: {
    marginVertical:LH*0.03,
    fontSize: 22,
    color:Colors.textGreyColor
  },
  info_btn_container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  info_ok_btn: {
    paddingHorizontal: 15,
    borderColor: Colors.lightGrayColor,
    borderWidth: 1,
    borderRadius: 5,
  },
  fit_parent: {
    width: '100%',
  },
  border_blue: {
    borderColor: Colors.borderBlueColor,
  },

  journal_select_container:{
    width:'100%',
    marginVertical:15,
    flexDirection:'row',
    justifyContent:'space-around'
  },
  journal_select_btn:{
    borderWidth:1,
    borderColor:Colors.lightGrayColor,
    borderRadius:3,
    width:'40%',
    justifyContent:'center'
  },
  journal_select_btn_text:{
    fontSize:Layout.font.btn_size,
    fontWeight:'bold',
    textAlign:'center',
  }
};
