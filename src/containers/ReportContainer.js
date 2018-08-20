import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { Bar, Doughnut } from 'react-chartjs-2';

import { storeChartObject } from '../actions';

class ReportContainer extends Component {

  componentDidMount() {
    // console.log("componendDidMount")
    this.buildChartObject()
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log("componendDidUpdate")
    if (this.props.chartDataset !== prevProps.chartDataset) {
      this.buildChartObject()
    }
  }

  getColors = (labels) => {

    switch(this.props.chartFilter) {

      case 'scanner':
        return 'rgb(255, 99, 132)'

      case 'user':
        return 'rgb(255, 99, 132)'

      case 'task':
        return 'rgb(255, 99, 132)'

      case 'client':
        return this.mapColors(labels, this.props.clients)

      case 'project':
        return 'rgb(255, 99, 132)'

      default:
        return 'rgb(255, 99, 132)';
    }
  }

  mapColors = (names, list) => {
    let colors = []
    names.forEach((name) =>
      colors.push(list.find((item) => item.name === name).color)
    )
    return colors
  }

  buildChartObject = () => {
    if (this.props.chartDataset) {
      let labels = this.props.chartDataset.map((item) => item.name)
      this.props.storeChartObject(
        {
          labels: labels,
          datasets: [{
            data: this.props.chartDataset.map((item) => item.images),
            backgroundColor: this.getColors(labels),
          }]
        }
      )
    }
  }

  render() {
    // console.log("ReportContainer render", this.props)
    return (
      <Fragment>
        <div className="report-container">
          <h3>Chart</h3>
          {this.props.chartObject
          ? <Doughnut
              data={this.props.chartObject}
              options={{maintainAspectRatio: false}}
              height={200}
              width={200}
            />
          : null}
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    isFetching: state.isFetching,
    filtersLoaded: state.filtersLoaded,
    chartDataset: state.chartDataset,
    chartObject: state.chartObject,
    chartFilter: state.chartFilter,
    clients: state.clients,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    storeChartObject: (object) => dispatch(storeChartObject(object)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportContainer);
