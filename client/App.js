import React, {Component} from 'react';
import {
  Layout,
  Page,
  FooterHelp,
  Link,
  AppProvider,
  PageActions
} from '@shopify/polaris';
import General from './components/General';
import Display from './components/Display';
import Slice from './components/Slice';
import './App.css';
import {connect} from 'react-redux';
import UpdateAlert from './components/snippet/updateSuccess';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      disabledSetting: true,
      disabledSlices: true,
      updateSetting: false,
      updateSlices: false,
      updateAlert: false
    }
  }
  onClickSaveButton = () => {
    this.setState({
      updateSetting: true,
      updateSlices: true
    })
  }
  componentDidUpdate(){
    if (this.props.updateSetting.error != null 
        && !this.props.updateSetting.error 
        && this.props.updateSlices.error != null 
        && !this.props.updateSlices.error 
        && !this.state.updateAlert){
          this.setState({
            updateAlert: true
          })
          setTimeout(() => {
            this.setState({
              updateAlert: false
            })
          }, 3000)
        }
  }
  render() {
    return (
      <AppProvider>
        <Page
          title="Doke Wheel"
        >
          <General />
          <br />
          <PageActions
            primaryAction={{
              content: 'Lưu',
              disabled: this.state.disabledSetting && this.state.disabledSlices ? true:false,
              onClick: this.onClickSaveButton,
              loading: this.props.updateSetting.isUpdateSetting && this.props.updateSlices.isUpdateSlices ? true:false
            }}
          />
          <Display updateSetting={this.state.updateSetting} settingUpdated={() => this.setState({updateSetting: false, disabledSetting: true})} onActiveSetting={() => this.setState({disabledSetting: false})}/>
          <hr style={{ margin: '25px 0px' }}/>
          <Slice updateSlices={this.state.updateSlices} slicesUpdated={() => this.setState({updateSlices: false, disabledSlices: true})} onActiveSlices={() => this.setState({disabledSlices: false})}/>
          <PageActions
            primaryAction={{
              content: 'Lưu',
              disabled: this.state.disabledSetting && this.state.disabledSlices ? true:false,
              onClick: this.onClickSaveButton,
              loading: this.props.updateSetting.isUpdateSetting && this.props.updateSlices.isUpdateSlices ? true:false
            }}
          />
          <Layout>
            <Layout.Section>
              <FooterHelp>
                Developed By <Link url="https://doke.vn">DOKE.VN</Link>.
              </FooterHelp>
            </Layout.Section>
          </Layout>
          { this.state.updateAlert ? (<UpdateAlert messageUpdate="Đã lưu" />): '' }
        </Page>
      </AppProvider>
    );
  }
}

const mapStateToProps = state => {
  return {
    updateSetting: state.updateSetting,
    updateSlices: state.updateSlices
  }
}

export default connect(mapStateToProps, null)(App);