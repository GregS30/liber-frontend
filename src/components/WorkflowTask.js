import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

class WorkflowTask extends Component {

  renderItem = (item) => {
    return (
      null
    )
  }

  render() {
    return(
      <div className="workflow-task">
        {this.renderItem(this.props.item)}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkflowTask);
