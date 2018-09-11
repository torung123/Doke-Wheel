import React, { Component } from 'react';
import { Layout, Card, Stack, DisplayText } from '@shopify/polaris';

class General extends Component {
    constructor(props){
        super(props)
    }
    render() {
        const style = {
            color: '#1a75e6',
            display: 'block',
            textAlign: 'center'
        }
        return (
            <Layout>
                <Layout.AnnotatedSection
                    title="Thống kê"
                    description="Bao gồm các thông tin về thống kê"
                >
                    <Card sectioned>
                        <Stack distribution="fillEvenly">
                            <Card title="Đã hiển thị" sectioned>
                                <DisplayText element="h1" size="large" align="center"><span style={style}>111</span></DisplayText>
                            </Card>
                            <Card title="Đã quay" sectioned>
                                <DisplayText element="h1" size="large"><span style={style}>111</span></DisplayText>
                            </Card>
                            <Card title="Từ chối" sectioned>
                                <DisplayText element="h1" size="large"><span style={style}>111</span></DisplayText>
                            </Card>
                            <Card title="E-mail đã thu thập" sectioned>
                                <DisplayText element="h1" size="large"><span style={style}>111</span></DisplayText>
                            </Card>
                        </Stack>
                    </Card>
                </Layout.AnnotatedSection>
            </Layout>
        );
    }
}

export default General;