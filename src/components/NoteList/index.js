import React from 'react';
import { connect } from 'react-redux';
import { chunk, truncate, filter, isEmpty } from 'lodash';
import { Card, Icon, Row, Col, Modal, Input } from 'antd';

const MapStateToProps = state => ({
  notes: state.notes,
});

class NoteListComponent extends React.Component {
  state = {
    notes: [],
    noteQuery: '',
    noteModal: {
      instance: {},
      show: false,
    },
  }

  constructor() {
    super();

    this.onSearchButton = this.onSearchButton.bind(this);
    this.handleShowPreview = this.handleShowPreview.bind(this);
    this.setModalStateInstance = this.setModalStateInstance.bind(this);
    this.toggleModalVisibility = this.toggleModalVisibility.bind(this);
  }

  componentWillReceiveProps({ notes }) {
    this.setState({ notes });
  }

  onSearchButton(value) {
    const state = Object.assign({}, this.state);
    if (!isEmpty(value)) {
      const values = filter(this.props.notes, ({ Name, Description }) => (Name.indexOf(value) > -1 || Description.indexOf(value) > -1));
      state.notes = values;
      this.setState(state);
    }
    else {
      state.notes = this.props.notes;
      this.setState(state);
    }
  }

  setModalStateInstance(noteInstance) {
    const state = Object.assign({}, this.state);
    state.noteModal.instance = noteInstance;
    this.setState(state);
  }

  toggleModalVisibility(shouldShow = this.state.noteModal.show) {
    const state = Object.assign({}, this.state);
    state.noteModal.show = !shouldShow;
    this.setState(state);
  }

  handleShowPreview(noteInstance) {
    this.toggleModalVisibility();
    this.setModalStateInstance(noteInstance);
  }

  render() {
    let { notes, noteModal } =  this.state;
    notes = chunk(notes, 4);
    return (
      <div>
        <h1>Notes</h1>
        <Input.Search
          placeholder="input search text"
          onSearch={this.onSearchButton}
          enterButton
         />
        {notes.map((note, index) => (
          <Row gutter={48} style={{ marginTop: '16px' }} key={index}>
            {note.map(el => (
              <Col className="gutter-row" span={6} key={el.Id}>
                <Card actions={[<Icon type="eye-o" onClick={() => this.handleShowPreview(el)} />]}>
                  <Card.Meta
                    title={truncate(el.Name, 18)}
                    description={truncate(el.Description, 15)}
                  />
                </Card>
              </Col>
            ))}
          </Row>
        ))}
        <Modal 
          visible={noteModal.show}
          onOk={() => this.toggleModalVisibility()}
          onCancel={() => this.toggleModalVisibility()}>
            <h3>{noteModal.instance.Name}</h3>
            <p>{noteModal.instance.Description}</p>
        </Modal>
      </div>
    );
  }
}

const NoteList = connect(MapStateToProps)(NoteListComponent);
export default NoteList;