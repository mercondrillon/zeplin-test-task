import React from 'react';
import API from '../../services/http';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash'
import { Table, Row, Col, Modal, Form, Input, Select, DatePicker, Button, notification  } from 'antd';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


const MapStateToProps = state => ({
  notes: state.notes,
  codes: state.codes,
  patients: state.patients
});

const initialState = {
  NoteId: null,
  NoteText: null,
  ShortDescription: null,
  PatientId: null,
  PatientName: 'Patient',
  ProviderId: 2018,
  CreatedById: 2018,
  CreatedBy: 'Terry Lee',
  ReasonCodeId: null, // codeId
  CreatedDate: (new Date()),
};

const columns = [
  {
    title: 'First Name',
    dataIndex: 'FirstName',
  },
  {
    title: 'Last Name',
    dataIndex: 'LastName'
  },
  {
    title: 'Date Of Birth',
    dataIndex: 'DateOfBirth'
  },
  {
    title: 'Age',
    dataIndex: 'Age'
  },
  {
    title: 'Phone Number',
    dataIndex: 'PhoneNumber'
  },
  {
    title: 'Email Address',
    dataIndex: 'EmailAddress'
  },
];


const patientQueryParameters = {
  firstName: 'Terry',
  lastName: '',
  dateOfBirth: '',
  age: '',
  phoneNumber: '',
  pcpId: '',
  emailAddress: '',
};

// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: record => ({
    disabled: record.name === 'Disabled User', // Column configuration not to be checked
    name: record.name,
  }),
};

const SearchPatientForm = Form.create()(
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form, patients } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          title="Search Patient"
          width={1000}
          visible={visible}
          onOk={onCreate}
          onCancel={onCancel}
          okText="Search"
        >
          <Row>
            <Form layout="inline">
              <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                <Form.Item>
                  {getFieldDecorator('firstName')(
                    <Input placeholder="Firstname" />
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator('lastName')(
                   <Input placeholder="LastName" />
                  )}
                </Form.Item>
              </Col>
              <Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                <Form.Item>
                  {getFieldDecorator('dateOfBirth')(
                    <DatePicker placeholder="DOB" />
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator('age')(
                    <Input placeholder="Age" />
                  )}
                </Form.Item>
              </Col>
              <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                <Form.Item>
                  {getFieldDecorator('phoneNumber')(
                    <Input placeholder="Phone Number" />
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator('pcpId')(
                    <Input placeholder="PCP ID" />
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator('emailAddress')(
                    <Input placeholder="Email Address" />
                  )}
                </Form.Item>
              </Col>   
            </Form>
          </Row>
          <Table columns={columns} dataSource={patients} rowKey="Id"/>
        </Modal>
      );
    }
  }
);

class ZeplinForm extends React.Component {
  state = {
    requestState: {
      loading: false,
    },
    patientModalShow: false,
    noteFormData: cloneDeep(initialState),
    searchPatientsCollection: [],
  }
        
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetNoteFormState = this.resetNoteFormState.bind(this);
    this.togglePatientModal = this.togglePatientModal.bind(this);
    this.toggleButtonLoading = this.toggleButtonLoading.bind(this);
    this.handlePatientSearch = this.handlePatientSearch.bind(this);
    this.handleSelectionSearch = this.handleSelectionSearch.bind(this);
  }

  componentDidMount() {
    this.props.form.validateFields();
  }

  resetNoteFormState() {
    this.setState(cloneDeep(initialState));
  }

  toggleButtonLoading(isLoading = this.state.requestState.loading) {
    const state = Object.assign({}, this.state);
    state.requestState.loading = !isLoading;
    this.setState(state);
  }

  handleSubmit(e) {
    const { dispatch } = this.props;
    e.preventDefault();

    dispatch(showLoading());
    this.toggleButtonLoading();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        API().post('/Notes/SaveNote', {...values, ...this.state.noteFormData})
          .then(({data}) => {
            this.toggleButtonLoading();
            dispatch(hideLoading());
            notification.success({
              message: 'Saved',
              description: 'Note has been saved successfully!...',
            });
            this.resetNoteFormState();
          })
          .catch(error => {
            this.toggleButtonLoading();
            dispatch(hideLoading());
          })
      }
      else {
        notification.error({
          message: 'Oopps!',
          description: 'Please try again.',
        });
        dispatch(hideLoading());
        this.toggleButtonLoading();
      }
    });
  }

  togglePatientModal(shouldShow = this.state.patientModalShow) {
    const state = Object.assign({}, this.state);
    state.patientModalShow = !shouldShow;
    this.setState(state);
  }

  handlePatientSearch(e){
    e.preventDefault();
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if(!err) {
        API('https://patientportalwebservicepreprod.naiacorp.net/api/')
          .get('/PatientEHR/GetPatientsBySearchParameters', { params: {...values, ...patientQueryParameters} })
          .then(({data}) => {
            const state = Object.assign({}, this.state);
            state.searchPatientsCollection = data;
            this.setState(state);
          });
      }
    });
  }

  handleSelectionSearch(input, option) {
    return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { codes, notes, patients } = this.props;
    const { requestState, searchPatientsCollection } = this.state;
    return (
      <div>
        <h1>Create Notes</h1>
        <Form onSubmit={this.handleSubmit} className="note-form">
          <Form.Item label="Patient Name">
            {getFieldDecorator('patientName', {
              rules: [{ required: true, message: 'This field is required' }],
            })(
              <Input />
            )}
          </Form.Item>
          <Form.Item label="Note Type">
            {getFieldDecorator('NoteId', {
              rules: [{ required: true, message: 'This field is required' }],
            })(
              <Select 
                showSearch
                filterOption={this.handleSelectionSearch} 
                optionFilterProp='children'>
                {notes.map(el => <Select.Option key={el.Id} value={el.Id}>{el.Name}</Select.Option>)}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="Reason Code Type">
            {getFieldDecorator('ReasonCodeId', {
              rules: [{ required: true, message: 'This field is required' }],
            })(
              <Select 
                showSearch
                filterOption={this.handleSelectionSearch} 
                optionFilterProp='children'>
                {codes.map(el => <Select.Option key={el.Id} value={el.Id}>{el.Name}</Select.Option>)}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="Associate to Patient">
            <Input.Search
              onSearch={this.togglePatientModal}
              enterButton />
          </Form.Item>
          <Form.Item label="Short Description">
            {getFieldDecorator('ShortDescription')(
              <Input />
            )}
          </Form.Item>
          <Form.Item label="Note Text">
            <Editor />
          </Form.Item>
          <Form.Item>
            <Button 
              type="primary"
              htmlType="submit"
              loading={requestState.loading}
              className="create-note-form-button">
              Create
            </Button>
          </Form.Item>
        </Form>
        <SearchPatientForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.patientModalShow}
          onCancel={this.togglePatientModal}
          onCreate={this.handlePatientSearch}
          patients={searchPatientsCollection}
        />
      </div>
    );
  }
}
const ClientForm = connect(MapStateToProps)(ZeplinForm);
export default Form.create({})(ClientForm);