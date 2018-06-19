import 'antd/dist/antd.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { assignNotes, assignCodes } from '../actions';
import { Route, withRouter, Link, history } from  'react-router-dom';
import ClientForm from './ClientForm';
import NoteList from './NoteList';
import API from '../services/http';
import Navigation from './Navigation/Navigation';
import LoadingBar from 'react-redux-loading-bar';
import { Layout } from 'antd';

const { Header, Content, Sider } = Layout;

class AppComponent extends Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed    
    });
  }

  componentDidMount() {
    const { assignNotes, assignCodes } = this.props;
    // request
    API().get('/Notes/GetAllNoteTypes')
      .then(({data}) => assignNotes(data));

    API().get('/Notes/GetAllReasonCodes')
      .then(({data}) => assignCodes(data));

    this.props.history.push("/notes");
  }

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" />
          
          <Navigation />
        </Sider>
        <Header style={{ background: '#fff', padding: 0 }}>
          <LoadingBar style={{ backgroundColor: '#1890ff', height: '5px' }}/>
        </Header>
        <Content style={{ margin: '5px 16px' }}>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <Route path={'/notes-create'} component={ClientForm} />
            <Route path={'/notes'} component={NoteList} />
          </div>
        </Content>
      </Layout>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  assignNotes: notes => dispatch(assignNotes(notes)),
  assignCodes: codes => dispatch(assignCodes(codes)),
});

const App = connect(null, mapDispatchToProps)(AppComponent);
export default withRouter(App);
