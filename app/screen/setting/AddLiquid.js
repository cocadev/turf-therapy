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

let inputs = [
    {
        placeholder: 'Preset Name',
        name: 'presetName',
    },
    {
        keyboardType: 'numeric',
        placeholder: 'Size of Lawn',
        name: 'sizeofLawn'
    },
    {
        placeholder: 'N',
        name: 'productN',
    },
    {
        keyboardType: 'numeric',
        placeholder: 'P',
        name: 'productP',
    },
    {
        keyboardType: 'numeric',
        placeholder: 'K',
        name: 'productK',
    },
    {
        keyboardType: 'numeric',
        placeholder: 'Container Weight',
        name: 'containerWeight'
    },
    {
        keyboardType: 'numeric',
        placeholder: 'Cost Per Container',
        name: 'costPerContainer'
    },
];


export default class AddLiquid extends Component {
    constructor(props) {
        super(props);

        inputs = inputs.map(input => ({
            ref: React.createRef(),
            ...input,
        }));

        const { params } = this.props.navigation.state;

        this.state = {
            sizeoflawn: params.sizeoflawn,
            poundsofNitronper: '',
            productAnN: params.productAnN,
            productAnP: params.productAnP,
            productAnK: params.productAnK,
            weightofbags: '',
            costPerBag: '',

            targetRateofNitrogen: params.targetRateofNitrogen,
            weightofContainer: params.weightofContainer,
            sizeOfContainer: params.sizeOfContainer,
            costPerContainer: params.costPerContainer,

            addpresetName: params.addpresetName,
            netweightofpounds: '',
            liquidPresets: [],
            granularPresets: [],
            isShowAnalysisInfo: false,
            currentPreset: params.currentPreset,
            isUpdate: params.isUpdate,

            activeInputIndex: 0,
            nextFocusDisabled: false,
            previousFocusDisabled: false,
            buttonsDisabled: false,
            buttonsHidden: false,
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

    componentDidMount(): void {

    }

    handleFocus = index => () => {
        this.setState({
            nextFocusDisabled: index === inputs.length - 1,
            previousFocusDisabled: index === 0,
            activeInputIndex: index,
        });
    }

    handleFocusNext = () => {
        const {nextFocusDisabled, activeInputIndex} = this.state;

        if (nextFocusDisabled) {
            return;
        }
        inputs[activeInputIndex + 1].ref.current.focus();
    }

    handleFocusPrevious = () => {
        const {previousFocusDisabled, activeInputIndex} = this.state;
        if (previousFocusDisabled) {
            return;
        }

        inputs[activeInputIndex - 1].ref.current.focus();
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
    addAsyncItem = async (data) => {
        var preset = {
            name: this.state.addpresetName,
            sizeoflawn: this.state.sizeoflawn,
            targetRateofNitrogen: this.state.targetRateofNitrogen,
            productAnN: this.state.productAnN,
            productAnP: this.state.productAnP,
            productAnK: this.state.productAnK,
            weightofContainer: this.state.weightofContainer,
            sizeOfContainer: this.state.sizeOfContainer,
            costPerContainer: this.state.costPerContainer,
        };
        console.log('add preset:', preset);
        if (data !== null) {
            var presetarray = JSON.parse(data);
            // if (presetarray.length >= 4) {
            //   Alert.alert(
            //     'Preset Limit Reached',
            //     '',
            //     [
            //       {
            //         text: 'OK',
            //         onPress: () => console.log('Fail'),
            //       },
            //     ],
            //     {cancelable: false},
            //   );
            //   return;
            // }
            if (this.state.isUpdate) {
                presetarray.forEach((x, index, object) => {
                    if (x.name == this.state.currentPreset.name) {
                        object.splice(index, 1);
                        console.log('found the same array item', x);
                    }
                });
            }
            presetarray.push(preset);
            this.setState({
                liquidPresets: presetarray,
            });
            var stringofPresets = JSON.stringify(presetarray);
            await AsyncStorage.setItem('liquidpresets', stringofPresets);
            await this.props.navigation.state.params.onGoBack();
            this.setState({isUpdate: false});
            this.props.navigation.goBack()

        } else {
            var presetarray = [];
            presetarray.push(preset);
            this.setState({granularPresets: presetarray});
            var stringofPresets = JSON.stringify(presetarray);
            await AsyncStorage.setItem('liquidpresets', stringofPresets);
            await this.props.navigation.state.params.onGoBack();
            this.props.navigation.goBack()
        }
    }


    addLiquidPreset() {
        if (this.state.addpresetName != '') {
            AsyncStorage.getItem('liquidpresets').then(data => this.addAsyncItem(data));
        } else {
            Alert.alert(
                'Presets Name empty',
                'Please enter all information',
                [
                    {
                        text: 'OK',
                        onPress: () => console.log('Fail'),
                    },
                ],
                {cancelable: false},
            );
        }
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <View style={styles.title_container}>

                    <View style={styles.setting_header}>
                        <Text style={[styles.setting_title, styles.fontforSubtitle]}>LIQUID</Text>
                    </View>
                    <View
                        style={styles.headerRightLogo}>
                        <View style={{width: '90%', height: '90%'}}>
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
                        <View style={{width: '30%', height: '30%'}}>
                            <Image
                                style={styles.fit_image}
                                source={require('../../assets/images/left.png')}
                            />
                        </View>
                    </TouchableOpacity>
                </View>

                <ScrollView contentContainerStyle={{flex: 1}}>
                    <View style={styles.add_preset_container}>
                        <View style={styles.add_preset_input_container}>
                            <View contentContainerStyle={{flex: 1}}>
                                <View style={styles.app_data_input_container}>
                                    <View>
                                        <Input
                                            inputContainerStyle={{borderBottomWidth: 0}}
                                            labelStyle={[styles.text_label_input, {marginBottom: 2}]}
                                            inputStyle={{
                                                borderBottomColor: Colors.textBlackColor,
                                                marginVertical: 0,
                                                paddingVertical: 0,
                                                borderBottomWidth: 2,
                                            }}
                                            key = {`0`}
                                            ref = {inputs[0].ref}
                                            blurOnSubmit={false}
                                            onFocus={this.handleFocus(0)}
                                            fontSize={Layout.font.medium_size}
                                            value={this.state.addpresetName}
                                            onChangeText={text => {
                                                this.setState({addpresetName: text});
                                            }}
                                            label={'Enter your preset name'}
                                        />
                                    </View>
                                </View>

                                <View style={styles.app_data_input_container}>
                                    <View style={styles.input_add_preset}>
                                        <Input
                                            containerStyle={styles.containerborder}
                                            inputContainerStyle={{borderBottomWidth: 0}}
                                            labelStyle={styles.text_label_input}
                                            inputStyle={styles.text_input}
                                            paddingTop={5}
                                            paddingBottom={0}
                                            key = {`1`}
                                            ref = {inputs[1].ref}
                                            blurOnSubmit={false}
                                            onFocus={this.handleFocus(1)}
                                            keyboardType={'numeric'}
                                            fontSize={Layout.font.medium_size}
                                            value={this.state.sizeoflawn}
                                            onChangeText={text => {
                                                const filteredText = this.getNumberFormatText(text);
                                                this.setState({sizeoflawn: filteredText});
                                            }}
                                            placeholder="0"
                                        />
                                    </View>
                                    <Text style={styles.app_data_text}>
                                        Size of Lawn (sq ft)
                                    </Text>
                                </View>

                                <View style={styles.analysis_container}>
                                    <Text style={styles.analysis_container_text}>
                                        Product Analysis
                                    </Text>
                                    <TouchableOpacity
                                        style={styles.infobtn_container}
                                        onPress={() => {
                                            this.setState({isShowAnalysisInfo: true});
                                        }}>
                                        <Image
                                            style={styles.fit_image}
                                            source={require('../../assets/images/info.png')}
                                        />
                                    </TouchableOpacity>
                                </View>

                                <View
                                    style={{
                                        justifyContent: 'space-around',
                                        flexDirection: 'row',
                                        marginBottom: 10,
                                        marginTop: 10,
                                    }}>
                                    <View style={styles.input_add_preset}>
                                        <Input
                                            containerStyle={styles.containerborder}
                                            inputContainerStyle={{borderBottomWidth: 0}}
                                            labelStyle={styles.text_label_input}
                                            inputStyle={styles.text_input}
                                            paddingTop={5}
                                            paddingBottom={0}
                                            label="N"
                                            keyboardType={'numeric'}
                                            key = {`2`}
                                            ref = {inputs[2].ref}
                                            blurOnSubmit={false}
                                            onFocus={this.handleFocus(2)}
                                            fontSize={Layout.font.medium_size}
                                            value={this.state.productAnN}
                                            onChangeText={text => {
                                                const filteredText = this.getNumberFormatText(text);
                                                this.setState({productAnN: filteredText});
                                            }}
                                            placeholder="0"
                                        />
                                    </View>

                                    <View style={styles.input_add_preset}>
                                        <Input
                                            containerStyle={styles.containerborder}
                                            inputContainerStyle={{borderBottomWidth: 0}}
                                            labelStyle={styles.text_label_input}
                                            inputStyle={styles.text_input}
                                            paddingTop={5}
                                            paddingBottom={0}
                                            label="P"
                                            keyboardType={'numeric'}
                                            key = {`3`}
                                            ref = {inputs[3].ref}
                                            blurOnSubmit={false}
                                            onFocus={this.handleFocus(3)}
                                            fontSize={Layout.font.medium_size}
                                            value={this.state.productAnP}
                                            onChangeText={text => {
                                                const filteredText = this.getNumberFormatText(text);
                                                this.setState({productAnP: filteredText});
                                            }}
                                            placeholder="0"
                                        />
                                    </View>

                                    <View style={styles.input_add_preset}>
                                        <Input
                                            containerStyle={styles.containerborder}
                                            inputContainerStyle={{borderBottomWidth: 0}}
                                            labelStyle={styles.text_label_input}
                                            inputStyle={styles.text_input}
                                            paddingTop={5}
                                            paddingBottom={0}
                                            label="K"
                                            keyboardType={'numeric'}
                                            key = {`4`}
                                            ref = {inputs[4].ref}
                                            blurOnSubmit={false}
                                            onFocus={this.handleFocus(4)}
                                            fontSize={Layout.font.medium_size}
                                            value={this.state.productAnK}
                                            onChangeText={text => {
                                                const filteredText = this.getNumberFormatText(text);
                                                this.setState({productAnK: filteredText});
                                            }}
                                            placeholder="0"
                                        />
                                    </View>
                                </View>


                                <View
                                    style={{
                                        marginTop: 40,
                                    }}>

                                    <View style={styles.app_data_input_container}>
                                        <View style={styles.input_add_preset}>
                                            <Input
                                                containerStyle={styles.containerborder}
                                                inputContainerStyle={{borderBottomWidth: 0}}
                                                labelStyle={styles.text_label_input}
                                                inputStyle={styles.text_input}
                                                paddingTop={5}
                                                paddingBottom={0}
                                                key = {`5`}
                                                ref = {inputs[5].ref}
                                                blurOnSubmit={false}
                                                onFocus={this.handleFocus(5)}
                                                keyboardType={'numeric'}
                                                fontSize={Layout.font.medium_size}
                                                value={this.state.weightofContainer}
                                                onChangeText={text => {
                                                    const filteredText = this.getNumberFormatText(text);
                                                    this.setState({weightofContainer: filteredText});
                                                }}
                                                placeholder="0"
                                            />
                                        </View>
                                        <Text style={styles.app_data_text}>
                                            Container Weight (lbs)
                                        </Text>
                                    </View>

                                    <View style={styles.app_data_input_container}>
                                        <View style={styles.input_add_preset}>
                                            <Input
                                                containerStyle={styles.containerborder}
                                                inputContainerStyle={{borderBottomWidth: 0}}
                                                labelStyle={styles.text_label_input}
                                                inputStyle={styles.text_input}
                                                paddingTop={5}
                                                paddingBottom={0}
                                                keyboardType={'numeric'}
                                                key = {`6`}
                                                ref = {inputs[6].ref}
                                                blurOnSubmit={false}
                                                onFocus={this.handleFocus(6)}
                                                fontSize={Layout.font.medium_size}
                                                value={this.state.costPerContainer}
                                                onChangeText={text => {
                                                    const filteredText = this.getNumberFormatText(text);
                                                    this.setState({costPerContainer: filteredText});
                                                }}
                                                placeholder="0"
                                            />
                                        </View>
                                        <Text style={styles.app_data_text}>* Cost Per Container ($) <Text style={{fontSize: 14}}>(* with taxes
                                            increases accuracy )</Text></Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={styles.add_preset_action_container}>
                            <TouchableOpacity
                                style={[styles.action_item, {marginRight: 10}]}
                                onPress={() => {
                                    this.setState({isShowLiquidPreset: false});
                                }}>
                                <Text style={styles.action_item_text}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.action_item}
                                onPress={() => {
                                    this.addLiquidPreset();
                                }}>
                                {
                                    this.state.isUpdate ? (<Text style={styles.action_item_text}>Save</Text>) : (
                                        <Text style={styles.action_item_text}>Add</Text>)
                                }
                            </TouchableOpacity>
                        </View>

                    </View>
                </ScrollView>

                <Overlay
                    isVisible={this.state.isShowAnalysisInfo}
                    windowBackgroundColor="rgba(255, 255, 255, .1)"
                    onBackdropPress={() => this.setState({isShowAnalysisInfo: false})}
                    overlayBackgroundColor={Colors.lightGrayBkColor}
                    overlayStyle={{borderRadius: 10, borderColor: Colors.borderBlueColor, borderWidth: 1}}
                    width={LW - 60}
                    height="auto">
                    <View style={styles.fit_parent}>
                        <Text style={styles.info_title_text}>Product Analysis</Text>
                        <Text style={styles.info_content_text}>
                            Enter the amounts (%) of nitrogen (N), phosphorus (P), and
                            potassium (K) in the fertilizer you selected. For example, 24-1-8 would be the percentages of N-P-K.
                        </Text>
                        <View style={styles.info_btn_container}>
                            <TouchableOpacity
                                style={styles.info_ok_btn}
                                onPress={() => {
                                    this.setState({isShowAnalysisInfo: false});
                                }}>
                                <Text style={styles.action_item_text}>OK</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </Overlay>

                <KeyboardAccessoryNavigation
                    avoidKeyboard={true}
                    androidAdjustResize
                    nextDisabled={this.state.nextFocusDisabled}
                    previousDisabled={this.state.previousFocusDisabled}
                    nextHidden={this.state.buttonsHidden}
                    previousHidden={this.state.buttonsHidden}
                    onNext={this.handleFocusNext}
                    onPrevious={this.handleFocusPrevious}
                />

            </View>
        );
    }
}

const styles = StyleSheet.create(SettingViewStyle);
