import React, { Component } from 'react';
import { Layout, Card, Stack, DisplayText } from '@shopify/polaris';
import StatLoading from './snippet/StatLoading';
import {connect} from 'react-redux';
import { actGetStat } from '../actions/index';
import store from '../store/index';
class General extends Component {
    constructor(props){
        super(props);
        this.state = {
            stat: {
              
            }
        }
        store.subscribe(() => {
            var {stat} = store.getState().stat;
            if (stat != null && Object.keys(this.state.stat).length == 0 ) {
                this.setState({
                    stat: stat
                });
            }
        });
    }
    componentDidMount = () => {
        this.props.getStat('doke-apps');
    }
    render() {
        const style = {
            color: '#1a75e6',
            display: 'block',
            textAlign: 'center'
        }
        if (this.props.stat.isFetching) return <StatLoading />;
        const { stat } = this.state;
        return (
            <Layout>
                <Layout.AnnotatedSection
                    title="Thống kê"
                    description="Bao gồm các thông tin về thống kê"
                >
                    <Card sectioned>
                        <Stack distribution="fillEvenly">
                            <Card title="Đã hiển thị" sectioned>
                                <DisplayText element="h1" size="large" align="center"><span style={style}>{stat.displayed}</span></DisplayText>
                            </Card>
                            <Card title="Đã quay" sectioned>
                                <DisplayText element="h1" size="large"><span style={style}>{stat.wheeled}</span></DisplayText>
                            </Card>
                            <Card title="Từ chối" sectioned>
                                <DisplayText element="h1" size="large"><span style={style}>{stat.refuse}</span></DisplayText>
                            </Card>
                            <Card title="E-mail đã thu thập" sectioned>
                                <DisplayText element="h1" size="large"><span style={style}>{stat.email_count}</span></DisplayText>
                            </Card>
                        </Stack>
                    </Card>
                </Layout.AnnotatedSection>
            </Layout>
        );
    }
}

const mapStateToProps = state => {
    return {
        stat: state.stat
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        getStat: (shopName) => {
            dispatch(actGetStat(shopName))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(General);