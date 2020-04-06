import React, {Component} from 'react';
import {
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Platform,
    Alert,
    View,
    Linking,
    ScrollView,
    AsyncStorage,
} from 'react-native';
import Layout from '../../constants/Layout';
import Colors from '../../constants/Colors';

import {
    Avatar,
    CheckBox,
    Input,
    Icon,
    ListItem,
    Overlay,
} from 'react-native-elements';
import SettingViewStyle from './SettingViewStyle';
import {KeyboardAccessoryNavigation} from "react-native-keyboard-accessory";

const LW = Layout.window.width;
const LH = Layout.window.height;
const RateWH = LH / LW;

export default class AddPreset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowGranularPreset: false,
            sizeoflawn: '',
            poundsofNitronper: '',
            productAnN: '',
            productAnP: '',
            productAnK: '',
            weightofbags: '',
            costPerBag: '',

            targetRateofNitrogen: '',
            weightofContainer: '',
            sizeOfContainer: 0,
            costPerContainer: '',

            addpresetName: '',
            isShowLiquidPreset: false,
            netweightofpounds: '',
            liquidPresets: [],
            granularPresets: [],
            isShowAnalysisInfo: false,
            currentPreset: undefined,
            isUpdate: false,
        };
    }

    refresh() {
        this.setState({
            sizeoflawn: '',
            poundsofNitronper: '',
            productAnN: '',
            productAnP: '',
            productAnK: '',
            weightofbags: '',
            costPerBag: '',
            addpresetName: '',
            netweightofpounds: '',
            targetRateofNitrogen: '',
            weightofContainer: '',
            sizeOfContainer: 0,
            costPerContainer: '',
        });
    }


    async componentDidMount(): void {
        await AsyncStorage.getItem('granularpresets').then(data => {
            if (data !== null) {
                var presetarray = JSON.parse(data);
                this.setState({granularPresets: presetarray});
            }
        });

        await AsyncStorage.getItem('liquidpresets').then(data => {
            if (data !== null) {
                var presetarray = JSON.parse(data);
                this.setState({liquidPresets: presetarray});
            }
        });
    }

    refreshG = async () => {
        await AsyncStorage.getItem('granularpresets').then(data => {
            if (data !== null) {
                var presetarray = JSON.parse(data);
                this.setState({granularPresets: presetarray});
            }
        });
    }

    refreshL = async () => {
        await AsyncStorage.getItem('liquidpresets').then(data => {
            if (data !== null) {
                var presetarray = JSON.parse(data);
                this.setState({liquidPresets: presetarray});
            }
        });
    }

    getNumberFormatText(text) {
        // return text.replace(/\D/gm, '');
        let newText = '';
        let numbers = '0123456789.';

        for (var i = 0; i < text.length; i++) {
            if (numbers.indexOf(text[i]) > -1) {
                newText = newText + text[i];
            } else {
                // alert("please enter numbers only");
            }
        }
        return newText;
    }

    render() {
        return (
            <View style={styles.mainContent}>

                <View style={styles.title_container}>

                    <View style={styles.setting_header}>
                        <Text style={[styles.setting_title, styles.fontTitleHarabara]}>Presets</Text>
                    </View>
                    <View
                        style={styles.headerRightLogo}>
                        <View style={{width: '100%', height: '100%'}}>
                            <Image
                                style={styles.fit_image}
                                source={require('../../assets/images/logo.png')}
                            />
                        </View>
                    </View>
                    <TouchableOpacity
                        style={styles.headerLeftBack}
                        onPress={() => {
                            this.props.navigation.goBack();
                        }}>
                        <View style={{width: '40%', height: '40%'}}>
                            <Image
                                style={styles.fit_image}
                                source={require('../../assets/images/left.png')}
                            />
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.add_container}>
                    <TouchableOpacity
                        style={styles.add_button_container}
                        onPress={() => {
                            // this.refresh();
                            this.props.navigation.navigate('AddGranular', {
                                onGoBack: () => this.refreshG(),
                                isUpdate: false,
                                currentPreset: {},
                                addpresetName: '',
                                sizeoflawn: '',
                                poundsofNitronper: '',
                                productAnN: '',
                                productAnP: '',
                                productAnK: '',
                                weightofbags: '',
                                costPerBag: '',
                            });
                        }}>
                        <Text style={styles.add_button}>+ Add</Text>
                        <Text style={styles.add_sub_text}>(Granular)</Text>
                    </TouchableOpacity>

                    <ScrollView style={{width: '100%', backgroundColor: Colors.whiteColor}}>
                        {this.state.granularPresets.map((item, i) => (
                            <ListItem
                                // containerStyle={{width:'100%',height: 50, backgroundColor:'red'}}
                                Component={TouchableOpacity}
                                onPress={() => {
                                    if (item != null) {
                                        this.props.navigation.navigate('AddGranular', {
                                            onGoBack: () => this.refreshG(),
                                            isUpdate: true,
                                            currentPreset: item,
                                            addpresetName: item.name,
                                            sizeoflawn: item.sizeoflawn,
                                            poundsofNitronper: item.poundsofNitronper,
                                            productAnN: item.productAnN,
                                            productAnP: item.productAnP,
                                            productAnK: item.productAnK,
                                            weightofbags: item.weightofbags,
                                            costPerBag: item.costPerBag,
                                        });
                                        // this.setState({
                                        //   isUpdate: true,
                                        //   currentPreset: item,
                                        //   addpresetName: item.name,
                                        //   sizeoflawn: item.sizeoflawn,
                                        //   poundsofNitronper: item.poundsofNitronper,
                                        //   productAnN: item.productAnN,
                                        //   productAnP: item.productAnP,
                                        //   productAnK: item.productAnK,
                                        //   weightofbags: item.weightofbags,
                                        //   costPerBag: item.costPerBag,
                                        //   isShowGranularPreset: true,
                                        // });
                                    }
                                }}

                                key={i}
                                title={i + 1 + '.  ' + item.name}
                                rightElement={
                                    <TouchableOpacity
                                        onPress={() => {
                                            console.log('select item', item);
                                            var array = this.state.granularPresets;
                                            array.forEach((x, index, object) => {
                                                if (x.name == item.name) {
                                                    object.splice(index, 1);
                                                    console.log('found the same array item', x);
                                                }
                                            });
                                            console.log('after delete', array);
                                            this.setState({granularPresets: array});
                                            var stringofliquid = JSON.stringify(array);
                                            AsyncStorage.setItem('granularpresets', stringofliquid);
                                        }}>
                                        <View>
                                            <Image style={{width: 30, height: 30, resizeMode: 'contain'}}
                                                   source={require('../../assets/images/trash.png')}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                }
                                bottomDivider
                                contentContainerStyle={{marginTop: 2}}
                            />
                        ))}
                    </ScrollView>


                    <TouchableOpacity
                        style={styles.add_button_container}
                        onPress={() => {
                            // this.refresh();
                            this.props.navigation.navigate('AddLiquid', {
                                onGoBack: () => this.refreshL(),
                                currentPreset: {},
                                isUpdate: false,
                                addpresetName: '',
                                targetRateofNitrogen: '',
                                sizeoflawn: '',
                                sizeOfContainer: 0,
                                productAnN: '',
                                productAnP: '',
                                productAnK: '',
                                weightofContainer: '',
                                costPerContainer: '',
                            });

                        }}>
                        <Text style={styles.add_button}>+ Add</Text>
                        <Text style={styles.add_sub_text}>(Liquid)</Text>
                    </TouchableOpacity>
                    <ScrollView style={{width: '100%', backgroundColor: Colors.whiteColor}}>
                        {this.state.liquidPresets.map((item, i) => (
                            <ListItem
                                // containerStyle={{width:'100%',height: 50, backgroundColor:'red'}}
                                Component={TouchableOpacity}
                                onPress={() => {
                                    if (item != null) {
                                        this.props.navigation.navigate('AddLiquid', {
                                            onGoBack: () => this.refreshL(),
                                            currentPreset: item,
                                            isUpdate: true,
                                            addpresetName: item.name,
                                            targetRateofNitrogen: item.targetRateofNitrogen,
                                            sizeoflawn: item.sizeoflawn,
                                            sizeOfContainer: item.sizeOfContainer,
                                            productAnN: item.productAnN,
                                            productAnP: item.productAnP,
                                            productAnK: item.productAnK,
                                            weightofContainer: item.weightofContainer,
                                            costPerContainer: item.costPerContainer,
                                        });

                                        // this.setState({
                                        //   currentPreset: item,
                                        //   isUpdate: true,
                                        //   addpresetName: item.name,
                                        //   targetRateofNitrogen: item.targetRateofNitrogen,
                                        //   sizeoflawn: item.sizeoflawn,
                                        //   sizeOfContainer: item.sizeOfContainer,
                                        //   productAnN: item.productAnN,
                                        //   productAnP: item.productAnP,
                                        //   productAnK: item.productAnK,
                                        //   weightofContainer: item.weightofContainer,
                                        //   costPerContainer: item.costPerContainer,
                                        //   isShowLiquidPreset: true,
                                        // });
                                    }
                                }}
                                key={i}
                                title={i + 1 + '.  ' + item.name}
                                rightElement={
                                    <TouchableOpacity
                                        onPress={() => {
                                            console.log('select item', item);
                                            var array = this.state.liquidPresets;
                                            array.forEach((x, index, object) => {
                                                if (x.name == item.name) {
                                                    object.splice(index, 1);
                                                    console.log('found the same array item', x);
                                                }
                                            });
                                            console.log('after delete', array);
                                            this.setState({liquidPresets: array});
                                            var stringofliquid = JSON.stringify(array);
                                            AsyncStorage.setItem('liquidpresets', stringofliquid);

                                        }}>
                                        <View>
                                            <Image style={{width: 30, height: 30, resizeMode: 'contain'}}
                                                   source={require('../../assets/images/trash.png')}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                }
                                bottomDivider
                                contentContainerStyle={{marginTop: 2}}
                            />
                        ))}
                    </ScrollView>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create(SettingViewStyle);
