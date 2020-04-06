import React, {Component} from 'react';
import {
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Platform,
    Alert,
    View,
    ScrollView,
    AsyncStorage,
    FlatList, ImageBackground,
} from 'react-native';
import Layout from '../../constants/Layout';
import Colors from '../../constants/Colors';
// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

import {KeyboardAccessoryNavigation, KeyboardAccessoryView} from 'react-native-keyboard-accessory'
// eslint-disable-next-line no-unused-vars
import {
    Avatar,
    CheckBox,
    Input,
    ListItem,
    Overlay,
} from 'react-native-elements';
import GranularPageStyle from './GranularPageStyle';


import { StackActions } from '@react-navigation/native';

const LW = Layout.window.width;
const LH = Layout.window.height;
const RateWH = LH / LW;

let inputs = [
    {
        placeholder: 'N',
        name: 'productN',
    },
    {
        keyboardType: 'email-address',
        placeholder: 'P',
        name: 'productP',
    },
    {
        keyboardType: 'numeric',
        placeholder: 'K',
        name: 'productK',
    },
    {
        placeholder: 'Target Rate',
        name: 'targetRate',
    },
    {
        keyboardType: 'numeric',
        placeholder: 'Size of Lawn',
        name: 'sizeofLawn'
    },
    {
        keyboardType: 'numeric',
        placeholder: 'Bag Weight',
        name: 'bagWeight'
    },
    {
        keyboardType: 'numeric',
        placeholder: 'Cost Per Bag',
        name: 'costPerBag'
    },
];

export default class GranularPage extends Component {
    constructor(props) {
        super(props);

        inputs = inputs.map(input => ({
            ref: React.createRef(),
            ...input,
        }));


        const {params} = this.props.navigation.state;
        var isAddNewApplication = false;

        if (params != undefined && params.isAddNewApplication != undefined) {
            isAddNewApplication = params.isAddNewApplication;
        }


        this.state = {

            isAddNewApplication: isAddNewApplication,

            sizeoflawn: '',
            poundsofNitronper: '',
            productAnN: '',
            productAnP: '',
            productAnK: '',
            weightofbags: '',
            costPerBag: '',

            appRateinLBS: '',
            totallbsneeded: '',
            bagsneeded: '',
            totalCost: '',
            totalAppAnofpoundsN: '',
            totalAppAnofpoundsP: '',
            totalAppAnofpoundsK: '',

            isShowOutput: false,
            isShowPresets: false,
            presetArray: [],
            isShowContainer: true,
            isShowAnalysisInfo: false,
            isShowAppDataInfo: false,


            currentPreset: undefined,
            addpresetName: '',

            activeInputIndex: 0,
            nextFocusDisabled: false,
            previousFocusDisabled: false,
            buttonsDisabled: false,
            buttonsHidden: false,


            isShowCreateNewProjectShowIndex: 0,
            isShowProjectList: false,

            newProjectName: '',
            newApplicationName: '',

            granularProjectList: [],
            selectAddProject: {},
            isShowAddApplicationName: false,

        };
    }

    reduce_add_journal() {
        const showindex = this.state.isShowCreateNewProjectShowIndex;
        this.setState({
            isShowCreateNewProjectShowIndex: showindex - 1
        })
    }

    plus_add_journal() {
        const showindex = this.state.isShowCreateNewProjectShowIndex;
        this.setState({
            isShowCreateNewProjectShowIndex: showindex + 1
        })
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


    goToJournal = async (isNewProject) => {
        this.setState({
            isShowOutput: false,
        }, async () => {

            const {params} = this.props.navigation.state;
            var isAddNewApplication = false;

            if (params != undefined && params.isAddNewApplication != undefined) {
                isAddNewApplication = params.isAddNewApplication;
            }

            const newApp = {
                name: this.state.newApplicationName,
                sizeoflawn: this.state.sizeoflawn,
                poundsofNitronper: this.state.poundsofNitronper,
                productAnN: this.state.productAnN,
                productAnP: this.state.productAnP,
                productAnK: this.state.productAnK,
                weightofbags: this.state.weightofbags,
                costPerBag: this.state.costPerBag,
                appRateinLBS: this.state.appRateinLBS,
                totallbsneeded: this.state.totallbsneeded,
                bagsneeded: this.state.bagsneeded,
                totalCost: this.state.totalCost,
                totalAppN: this.state.totalAppAnofpoundsN,
                totalAppP: this.state.totalAppAnofpoundsP,
                totalAppK: this.state.totalAppAnofpoundsK,
            }

            if(isAddNewApplication) {
                const {params} = this.props.navigation.state;
                var currentProject = {};

                if (params != undefined && params.currentProject != undefined) {
                    currentProject = params.currentProject;
                }

                console.log('is add new save application');

                this.props.navigation.navigate('AddProject', {
                    isUpdate: false,
                    newApp: newApp,
                    FromEntry:false,
                    isGranular: true,
                    isNewProject: isNewProject,
                    currentProject: currentProject,
                    projectName: this.state.newProjectName,
                    applicationName: this.state.newApplicationName,
                });
            }else{
                this.props.navigation.navigate('AddProject', {
                    isUpdate: false,
                    newApp: newApp,
                    FromEntry:false,
                    isGranular: true,
                    isNewProject: isNewProject,
                    currentProject: this.state.selectAddProject,
                    projectName: this.state.newProjectName,
                    applicationName: this.state.newApplicationName,
                });
            }
        });

    }

    addGranularPreset() {
        console.log('update currentPreset:', this.state.currentPreset);
        var name = this.state.addpresetName;
        if (name == '' || name == undefined) {
            Alert.alert(
                'Presets Input empty',
                'Please enter all information',
                [
                    {
                        text: 'OK',
                        onPress: () => console.log('Fail'),
                    },
                ],
                {cancelable: false},
            );
            return;
        }
        this.setState({isShowOutput: false});
        // if (this.state.currentPreset == undefined){
        //   name = 'undefine name' + this.state.presetArray.length;
        // } else {
        //   name = this.state.currentPreset.name
        // }

        var preset = {
            name: name,
            sizeoflawn: this.state.sizeoflawn,
            poundsofNitronper: this.state.poundsofNitronper,
            productAnN: this.state.productAnN,
            productAnP: this.state.productAnP,
            productAnK: this.state.productAnK,
            weightofbags: this.state.weightofbags,
            costPerBag: this.state.costPerBag,
        };
        AsyncStorage.getItem('granularpresets').then(data => {
            if (data !== null) {
                var presetarray = JSON.parse(data);
                console.log('the async data ', presetarray);
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

                // presetarray.forEach((x, index, object) => {
                //   if (x.name == this.state.currentPreset.name) {
                //     object.splice(index, 1);
                //     console.log('found the same array item', x);
                //   }
                // })
                console.log('before remove  preset', presetarray);
                presetarray.push(preset);
                this.setState({
                    presetArray: presetarray,
                });
                console.log('after remove  preset', presetarray);
                var stringofPresets = JSON.stringify(presetarray);
                AsyncStorage.setItem('granularpresets', stringofPresets);
            } else {
                var presetarray = [];
                presetarray.push(preset);
                var stringofPresets = JSON.stringify(presetarray);
                AsyncStorage.setItem('granularpresets', stringofPresets);
            }
        });

    }

    getOutputValue() {
        if (
            this.state.poundsofNitronper != '' &&
            this.state.productAnN != '' &&
            this.state.productAnN != '0'
        ) {
            var target =
                (parseFloat(this.state.poundsofNitronper) * 100) /
                parseFloat(this.state.productAnN);
            this.setState({
                appRateinLBS: '' + target.toFixed(2),
            });

            if (this.state.sizeoflawn != '') {
                var target2 = (parseFloat(this.state.sizeoflawn) / 1000) * target;
                this.setState({
                    totallbsneeded: '' + this.decimalFormat(target2.toFixed(2)),
                });

                if (this.state.weightofbags != '' && this.state.weightofbags != '0') {
                    var target3 = target2 / parseFloat(this.state.weightofbags);
                    this.setState({
                        bagsneeded: '' + target3.toFixed(2),
                    });
                    if (this.state.costPerBag != '') {
                        var costperbag = parseFloat(this.state.costPerBag);
                        this.setState({
                            totalCost: '' + (target3 * costperbag).toFixed(2),
                        });
                    }
                }
            }

            if (this.state.productAnP != '') {
                var target2 = (target * parseFloat(this.state.productAnP)) / 100;
                var target1 = target2.toFixed(2);
                this.setState({
                    totalAppAnofpoundsP: '' + target1,
                });
            }

            if (this.state.productAnK != '') {
                var target2 = (target * parseFloat(this.state.productAnK)) / 100;
                var target1 = target2.toFixed(2);
                this.setState({
                    totalAppAnofpoundsK: '' + target1,
                });
            }
        }

        if (this.state.poundsofNitronper) {
            var target = parseFloat(this.state.poundsofNitronper).toFixed(2);
            this.setState({
                totalAppAnofpoundsN: '' + target,
            });
        }
    }

    async componentDidMount(): void {
        AsyncStorage.getItem('granularpresets').then(data => {
            if (data !== null) {
                var presetarray = JSON.parse(data);
                this.setState({presetArray: presetarray});
            }
        });

        await AsyncStorage.getItem('granularprojects').then(data => {
            if (data !== null) {
                var projectarray = JSON.parse(data);
                this.setState({granularProjectList: projectarray});
                console.log('get granular projects :', projectarray);
            }
        });
    }

    navigateToScreen = route => () => {
        this.props.navigation.navigate(route);
    };

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

    onSwipeUp(gestureState) {
        this.setState({myText: 'You swiped up!'});
    }

    onSwipeDown(gestureState) {
        this.setState({myText: 'You swiped down!'});
        // this.setState({isShowContainer: false}, () => {
        //   this.props.navigation.goBack();
        // });
        console.log('you swipe down');
    }

    onSwipeLeft(gestureState) {
        console.log('you swipe left');
        this.setState({myText: 'You swiped left!'});
    }

    onSwipeRight(gestureState) {
        console.log('you swipe right');
        this.setState({myText: 'You swiped right!'});
    }

    onSwipe(gestureName, gestureState) {
        const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
        this.setState({gestureName: gestureName});
        switch (gestureName) {
            case SWIPE_UP:
                this.setState({backgroundColor: 'red'});
                break;
            case SWIPE_DOWN:
                this.setState({backgroundColor: 'green'});
                break;
            case SWIPE_LEFT:
                this.setState({backgroundColor: 'blue'});
                break;
            case SWIPE_RIGHT:
                this.setState({backgroundColor: 'yellow'});
                break;
        }
    }

    decimalFormat(num) {
        return num.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }

    showCalcResult() {
        if (
            this.state.poundsofNitronper != '' &&
            this.state.productAnN != '' &&
            this.state.productAnN != '0'
        ) {
            this.getOutputValue()
            this.setState({
                isShowOutput: true,
            });
        }
    }

    saveApplication() {
        if (
            this.state.poundsofNitronper != '' &&
            this.state.productAnN != '' &&
            this.state.productAnN != '0'
        ) {
            this.getOutputValue()
            this.setState({isShowAddApplicationName:true})
        }else{
            Alert.alert(
                'Please fill all application data.',
                '',
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

    refreshInput() {
        this.setState({
            sizeoflawn: '',
            poundsofNitronper: '',
            productAnN: '',
            productAnP: '',
            productAnK: '',
            weightofbags: '',
            costPerBag: '',

            appRateinLBS: '',
            totallbsneeded: '',
            bagsneeded: '',

            totalCost: '',
            totalAppAnofpoundsN: '',
            totalAppAnofpoundsP: '',
            totalAppAnofpoundsK: '',
        });
    }

    showPresetsLists() {
        if (this.state.presetArray.length > 0) {
            this.setState({isShowPresets: true});
        }
    }

    render() {
        const config = {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80,
        };

        const {params} = this.props.navigation.state;
        var isAddNewApplication = false;

        if (params != undefined && params.isAddNewApplication != undefined) {
            isAddNewApplication = params.isAddNewApplication;
        }

        return (
            <View style={styles.mainContainer}>

                <View style={styles.title_container}>

                    <View style={styles.setting_header}>
                        <Text
                            style={[styles.setting_title, styles.fontTitleHarabaraGranular]}>GRANULAR</Text>
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
                            this.setState({isShowContainer: false}, () => {
                                this.props.navigation.goBack();
                            });
                        }}>
                        <View style={{width: '40%', height: '40%'}}>
                            <Image
                                style={styles.fit_image}
                                source={require('../../assets/images/left.png')}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
                <ScrollView style={{flex: 1}}>
                    <View
                        style={styles.inputContainer}>

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
                                paddingHorizontal: 10,
                                marginBottom: 10,
                                marginTop: 10,
                            }}>
                            <View style={styles.input_share_items}>

                                <Input
                                    containerStyle={styles.containerborder}
                                    inputContainerStyle={{height: 25, borderBottomWidth: 0}}
                                    labelStyle={styles.text_label_input}
                                    inputStyle={[styles.text_input, styles.border_blue]}
                                    paddingTop={5}
                                    paddingBottom={0}
                                    label="N"
                                    key={`0`}
                                    ref={inputs[0].ref}
                                    blurOnSubmit={false}
                                    onFocus={this.handleFocus(0)}
                                    keyboardType={'numeric'}
                                    fontSize={Layout.font.medium_size}
                                    value={this.state.productAnN}
                                    onChangeText={text => {
                                        const filteredText = this.getNumberFormatText(text);
                                        this.setState({productAnN: filteredText});
                                    }}
                                    placeholder="0"
                                />
                            </View>

                            <View style={styles.input_share_items}>
                                <Input
                                    containerStyle={styles.containerborder}
                                    inputContainerStyle={{height: 25, borderBottomWidth: 0}}
                                    labelStyle={styles.text_label_input}
                                    inputStyle={[styles.text_input, styles.border_blue]}
                                    paddingTop={5}
                                    paddingBottom={0}
                                    label="P"
                                    keyboardType={'number-pad'}
                                    key={`1`}
                                    ref={inputs[1].ref}
                                    blurOnSubmit={false}
                                    onFocus={this.handleFocus(1)}
                                    fontSize={Layout.font.medium_size}
                                    value={this.state.productAnP}
                                    onChangeText={text => {
                                        const filteredText = this.getNumberFormatText(text);
                                        this.setState({productAnP: filteredText});
                                    }}
                                    placeholder="0"
                                />
                            </View>

                            <View style={styles.input_share_items}>
                                <Input
                                    containerStyle={styles.containerborder}
                                    inputContainerStyle={{height: 25, borderBottomWidth: 0}}
                                    labelStyle={styles.text_label_input}
                                    inputStyle={[styles.text_input, styles.border_blue]}
                                    paddingTop={5}
                                    paddingBottom={0}
                                    label="K"
                                    key={`2`}
                                    ref={inputs[2].ref}
                                    blurOnSubmit={false}
                                    onFocus={this.handleFocus(2)}
                                    keyboardType={'decimal-pad'}
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

                        <View style={styles.analysis_container}>
                            <Text style={styles.analysis_container_text}>Application Data</Text>
                            <TouchableOpacity
                                style={styles.infobtn_container}
                                onPress={() => {
                                    this.setState({isShowAppDataInfo: true});
                                }}>
                                <Image
                                    style={styles.fit_image}
                                    source={require('../../assets/images/info.png')}
                                />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.app_data_input_container}>
                            <View style={styles.input_share_items}>
                                <Input
                                    containerStyle={styles.containerborder}
                                    inputContainerStyle={{height: 25, borderBottomWidth: 0}}
                                    labelStyle={styles.text_label_input}
                                    inputStyle={styles.text_input}
                                    paddingTop={5}
                                    paddingBottom={0}
                                    key={`3`}
                                    ref={inputs[3].ref}
                                    blurOnSubmit={false}
                                    onFocus={this.handleFocus(3)}
                                    // label='pounds of Nitrogen desired per 1,000 sqft'
                                    keyboardType={'numeric'}
                                    fontSize={Layout.font.medium_size}
                                    value={this.state.poundsofNitronper}
                                    onChangeText={text => {
                                        const filteredText = this.getNumberFormatText(text);
                                        this.setState({poundsofNitronper: filteredText});
                                    }}
                                    placeholder="0"
                                />
                            </View>
                            <Text style={styles.app_data_text}>
                                Target Rate of Nitrogen (N) <Text
                                style={{fontSize: 14}}>(lbs/1,000 sq ft)</Text>
                            </Text>
                        </View>

                        <View style={styles.app_data_input_container}>
                            <View style={styles.input_share_items}>
                                <Input
                                    containerStyle={styles.containerborder}
                                    inputContainerStyle={{height: 25, borderBottomWidth: 0}}
                                    labelStyle={styles.text_label_input}
                                    inputStyle={styles.text_input}
                                    paddingTop={5}
                                    paddingBottom={0}
                                    key={`4`}
                                    ref={inputs[4].ref}
                                    blurOnSubmit={false}
                                    onFocus={this.handleFocus(4)}
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

                        <View style={styles.app_data_input_container}>
                            <View style={styles.input_share_items}>
                                <Input
                                    containerStyle={styles.containerborder}
                                    inputContainerStyle={{height: 25, borderBottomWidth: 0}}
                                    labelStyle={styles.text_label_input}
                                    inputStyle={styles.text_input}
                                    paddingTop={5}
                                    paddingBottom={0}
                                    key={`5`}
                                    ref={inputs[5].ref}
                                    blurOnSubmit={false}
                                    onFocus={this.handleFocus(5)}
                                    keyboardType={'numeric'}
                                    fontSize={Layout.font.medium_size}
                                    value={this.state.weightofbags}
                                    onChangeText={text => {
                                        const filteredText = this.getNumberFormatText(text);
                                        this.setState({weightofbags: filteredText});
                                    }}
                                    placeholder="0"
                                />
                            </View>
                            <Text style={styles.app_data_text}>
                                Bag Weight (lbs)
                            </Text>
                        </View>

                        <View style={styles.app_data_input_container}>
                            <View style={styles.input_share_items}>
                                <Input
                                    containerStyle={styles.containerborder}
                                    inputContainerStyle={{height: 25, borderBottomWidth: 0}}
                                    labelStyle={styles.text_label_input}
                                    inputStyle={styles.text_input}
                                    paddingTop={5}
                                    paddingBottom={0}
                                    key={`6`}
                                    ref={inputs[6].ref}
                                    blurOnSubmit={false}
                                    onFocus={this.handleFocus(6)}
                                    keyboardType={'numeric'}
                                    fontSize={Layout.font.medium_size}
                                    value={this.state.costPerBag}
                                    onChangeText={text => {
                                        const filteredText = this.getNumberFormatText(text);
                                        this.setState({costPerBag: filteredText});
                                    }}
                                    placeholder="0"
                                />
                            </View>
                            <Text style={styles.app_data_text}>* Cost Per Bag ($) <Text
                                style={{fontSize: 14}}>(* with taxes increases accuracy )</Text></Text>
                        </View>
                    </View>
                    {
                        isAddNewApplication ? (
                            <View style={styles.action_bar}>
                                <TouchableOpacity
                                    style={styles.save_application_btn}
                                    onPress={() => {
                                        this.saveApplication();
                                    }}>
                                    <Text style={styles.save_application_btn_text}>Save Application</Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <View style={styles.action_bar}>
                                <TouchableOpacity
                                    style={styles.action_item}
                                    onPress={() => {
                                        this.showPresetsLists();
                                    }}>
                                    <Text style={styles.action_item_text}>Preset</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.action_item, {borderWidth: 0}]}
                                    onPress={() => {
                                        this.refreshInput();
                                    }}>
                                    <Image
                                        style={styles.fit_image}
                                        source={require('../../assets/images/refresh1.png')}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.action_item}
                                    onPress={() => {
                                        this.showCalcResult();
                                    }}>
                                    <Text style={styles.action_item_text}>Calculate</Text>
                                </TouchableOpacity>
                            </View>)
                    }


                </ScrollView>


                <Overlay
                    isVisible={this.state.isShowOutput}
                    windowBackgroundColor="rgba(255, 255, 255, .1)"
                    onBackdropPress={() => this.setState({isShowOutput: false})}
                    overlayBackgroundColor={Colors.whiteColor}
                    overlayStyle={{borderRadius: 15, borderColor: Colors.borderBlueColor, borderWidth: 3}}
                    width={LW - 40}
                    height="auto">
                    <ScrollView style={styles.border_topline}>

                        <View style={styles.app_data_input_container}>
                            <View>
                                <Input
                                    containerStyle={styles.containerborder}
                                    inputContainerStyle={{height: 15, borderBottomWidth: 0}}
                                    labelStyle={styles.text_label_input}
                                    inputStyle={{
                                        borderBottomColor: Colors.textBlackColor,
                                        borderBottomWidth: 2
                                    }}
                                    fontSize={Layout.font.medium_size}
                                    value={this.state.addpresetName}
                                    onChangeText={text => {
                                        this.setState({addpresetName: text});
                                    }}
                                    label={'Enter Preset Name'}
                                />
                            </View>
                            <TouchableOpacity
                                style={styles.headerRightLogo}
                                onPress={() => {
                                    this.setState({isShowCreateNewProjectShowIndex: 1})
                                    // this.goToJournal()
                                }}
                            >
                                <View style={{width: '100%', height: '100%'}}>
                                    <Image
                                        style={styles.fit_image}
                                        source={require('../../assets/images/journal.png')}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={[styles.analysis_container, {marginTop: 20}]}>
                            <Text style={styles.analysis_container_text}>Calculation</Text>
                        </View>
                        <View style={styles.app_rate_container}>
                            <Text style={styles.app_rate_output}>
                                {this.state.appRateinLBS}
                            </Text>
                            <Text style={styles.text_label_output}>Application rate</Text>
                            <Text style={[styles.text_label_output, {fontSize: 14}]}>lbs/1,000 (sq ft)</Text>
                            {/*<Text style={styles.text_label_output}>How much?</Text>*/}
                        </View>

                        <View
                            style={{
                                width: '100%',
                                marginBottom: 0,
                                justifyContent: 'space-around',
                                flexDirection: 'row',
                                marginTop: 15,
                            }}>
                            <View style={styles.output_border}>
                                <Text style={styles.output_normal}>
                                    {this.state.totallbsneeded}
                                </Text>
                                <Text style={styles.text_label_input_for_less_than}>Total lbs</Text>
                            </View>
                            <View style={styles.output_border}>
                                <Text style={styles.output_normal}>
                                    {this.state.bagsneeded}
                                </Text>
                                <Text style={styles.text_label_input_for_less_than}>Total Bags</Text>
                            </View>
                            <View style={styles.output_border}>
                                <Text style={styles.output_normal}>
                                    {this.state.totalCost}
                                </Text>
                                <Text style={styles.text_label_input_for_less_than}>Est. Total Cost</Text>
                            </View>

                        </View>

                        {/*<Text style={styles.text_less_than}>*/}
                        {/*  (less than 1 is equivalent to 1 bag or less)*/}
                        {/*</Text>*/}

                        <View style={styles.output_bigcontainer}>

                            <Text style={styles.text_output_subtitle}>
                                Total Application Analysis
                            </Text>
                            <View
                                style={{
                                    width: '100%',
                                    justifyContent: 'space-around',
                                    flexDirection: 'row',
                                    marginTop: 5,
                                }}>
                                <View style={styles.output_border}>
                                    <Text style={styles.output_normal}>
                                        {this.state.totalAppAnofpoundsN}
                                    </Text>
                                    <Text style={styles.text_label_input}>N</Text>
                                </View>

                                <View style={styles.output_border}>
                                    <Text style={styles.output_normal}>
                                        {this.state.totalAppAnofpoundsP}
                                    </Text>
                                    <Text style={styles.text_label_input}>P</Text>
                                </View>

                                <View style={styles.output_border}>
                                    <Text style={styles.output_normal}>
                                        {this.state.totalAppAnofpoundsK}
                                    </Text>
                                    <Text style={styles.text_label_input}>K</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.output_save_container}>
                            <TouchableOpacity
                                style={[styles.action_item, {marginRight: 10}]}
                                onPress={() => {
                                    this.setState({isShowOutput: false});
                                }}>
                                <Text style={styles.action_item_text}>Back</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.action_item}
                                onPress={() => {
                                    this.addGranularPreset();

                                }}>
                                <Text style={styles.action_item_text}>Save</Text>
                            </TouchableOpacity>
                        </View>

                    </ScrollView>
                </Overlay>

                <Overlay
                    isVisible={this.state.isShowPresets}
                    windowBackgroundColor="rgba(255, 255, 255, .1)"
                    onBackdropPress={() => this.setState({isShowPresets: false})}
                    overlayBackgroundColor={Colors.lightGrayBkColor}
                    overlayStyle={{borderRadius: 15, borderColor: Colors.borderBlueColor, borderWidth: 3}}
                    width={LW - 40}
                    height="auto">
                    <ScrollView style={{backgroundColor: Colors.whiteColor}}>
                        {this.state.presetArray.map((item, i) => (
                            <ListItem
                                Component={TouchableOpacity}
                                onPress={() => {
                                    if (item != null) {
                                        this.setState(
                                            {
                                                currentPreset: item,
                                                // addpresetName: item.name,
                                                isShowPresets: false,
                                                sizeoflawn: item.sizeoflawn,
                                                poundsofNitronper: item.poundsofNitronper,
                                                productAnN: item.productAnN,
                                                productAnP: item.productAnP,
                                                productAnK: item.productAnK,
                                                weightofbags: item.weightofbags,
                                                costPerBag: item.costPerBag,
                                            },
                                            () => {
                                                this.getOutputValue();
                                            },
                                        );
                                    } else {
                                        this.setState({
                                            isShowPresets: false,
                                        });
                                    }
                                }}
                                key={i}
                                title={i + 1 + '.  ' + item.name}
                                bottomDivider
                            />
                        ))}
                    </ScrollView>
                </Overlay>


                <Overlay
                    isVisible={this.state.isShowProjectList}
                    windowBackgroundColor="rgba(255, 255, 255, .1)"
                    onBackdropPress={() => this.setState({isShowProjectList: false})}
                    overlayBackgroundColor={Colors.lightGrayBkColor}
                    overlayStyle={{borderRadius: 15, borderColor: Colors.borderBlueColor, borderWidth: 3}}
                    width={LW - 40}
                    height="auto">
                    <ScrollView style={{backgroundColor: Colors.whiteColor}}>
                        {this.state.granularProjectList.map((item, i) => (
                            <ListItem
                                Component={TouchableOpacity}
                                onPress={() => {
                                    if (item != null) {
                                        this.setState(
                                            {
                                                isShowProjectList: false,
                                                selectAddProject: item,
                                                isShowAddApplicationName: true,
                                            }
                                        );
                                    } else {
                                        this.setState({
                                            isShowPresets: false,
                                        });
                                    }
                                }}
                                key={i}
                                title={i + 1 + '.  ' + item.name}
                                bottomDivider
                            />
                        ))}
                    </ScrollView>
                </Overlay>

                <Overlay
                    isVisible={this.state.isShowCreateNewProjectShowIndex === 1}
                    windowBackgroundColor="rgba(255, 255, 255, .1)"
                    overlayBackgroundColor={Colors.lightGrayBkColor}
                    overlayStyle={{borderRadius: 10, borderColor: Colors.borderBlueColor, borderWidth: 1}}
                    width={LW - 60}
                    height="auto">

                    <View style={styles.journal_select_container}>
                        <TouchableOpacity
                            style={styles.journal_select_btn}
                            onPress={() => {
                                if (this.state.granularProjectList.length > 0) {
                                    this.setState({
                                        isShowCreateNewProjectShowIndex: 0,
                                        isShowProjectList: true
                                    });
                                }
                            }}>
                            <Text style={styles.journal_select_btn_text}>Add to Project</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.journal_select_btn}
                            onPress={() => {
                                this.plus_add_journal()
                            }}>
                            <Text style={styles.journal_select_btn_text}>Create New Project</Text>
                        </TouchableOpacity>

                    </View>
                    <View style={styles.journal_select_container}>
                        <TouchableOpacity
                            style={styles.journal_select_btn}
                            onPress={() => {
                                this.reduce_add_journal()
                            }}>
                            <Text style={styles.journal_select_btn_text}>CANCEL</Text>
                        </TouchableOpacity>
                    </View>
                </Overlay>


                <Overlay
                    isVisible={this.state.isShowCreateNewProjectShowIndex === 2}
                    windowBackgroundColor="rgba(255, 255, 255, .1)"
                    overlayBackgroundColor={Colors.lightGrayBkColor}
                    overlayStyle={{borderRadius: 10, borderColor: Colors.borderBlueColor, borderWidth: 1}}
                    width={LW - 60}
                    height="auto">
                    <View style={styles.journal_select_container}>
                        <Text style={styles.journal_select_btn_text}>Enter New Project Name:</Text>
                    </View>
                    <View style={styles.journal_select_container}>
                        <Input
                            containerStyle={styles.containerborder}
                            inputContainerStyle={{height: 15, borderBottomWidth: 0}}
                            labelStyle={styles.text_label_input}
                            inputStyle={{
                                borderBottomColor: Colors.textBlackColor,
                                borderBottomWidth: 2
                            }}
                            fontSize={Layout.font.medium_size}
                            value={this.state.newProjectName}
                            onChangeText={text => {
                                this.setState({newProjectName: text});
                            }}
                        />
                    </View>
                    <View style={styles.journal_select_container}>
                        <TouchableOpacity
                            style={styles.journal_select_btn}
                            onPress={() => {
                                this.reduce_add_journal()
                            }}>
                            <Text style={styles.journal_select_btn_text}>BACK</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.journal_select_btn}
                            onPress={() => {
                                if (this.state.newProjectName != '') {
                                    this.plus_add_journal()
                                }

                            }}>
                            <Text style={styles.journal_select_btn_text}>SAVE</Text>
                        </TouchableOpacity>
                    </View>
                </Overlay>


                <Overlay
                    isVisible={this.state.isShowCreateNewProjectShowIndex === 3}
                    windowBackgroundColor="rgba(255, 255, 255, .1)"
                    overlayBackgroundColor={Colors.lightGrayBkColor}
                    overlayStyle={{borderRadius: 10, borderColor: Colors.borderBlueColor, borderWidth: 1}}
                    width={LW - 60}
                    height="auto">
                    <View style={styles.journal_select_container}>
                        <Text style={styles.journal_select_btn_text}>Enter Application Name:</Text>
                    </View>
                    <View style={styles.journal_select_container}>
                        <Input
                            containerStyle={styles.containerborder}
                            inputContainerStyle={{height: 15, borderBottomWidth: 0}}
                            labelStyle={styles.text_label_input}
                            inputStyle={{
                                borderBottomColor: Colors.textBlackColor,
                                borderBottomWidth: 2
                            }}
                            fontSize={Layout.font.medium_size}
                            value={this.state.newApplicationName}
                            onChangeText={text => {
                                this.setState({newApplicationName: text});
                            }}
                        />
                    </View>
                    <View style={styles.journal_select_container}>
                        <TouchableOpacity
                            style={styles.journal_select_btn}
                            onPress={() => {
                                this.reduce_add_journal()
                            }}>
                            <Text style={styles.journal_select_btn_text}>BACK</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.journal_select_btn}
                            onPress={() => {
                                if (this.state.newApplicationName != '') {
                                    this.setState({
                                        isShowCreateNewProjectShowIndex: 0
                                    }, () => {
                                        this.goToJournal(true)
                                    });

                                }

                            }}>
                            <Text style={styles.journal_select_btn_text}>SAVE</Text>
                        </TouchableOpacity>
                    </View>
                </Overlay>


                <Overlay
                    isVisible={this.state.isShowAddApplicationName}
                    windowBackgroundColor="rgba(255, 255, 255, .1)"
                    overlayBackgroundColor={Colors.lightGrayBkColor}
                    overlayStyle={{borderRadius: 10, borderColor: Colors.borderBlueColor, borderWidth: 1}}
                    width={LW - 60}
                    height="auto">
                    <View style={styles.journal_select_container}>
                        <Text style={styles.journal_select_btn_text}>Enter Application Name:</Text>
                    </View>
                    <View style={styles.journal_select_container}>
                        <Input
                            containerStyle={styles.containerborder}
                            inputContainerStyle={{height: 15, borderBottomWidth: 0}}
                            labelStyle={styles.text_label_input}
                            inputStyle={{
                                borderBottomColor: Colors.textBlackColor,
                                borderBottomWidth: 2
                            }}
                            fontSize={Layout.font.medium_size}
                            value={this.state.newApplicationName}
                            onChangeText={text => {
                                this.setState({newApplicationName: text});
                            }}
                        />
                    </View>
                    <View style={styles.journal_select_container}>

                        <TouchableOpacity
                            style={styles.journal_select_btn}
                            onPress={() => {
                                this.setState({isShowAddApplicationName: false})
                            }}>
                            <Text style={styles.journal_select_btn_text}>BACK</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.journal_select_btn}
                            onPress={() => {
                                if (this.state.newApplicationName != '') {
                                    this.setState({isShowAddApplicationName: false}, () => {
                                        this.goToJournal(false)
                                    })
                                }
                            }}>
                            <Text style={styles.journal_select_btn_text}>SAVE</Text>
                        </TouchableOpacity>
                    </View>
                </Overlay>

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
                            potassium (K) in the fertilizer you selected. For example, 24-1-8 would be the
                            percentages of N-P-K.
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
                <Overlay
                    isVisible={this.state.isShowAppDataInfo}
                    windowBackgroundColor="rgba(255, 255, 255, .1)"
                    onBackdropPress={() => this.setState({isShowAppDataInfo: false})}
                    overlayBackgroundColor={Colors.lightGrayBkColor}
                    overlayStyle={{borderRadius: 10, borderColor: Colors.borderBlueColor, borderWidth: 1}}
                    width={LW - 40}
                    height="auto"
                    maxHeight={LH - 40}
                >
                    <ScrollView style={styles.fit_parent}>
                        <Text style={styles.info_title_text}>Granular Application Data</Text>
                        <Text style={styles.info_content_text}>
                            <Text style={styles.info_content_emphasize_text}>Target Rate of Nitrogen</Text> – This
                            represents
                            the desired amount of nitrogen you actually intend to apply per 1000 sq ft
                        </Text>
                        <Text style={styles.info_content_text}>
                            <Text style={styles.info_content_emphasize_text}>Size of Lawn</Text> – The total surface
                            area
                            (sq.ft) of your lawn.This is required in order to determine how much product you
                            will need. Refer to Tips Section for ways to figure out lawn size.
                        </Text>
                        <Text style={styles.info_content_text}>
                            <Text style={styles.info_content_emphasize_text}>Bag Weight</Text> – The total weight of
                            your
                            liquid fertilizer (in lbs). This is commonly found on the front of the container
                            near the bottom.
                        </Text>
                        <Text style={styles.info_content_text}>
                            <Text style={styles.info_content_emphasize_text}>Cost per bag</Text> – Retail cost of each
                            bag.
                            Optional to include taxes to increase accuracy.
                        </Text>
                        <Text style={styles.info_content_text}>
                            <Text style={styles.info_content_emphasize_text}>Soil Testing</Text> – Soil testing your
                            lawn can
                            prevent unnecessary fertilizer applications. It will indicate you what nutrients
                            your soil contains and lacks. Knowing the pH of the soil is also important to
                            understand the available nutrients in your lawn.
                        </Text>

                        <Text style={styles.info_last_content_text}>
                            *Disclaimer Turf Therapy LLC does NOT accept responsibility for any loss which may occur
                            from reliance on the software or materials published in this application.
                        </Text>
                        <View style={styles.info_btn_container}>
                            <TouchableOpacity
                                style={[styles.info_ok_btn, {marginRight: 10}]}
                                onPress={() => {
                                    this.setState({isShowAppDataInfo: false});
                                }}>
                                <Text style={styles.action_item_text}>OK</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
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

const styles = StyleSheet.create(GranularPageStyle);
