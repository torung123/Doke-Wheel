import React, { Component } from 'react';
import { Layout, Card, Stack, FormLayout, TextField, Button, Checkbox, Link, ButtonGroup, Spinner, Banner, InlineError } from '@shopify/polaris';
import { connect } from 'react-redux';
import { actGetMailchimp, actUpdateMailchimp, actCheckMailchimp, actExportFile } from '../actions/index';
import store from '../store/index';
class Mailchimp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mailchimp: {
                active: null,
                apiKey: '',
                listID: '',
                instance: ''
            },
            errorAPI: '',
            errorID: '',
            linkFile: ''
        }
        store.subscribe(() => {
            var { mailchimp } = store.getState().mailchimp;
            var { link } = store.getState().exportFile;
            if (mailchimp != null && this.state.mailchimp.active == null) {
                this.setState({
                    mailchimp: mailchimp
                });
            }
            if (link != null && this.state.linkFile == '') {
                this.setState({
                    linkFile: link.link
                });
            }
        });
    }
    componentDidMount = () => {
        this.props.getMailchimp('doke-apps');
    }
    componentWillReceiveProps(nextProps) {
        if (!this.props.updateMailchimp && nextProps.updateMailchimp && this.state.errorAPI == '' && this.state.errorID == '') {
            this.props.getUpdateMailchimp('doke-apps', this.state.mailchimp);
            this.props.mailchimpUpdated()
        }
    }
    onchangeActive = (value) => {
        const { mailchimp } = this.state;
        mailchimp.active = value;
        this.setState({
            mailchimp
        })
        this.props.onActiveMailchimp()
    }
    onChangeApiKey = (value) => {
        const { mailchimp } = this.state;
        mailchimp.apiKey = value;
        if (value == '') {
            this.setState({
                errorAPI: 'API mailchimp không được để trống!!'
            })
            this.props.onError(true);
        } else {
            this.setState({
                mailchimp,
                errorAPI: ''
            })
            this.props.onError(false);
            this.props.onActiveMailchimp()
        }
    }
    onChangeListID = (value) => {
        const { mailchimp } = this.state;
        mailchimp.listID = value;
        if (value == '') {
            this.setState({
                errorID: 'List ID mailchimp không được để trống!!'
            })
            this.props.onError(true)
        } else {
            this.setState({
                mailchimp,
                errorID: ''
            })
            this.props.onError(false);
            this.props.onActiveMailchimp()
        }
    }
    checkConnectAPI = () => {
        const { mailchimp } = this.state;
        this.props.checkMailchimpConnect(mailchimp.apiKey, mailchimp.listID);
    }
    exportFile = () => {
        this.props.exportFileData('doke-apps')
    }
    render() {
        const { mailchimp } = this.state;
        return (
            <Layout>
                <Layout.AnnotatedSection
                    title="Mailchimp"
                    description={
                        <div>
                            <div>Tự động đồng bộ dữ liệu khách hàng đến mailchimp (tên, email) đã thu thập từ vòng quay</div>
                            <br />
                            <Link url="https://mailchimp.com/help/about-api-keys/" external={true}>Hướng dẫn lấy Api Key</Link>
                            <br />
                            <Link url="https://mailchimp.com/help/find-your-list-id/" external={true}>Hướng dẫn lấy List ID</Link>
                        </div>
                    }
                >
                    <Card sectioned>
                        <Checkbox
                            checked={mailchimp.active}
                            label="Cho phép kết nối đến mailchimp"
                            onChange={this.onchangeActive}
                        />
                        <Stack distribution="fillEvenly">
                            <FormLayout>
                              
                                    <TextField
                                        label="Api Key"
                                        type="text"
                                        value={mailchimp.apiKey}
                                        onChange={this.onChangeApiKey}
                                        helpText=""
                                        multiline
                                        disabled={!mailchimp.active}
                                        error={this.state.errorAPI}
                                    />
                                    <TextField
                                        label="list ID"
                                        type="text"
                                        value={mailchimp.listID}
                                        onChange={this.onChangeListID}
                                        helpText=""
                                        disabled={!mailchimp.active}
                                        error={this.state.errorID}
                                    />

                                    <Button plain onClick={this.checkConnectAPI}>{this.props.mailchimp.isChecking ? <Spinner color="teal" size="small" />:''}Kiểm tra kết nối Mailchimp</Button>
                                    {this.props.mailchimp.checkConnect != null && !this.props.mailchimp.checkConnect.error ? <Banner
                                        title="Kết nối thành công"
                                        status="success"
                                        action={{ content: 'Đăng nhập mailchimp', url: 'https://login.mailchimp.com/', external: true }}
                                    />:''}
                                    {this.props.mailchimp.checkConnect != null && this.props.mailchimp.checkConnect.error ? <InlineError message="Api Key hoặc List ID không hợp lệ!! vui lòng kiểm tra lại" fieldID="myFieldID" />:''}
                                    
                            </FormLayout>
                        </Stack>
                        <hr />
                        <ButtonGroup>
                            <Button size="slim"
                                onClick={this.exportFile}
                                loading={this.props.exportFile.isFetching}
                            >Xuất dữ liệu sang file excel</Button>
                            {this.state.linkFile != '' ? <Link url={this.state.linkFile}>Tải về</Link> : ''}
                        </ButtonGroup>
                    </Card>
                </Layout.AnnotatedSection>
            </Layout>
        );
    }
}

const mapStateToProps = state => {
    return {
        mailchimp: state.mailchimp,
        exportFile: state.exportFile
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        getMailchimp: (shopName) => {
            dispatch(actGetMailchimp(shopName))
        },
        getUpdateMailchimp: (shopName, mailchimp) => {
            dispatch(actUpdateMailchimp(shopName, mailchimp))
        },
        checkMailchimpConnect: (apiKey, listID) => {
            dispatch(actCheckMailchimp(apiKey, listID))
        },
        exportFileData: (shopName) => {
            dispatch(actExportFile(shopName))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Mailchimp);