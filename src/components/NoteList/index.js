import React from 'react';
import { connect } from 'react-redux';
import { chunk, truncate } from 'lodash';
import { Card, Icon, Row, Col, Modal } from 'antd';
const { Meta } = Card;

const MapStateToProps = state => ({
  notes: chunk(state.notes, 4),
});

class NoteListComponent extends React.Component {

  state = {
    noteModal: {
      instance: {},
      show: false,
    },
  }

  constructor() {
    super();

    this.handleShowPreview = this.handleShowPreview.bind(this);
    this.setModalStateInstance = this.setModalStateInstance.bind(this);
    this.toggleModalVisibility = this.toggleModalVisibility.bind(this);
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
    const { notes } = this.props;
    const { noteModal } = this.state;
    return (
      <div>
        <h1>Notes</h1>
        {notes.map((note, index) => (
          <Row gutter={48} style={{ marginTop: '16px' }} key={index}>
            {note.map(el => (
              <Col className="gutter-row" span={6} key={el.Id}>
                <Card actions={[<Icon type="eye-o" onClick={() => this.handleShowPreview(el)} />]}>
                  <Meta
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