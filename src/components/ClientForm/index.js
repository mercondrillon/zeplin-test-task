import React from 'react';
import API from '../../services/http';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash'
import { Form, Input, Select, Button, notification, Upload, Icon, message  } from 'antd';
import { showLoading, hideLoading } from 'react-redux-loading-bar';


const MapStateToProps = state => ({
  notes: state.notes,
  codes: state.codes,
});




const initialState = {
  NoteId: null,
  NoteText: null, // noteDescription
  PatientId: null,
  PatientName: 'Patient',
  ProviderId: 2018,
  CreatedById: 2018,
  CreatedBy: 'Terry Lee',
  ReasonCodeId: null, // codeId
  CreatedDate: (new Date()),
};

class ZeplinForm extends React.Component {
  state = {
    requestState: {
      loading: false,
    },
    
    noteFormData: cloneDeep(initialState),

}; //end of class
        
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetNoteFormState = this.resetNoteFormState.bind(this);
    this.toggleButtonLoading = this.toggleButtonLoading.bind(this);
  }

  componentDidMount() {
    this.props.form.validateFields();
  }

  resetNoteFormState() {
    this.setState(cloneDeep(initialState));
  }

  toggleButtonLoading(isLoading = this.state.requestState.loading) {
    this.setState({
      requestState: {
        loading: !isLoading,
      }
    });
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
      }
    });
  }
    

  render() {
    const { getFieldDecorator } = this.props.form;
    const { codes, notes } = this.props;
    const { requestState } = this.state;
    

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
              <Select>
                {notes.map(el => <Select.Option key={el.Id} value={el.Id}>{el.Name}</Select.Option>)}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="Reason Code Type">
            {getFieldDecorator('ReasonCodeId', {
              rules: [{ required: true, message: 'This field is required' }],
            })(
              <Select>
                {codes.map(el => <Select.Option key={el.Id} value={el.Id}>{el.Name}</Select.Option>)}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="Description">
            {getFieldDecorator('NoteText')(
              <Input.TextArea rows={4} />
            )}
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
      </div>
    );
  }
}
const ClientForm = connect(MapStateToProps)(ZeplinForm);
export default Form.create({})(ClientForm);