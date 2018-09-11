import React, { Component } from 'react';
import {SkeletonPage, Layout, Card, SkeletonBodyText } from '@shopify/polaris';

class DisplayLoading extends Component {
    render() {
        return (
            <SkeletonPage>
                <Layout>
                    <Layout.AnnotatedSection 
                        title="Hiển thị"
                        description="Cấu hình chữ và màu sắc hiển thị vòng quay"
                    >
                        <Card sectioned title="Cấu hình chung">
                            <SkeletonBodyText />
                        </Card>
                        <Card sectioned title="Form quay thành công">
                            <SkeletonBodyText />
                        </Card>
                        <Card sectioned title="Form quay thất bại">
                            <SkeletonBodyText />
                        </Card>
                        <Card sectioned title="Màu sắc">
                            <SkeletonBodyText />
                        </Card>
                    </Layout.AnnotatedSection>
                </Layout>
            </SkeletonPage>
        );
    }
}

export default DisplayLoading;