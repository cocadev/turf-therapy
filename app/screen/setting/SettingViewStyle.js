import {Dimensions, Platform, StatusBar} from 'react-native';

import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import GlobalStyle from '../../constants/GlobalStyle';

const LW = Layout.window.width;
const LH = Layout.window.height;
const CW = LW;
const CH =
  Platform.OS === 'ios'
    ? LH - (Layout.statusHeight + Layout.menuHeight)
    : LH - Layout.menuHeight;

export default {
  ...GlobalStyle,

  feedback_view:{
    flex:1,
  },

  mainContent: {
    flex:1,
    position: 'absolute',
    width:LW,
    height: LH,
    top:0,
    left:0,
  },
  setting_presets_title: {
    fontSize: Layout.font.btn_size,
    color: Colors.textBlackColor,
  },
  setting_preset_container: {
    borderRadius: 5,
    borderColor: Colors.textGreySettingColor,
    backgroundColor: 'transparent',
  },

  setting_header: {
    marginTop: 5,
    width:'100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  setting_icon: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  setting_title: {
    color: Colors.bkBlackColor,
    fontWeight: 'bold',
    fontSize: Layout.font.h2_size,
  },
  setting_sub_container: {
    marginTop: '30%',
    marginHorizontal: 30,
    height: '60%',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  setting_button_container: {
    width: '80%',
    borderWidth: 2,
    borderColor: Colors.lightGrayColor,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  setting_sub_button: {
    fontSize: Layout.font.h1_size,
    padding: 15,
  },
  add_container: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginVertical: 10,
    marginHorizontal: 10,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderColor: Colors.borderGreyColor,
    borderRadius: 15,
    borderWidth: 2,
    height: LH*0.9 -50,
  },
  add_button_container: {
    borderWidth: 2,
    borderColor: Colors.lightGrayColor,
    borderRadius: 40,
    width: '80%',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  add_button: {
    fontSize: Layout.font.h2_size,
  },
  add_sub_text: {
    fontSize: Layout.font.btn_size,
  },
  feedback_container: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 20,
    maxHeight:LH*0.8,
  },
  feedback_sub_container: {
    flexDirection: 'row',
  },
  feedback_input_container: {
    flex: 1,
  },
  feedbackContent_container: {
    borderColor: Colors.lightGrayColor,
    borderWidth: 2,
    borderRadius: 5,
  },
  regular_text: {
    marginHorizontal: 5,
    fontSize: Layout.font.h2_size,
    fontWeight: 'bold',
  },
  send_email_container: {
    width: '100%',
    position: 'absolute',
    bottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  send_email_text: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.lightGrayColor,
    paddingHorizontal: 15,
    fontSize: Layout.font.h2_size,
  },
};
