import React, {Component} from 'react';
import {
  Layout,
  Page,
  FooterHelp,
  Link,
  AppProvider,
  PageActions
} from '@shopify/polaris';
import { ToastContainer, toast } from 'react-toastify';
import General from './components/General';
import Display from './components/Display';
import Slice from './components/Slice';
import Mailchimp from './components/Mailchimp';
import 'react-toastify/dist/ReactToastify.min.css';
import './App.css';
import bannerWheel from './banner.png';
import {connect} from 'react-redux';
import UpdateAlert from './components/snippet/updateSuccess';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      disabledSetting: true,
      disabledSlices: true,
      disabledMailchimp: true,
      updateSetting: false,
      updateSlices: false,
      updateMailchimp: false,
      updateAlert: false,
      clickSave: false,
      error: false
    }
  }
  onClickSaveButton = () => {
    this.setState({
      updateSetting: !this.state.disabledSetting,
      updateSlices: !this.state.disabledSlices,
      updateMailchimp: !this.state.disabledMailchimp,
    })
  }
  componentDidUpdate(){
    if (!this.state.updateAlert
        && !this.state.error
        && this.state.clickSave
        //&&this.props.updateSetting.error != null 
        //&& !this.props.updateSetting.error 
        //&& this.props.updateSlices.error != null 
        //&& !this.props.updateSlices.error
        &&(this.props.updateSetting.error != null || this.props.updateSlices.error != null || this.props.updateMailchimp.error != null )

        && (this.state.disabledSetting || this.state.disabledSlices || this.state.disabledMailchimp)
        //&& this.state.disabledSlices
        ){
          this.setState({
            updateAlert: true
          })
        }
    if (this.state.updateAlert)
      toast.success("Đã lưu", { autoClose: 3000 })
    if (this.state.error)
      toast.error("Có lỗi", { autoClose: 3000 })
  }
  render() {
    return (
      <AppProvider>
        <Page
          title=""
        >
          <img className="bannerWheel" src={bannerWheel} />
          <PageActions
            primaryAction={{
              content: 'Lưu',
              disabled: this.state.disabledSetting && this.state.disabledSlices && this.state.disabledMailchimp ? true:false,
              onClick: this.onClickSaveButton,
              loading: this.props.updateSetting.isUpdateSetting || this.props.updateSlices.isUpdateSlices || this.props.updateMailchimp.isUpdateMailchimp ? true:false
            }}
          />
          <General />
          <br />
          <Display updateSetting={this.state.updateSetting} settingUpdated={() => this.setState({updateSetting: false, disabledSetting: true, clickSave: true})} onActiveSetting={() => this.setState({disabledSetting: false, updateAlert: false, clickSave: false})}/>
          <hr />
          <Slice updateSlices={this.state.updateSlices} slicesUpdated={() => this.setState({updateSlices: false, disabledSlices: true, clickSave: true})} onActiveSlices={() => this.setState({disabledSlices: false, updateAlert: false, clickSave: false})}/>
          <hr />
          <Mailchimp updateMailchimp={this.state.updateMailchimp} mailchimpUpdated={() => this.setState({updateMailchimp: false, disabledMailchimp: true, clickSave: true})} onActiveMailchimp={() => this.setState({disabledMailchimp: false, updateAlert: false, clickSave: false})} onError={ (status) => this.setState({error: status}) } />
          <PageActions
            primaryAction={{
              content: 'Lưu',
              disabled: this.state.disabledSetting && this.state.disabledSlices && this.state.disabledMailchimp ? true:false,
              onClick: this.onClickSaveButton,
              loading: this.props.updateSetting.isUpdateSetting || this.props.updateSlices.isUpdateSlices || this.props.updateMailchimp.isUpdateMailchimp ? true:false
            }}
          />
          <Layout>
            <Layout.Section>
              <FooterHelp>
                Developed By <Link url="https://doke.vn" external={true}>DOKE.VN</Link>.
              </FooterHelp>
            </Layout.Section>
          </Layout>
          
          {/* { this.state.updateAlert ? toast.success("Đã lưu", { autoClose: 3000 }): '' } */}
          <ToastContainer 
            position="bottom-center"
            autoClose={3000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnVisibilityChange
            draggable
            pauseOnHover
          />
        </Page>
      </AppProvider>
    );
  }
}

const mapStateToProps = state => {
  return {
    updateSetting: state.updateSetting,
    updateSlices: state.updateSlices,
    updateMailchimp: state.mailchimp
  }
}

export default connect(mapStateToProps, null)(App);