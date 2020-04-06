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

  container: {
    flex: 1,
  },

  project_add_button_container: {
    padding: 5,
    borderBottomWidth:2,
    borderBottomColor:Colors.textBlackColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tips_title_container: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:8,
    borderColor:'red',
    borderWidth:2,
  },

  project_subTitle:{
    fontSize: Layout.font.h2_size,
  },

  add_button: {
    fontSize: Layout.font.h2_size,
  },
  add_sub_text: {
    fontSize: Layout.font.btn_size,
  },

  tips_container: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginHorizontal: 10,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    // borderColor: Colors.borderGreyColor,
    // borderRadius: 15,
    // borderWidth: 2,
    height: LH *0.9 - 50,
  },
  scroll_container:{
    width: '100%',
    marginTop: LH/50,
  },
  scroll_content_container:{
    justifyContent:'center',
    alignItems:'center',
  },

  tips_item:{
    marginTop: 8,
    width:LW*0.8,
    aspectRatio:3,
    borderRadius:8,
    borderColor:'black',
    borderWidth:2,
  },
  tip_image:{
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
  },
};
