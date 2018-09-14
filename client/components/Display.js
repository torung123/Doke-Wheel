import React, { Component } from 'react';
import 'rc-color-picker/assets/index.css';
import ColorPicker from 'rc-color-picker';
import { Layout, Card, Stack, FormLayout, TextField, Heading, Checkbox, Select, Button, Link } from '@shopify/polaris';
import DisplayLoading from './snippet/DisplayLoading';
import { connect } from 'react-redux';
import { actGetSetting, actUpdateSetting, actResetCookie } from '../actions/index';
import store from '../store/index';

class Display extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showStatus: null,
            displayOption: {
                logo: '',
                title: '',
                description: '',
                buttonWheelText: '',
                showEmail: null,
                showName: null,
                rules: '',
                titleSuccessAfter: '',
                descSuccessAfter: '',
                titleFailAfter: '',
                descFailAfter: '',
                claimed: {
                    show: null,
                    valuePercent: '',
                    textclaimed: ''
                },
            },
            colorOption: {
                backgroundColor: '',
                textColor: '',
                backgroundButton: '',
                textColorButton: ''
            },
            triggerPlacement: {
                showAfter: '',
                showTime: '',
                timeWheel: '',
                timeNotify: '',
                timedTrigger: null,
                exitTrigger: null
            }
        }
        store.subscribe(() => {
            var {setting} = store.getState().settingDisplay;
            if (setting != null && this.state.showStatus == null) {
                const {
                    showStatus, displayOption, colorOption, triggerPlacement
                } = setting;
                this.setState({
                    showStatus: showStatus,
                    displayOption: displayOption,
                    colorOption: colorOption,
                    triggerPlacement: triggerPlacement
                });
            }
        });
    }
    componentDidMount = () => {
        this.props.getSettingDisplay('doke-apps');
    }
    componentWillReceiveProps(nextProps) {
        // const {
        //     setting
        // } = nextProps.settingDisplay;
        // if (setting != null) {
        //     const {
        //         showStatus, displayOption, colorOption
        //     } = setting;
        //     this.setState({
        //         showStatus: showStatus,
        //         displayOption: displayOption,
        //         colorOption: colorOption
        //     });
        // }
        if ( !this.props.updateSetting && nextProps.updateSetting ) {
            this.props.getUpdateSetting('doke-apps', this.state);
            this.props.settingUpdated()
        }
    }
    onResetCookie = () => {
        this.props.getResetCookie('doke-apps')
    }
    render() {
        if (this.props.settingDisplay.isFetching) return <DisplayLoading />;
        const { showStatus, displayOption, colorOption, triggerPlacement } = this.state;
        return (
            <Layout>
                <Layout.AnnotatedSection
                    title="Hiển thị"
                    description="Cấu hình tiêu đề, mô tả, màu sắc, thời gian hiển thị vòng quay"
                >
                    <Card sectioned>
                        <Checkbox
                            checked={showStatus}
                            label="Hiển thị ứng dụng ngoài giao diện"
                            onChange={this.onchangeStatusApp}
                        />
                        <Stack distribution="fillEvenly">
                            <Heading>Cấu hình chung</Heading>
                            <FormLayout>
                                <FormLayout.Group>
                                    <TextField
                                        label="Nhập link logo hiển thị trên vòng may mắn"
                                        type="text"
                                        value={displayOption.logo}
                                        onChange={this.onChangeLogo}
                                        helpText={<div>Có thể upload logo trong phần cấu hình -> file admin Haravan <Link url="/admin/settings/" external={true}>Ở đây</Link ></div>}
                                        multiline
                                    />
                                    <TextField
                                        label="Tiêu đề chính"
                                        type="text"
                                        value={displayOption.title}
                                        onChange={this.onChangeTitle}
                                        helpText="Sử dụng <br> để xuống hàng"
                                        multiline
                                    />
                                    <TextField
                                        label="Mô tả"
                                        type="text"
                                        value={displayOption.description}
                                        onChange={this.onChangeDescription}
                                        multiline
                                    />
                                    <TextField
                                        label="Tiêu đề nút quay"
                                        type="text"
                                        value={displayOption.buttonWheelText}
                                        onChange={this.onChangeButtonWheelText}
                                    />
                                    <TextField
                                        label="Mô tả luật quay"
                                        type="text"
                                        value={displayOption.rules}
                                        onChange={this.onChangeRules}
                                        multiline
                                    />
                                </FormLayout.Group>
                                <FormLayout.Group>
                                    <TextField
                                        label="Lời mời gọi"
                                        type="text"
                                        value={displayOption.claimed.textclaimed}
                                        onChange={this.onChangeTextClaimed}
                                        multiline
                                        connectedLeft={
                                            <Checkbox
                                                checked={displayOption.claimed.show}
                                                label=""
                                                onChange={this.onChangeClaimedChecked}
                                            />
                                        }
                                    />
                                    <TextField
                                        label="Phần trăm hiển thị thanh trạng thái"
                                        type="number"
                                        value={displayOption.claimed.valuePercent}
                                        onChange={this.onChangeValuePercent}
                                        connectedRight={
                                            <Select label="%" labelHidden options={['%']} />
                                        }
                                    />
                                </FormLayout.Group>
                            </FormLayout>
                        </Stack>
                        <hr />
                        <Stack distribution="fillEvenly">
                            <Heading>Thu thập thông tin</Heading>
                            <FormLayout>
                                <FormLayout.Group>
                                    <Checkbox
                                        checked={displayOption.showName}
                                        label="Thu thập tên khách hàng"
                                        onChange={this.onChangeShowName}
                                    />
                                    <Checkbox
                                        checked={displayOption.showEmail}
                                        label="Thu thập email khách hàng"
                                        onChange={this.onChangeShowEmail}
                                    />
                                </FormLayout.Group>
                            </FormLayout>
                        </Stack>
                        <hr />
                        <Stack distribution="fillEvenly">
                            <Heading>Form quay thành công</Heading>
                            <FormLayout>
                                <FormLayout.Group>
                                    <TextField
                                        label="Tiêu đề"
                                        type="text"
                                        value={displayOption.titleSuccessAfter}
                                        onChange={this.onChangetitleSuccessAfter}
                                        multiline
                                    />
                                    <TextField
                                        label="Mô tả"
                                        type="text"
                                        value={displayOption.descSuccessAfter}
                                        onChange={this.onChangeDescSuccessAfter}
                                        multiline
                                    />
                                </FormLayout.Group>
                            </FormLayout>
                        </Stack>
                        <hr />
                        <Stack distribution="fillEvenly">
                            <Heading>Form quay thất bại</Heading>
                            <FormLayout>
                                <FormLayout.Group>
                                    <TextField
                                        label="Tiêu đề"
                                        type="text"
                                        value={displayOption.titleFailAfter}
                                        onChange={this.onChangeTitleFailAfter}
                                        multiline
                                    />
                                    <TextField
                                        label="Mô tả"
                                        type="text"
                                        value={displayOption.descFailAfter}
                                        onChange={this.onChangeDescFailAfter}
                                        multiline
                                    />
                                </FormLayout.Group>
                            </FormLayout>
                        </Stack>
                        <hr />
                        <Stack distribution="fillEvenly">
                            <Heading>Màu sắc</Heading>
                            <FormLayout>
                                <FormLayout.Group>
                                    <TextField type="text" label="Màu nền" value={colorOption.backgroundColor}
                                        connectedRight={

                                            <ColorPicker
                                                animation=""
                                                color={colorOption.backgroundColor}
                                                onChange={this.onChangeBackgroundColor}
                                            />

                                        }
                                    />
                                    <TextField type="text" label="Màu chữ" value={colorOption.textColor}
                                        connectedRight={

                                            <ColorPicker
                                                animation=""
                                                color={colorOption.textColor}
                                                onChange={this.onChangeTextColor}
                                            />

                                        }
                                    />
                                    <TextField type="text" label="Màu nền nút quay" value={colorOption.backgroundButton}
                                        connectedRight={

                                            <ColorPicker
                                                animation=""
                                                color={colorOption.backgroundButton}
                                                onChange={this.onChangeBackgroundColorButton}
                                            />

                                        }
                                    />
                                    <TextField type="text" label="Màu chữ nút quay" value={colorOption.textColorButton}
                                        connectedRight={

                                            <ColorPicker
                                                animation=""
                                                color={colorOption.textColorButton}
                                                onChange={this.onChangeTextColorButton}
                                            />
                                        }
                                    />
                                </FormLayout.Group>
                            </FormLayout>
                        </Stack>
                        <hr />
                        <Stack distribution="fillEvenly">
                            <Heading>Cấu hình thời gian</Heading>
                            <FormLayout>
                                <FormLayout.Group>
                                    <TextField
                                        label="Thời gian sẽ hiển popup sau khi vào Shop (giây)"
                                        type="number"
                                        value={triggerPlacement.showAfter}
                                        onChange={this.onChangeShowAfter}
                                    />
                                    <TextField
                                        label="Thời gian chờ vòng quay quay xong (giây)"
                                        type="number"
                                        value={triggerPlacement.timeWheel}
                                        onChange={this.onChangeTimeWheel}
                                    />
                                    <TextField
                                        label="Thời gian sẽ không hiển lại popup đối với khách đã quay (ngày)"
                                        type="number"
                                        value={triggerPlacement.showTime}
                                        onChange={this.onChangeShowTime}
                                    />
                                    <TextField
                                        label="Thời gian hiển thị thanh trạng thái đếm ngược sau khi quay (phút)"
                                        type="number"
                                        value={triggerPlacement.timeNotify}
                                        onChange={this.onChangeTimeNotify}
                                    />
                                    <Checkbox
                                        checked={triggerPlacement.timedTrigger}
                                        label="Tự động hiển thị popup sau khoảng thời gian"
                                        onChange={this.onChangeTimedTrigger}
                                    />
                                    <Checkbox
                                        checked={triggerPlacement.exitTrigger}
                                        label="Hiển thị popup khi khách chuẩn bị đóng trình duyệt"
                                        onChange={this.onChangeExitTrigger}
                                    />
                                </FormLayout.Group>
                            </FormLayout>
                            <Heading>Bắt đầu chiến dịch mới! Hiển thị lại popup cho tất cả người dùng</Heading>
                            <Button primary 
                                onClick={this.onResetCookie}
                                loading={this.props.settingDisplay.isResetting}
                            >Xóa cookie đã lưu lại trên máy khách</Button>
                        </Stack>
                    </Card>
                </Layout.AnnotatedSection>
            </Layout>
        );
    }
    onchangeStatusApp = (value) => {
        //var showStatus = this.state.showStatus;
        //showStatus = value;
        //this.forceUpdate();
        this.setState({
            showStatus: value
        })
        this.props.onActiveSetting()
    };
    //displayOtion
    onChangeLogo = (logo) => {
        const { displayOption } = this.state;
        displayOption.logo = logo;
        this.setState({ displayOption });
        this.props.onActiveSetting()
    }
    onChangeTitle = (title) => {
        const { displayOption } = this.state;
        displayOption.title = title;
        this.setState({ displayOption });
        this.props.onActiveSetting()
    };
    onChangeDescription = (description) => {
        const { displayOption } = this.state;
        displayOption.description = description;
        this.setState({ displayOption });
        this.props.onActiveSetting()
    };
    onChangeButtonWheelText = (buttonWheelText) => {
        const { displayOption } = this.state;
        displayOption.buttonWheelText = buttonWheelText;
        this.setState({ displayOption });
        this.props.onActiveSetting()
    };
    onChangeRules = (rules) => {
        const { displayOption } = this.state;
        displayOption.rules = rules;
        this.setState({ displayOption });
        this.props.onActiveSetting()
    };
    onChangetitleSuccessAfter = (titleSuccessAfter) => {
        const { displayOption } = this.state;
        displayOption.titleSuccessAfter = titleSuccessAfter;
        this.forceUpdate();
        this.props.onActiveSetting()
    };
    onChangeDescSuccessAfter = (descSuccessAfter) => {
        const { displayOption } = this.state;
        displayOption.descSuccessAfter = descSuccessAfter;
        this.forceUpdate();
        this.props.onActiveSetting()
    };
    onChangeTitleFailAfter = (titleFailAfter) => {
        const { displayOption } = this.state;
        displayOption.titleFailAfter = titleFailAfter;
        this.forceUpdate();
        this.props.onActiveSetting()
    };
    onChangeDescFailAfter = (descFailAfter) => {
        const { displayOption } = this.state;
        displayOption.descFailAfter = descFailAfter;
        this.forceUpdate();
        this.props.onActiveSetting()
    };
    onChangeClaimedChecked = (value) => {
        const { displayOption } = this.state;
        displayOption.claimed.show = value;
        this.forceUpdate();
        this.props.onActiveSetting()
    }
    onChangeShowName = (value) => {
        const { displayOption } = this.state;
        displayOption.showName = value;
        this.forceUpdate();
        this.props.onActiveSetting()
    }
    onChangeShowEmail = (value) => {
        const { displayOption } = this.state;
        displayOption.showEmail = value;
        this.forceUpdate();
        this.props.onActiveSetting()
    }
    onChangeTextClaimed = (textclaimed) => {
        const { displayOption } = this.state;
        displayOption.claimed.textclaimed = textclaimed;
        this.forceUpdate();
        this.props.onActiveSetting()
    }
    onChangeValuePercent = (valuePercent) => {
        const { displayOption } = this.state;
        if (valuePercent < 0) {
            valuePercent = 0
        }
        if (valuePercent > 100) {
            valuePercent = 100
        }
        displayOption.claimed.valuePercent = valuePercent;
        this.forceUpdate();
        this.props.onActiveSetting()
    }
    //colorOption
    onChangeBackgroundColor = (color) => {
        const { colorOption } = this.state;
        colorOption.backgroundColor = color.color;
        this.setState({ colorOption });
        this.props.onActiveSetting()
    }
    onChangeTextColor = (color) => {
        const { colorOption } = this.state;
        colorOption.textColor = color.color;
        this.setState({ colorOption });
        this.props.onActiveSetting()
    }
    onChangeBackgroundColorButton = (color) => {
        const { colorOption } = this.state;
        colorOption.backgroundButton = color.color;
        this.setState({ colorOption });
        this.props.onActiveSetting()
    }
    onChangeTextColorButton = (color) => {
        const { colorOption } = this.state;
        colorOption.textColorButton = color.color;
        this.setState({ colorOption });
        this.props.onActiveSetting()
    }
    onChangeShowAfter = (showAfter) => {
        const { triggerPlacement } = this.state;
        if (showAfter < 0) {
            showAfter = 0
        }
        triggerPlacement.showAfter = showAfter;
        this.setState({ triggerPlacement });
        this.props.onActiveSetting()
    }
    onChangeShowTime = (showTime) => {
        const { triggerPlacement } = this.state;
        if (showTime < 0) {
            showTime = 0
        }
        triggerPlacement.showTime = showTime;
        this.setState({ triggerPlacement });
        this.props.onActiveSetting()
    }
    onChangeTimeWheel = (timeWheel) => {
        const { triggerPlacement } = this.state;
        if (timeWheel < 0) {
            timeWheel = 0
        }
        triggerPlacement.timeWheel = timeWheel;
        this.setState({ triggerPlacement });
        this.props.onActiveSetting()
    }
    onChangeTimeNotify = (timeNotify) => {
        const { triggerPlacement } = this.state;
        if (timeNotify < 0) {
            timeNotify = 0
        }
        triggerPlacement.timeNotify = timeNotify;
        this.setState({ triggerPlacement });
        this.props.onActiveSetting()
    }
    onChangeTimedTrigger = (timedTrigger) => {
        const { triggerPlacement } = this.state;
        triggerPlacement.timedTrigger = timedTrigger;
        this.setState({ triggerPlacement });
        this.props.onActiveSetting()
    }
    onChangeExitTrigger = (exitTrigger) => {
        const { triggerPlacement } = this.state;
        triggerPlacement.exitTrigger = exitTrigger;
        this.setState({ triggerPlacement });
        this.props.onActiveSetting()
    }
}

const mapStateToProps = state => {
    return {
        settingDisplay: state.settingDisplay,
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        getSettingDisplay: (shopName) => {
            dispatch(actGetSetting(shopName))
        },
        getUpdateSetting: (shopName, setting) => {
            dispatch(actUpdateSetting(shopName, setting))
        },
        getResetCookie: (shopName) => {
            dispatch(actResetCookie(shopName))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Display);