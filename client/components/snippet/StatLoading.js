import React, { Component } from 'react';
import {SkeletonPage, Layout, Card, SkeletonBodyText } from '@shopify/polaris';


class StatLoading extends Component {
    render() {
        return (
          
                <Layout>
                    <Layout.AnnotatedSection 
                        title="Thống kê"
                        description="Bao gồm các thông tin về thống kê"
                    >
                        <Card sectioned title="">
                            <SkeletonBodyText />
                        </Card>
                    </Layout.AnnotatedSection>
                </Layout>
        
        );
    }
}

export default StatLoading;