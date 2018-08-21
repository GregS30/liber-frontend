import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { Pie, Bar, Doughnut } from 'react-chartjs-2';

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
        return this.mapColors(labels, this.props.scanners)

      case 'user':
        return this.mapColors(labels, this.props.users)

      case 'task':
        return this.mapColors(labels, this.props.taskNames)

      case 'client':
        return this.mapColors(labels, this.props.clients)

      case 'project':
        return this.mapColors(labels, this.props.projects)

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
      let doughData = this.props.chartDataset.map((item) => item.images)
      let barData = this.props.chartDataset.map((item) => item.jobs)

      this.props.storeChartObject(
        {
          labels: labels,
          datasets: [{
            data: doughData,
            backgroundColor: this.getColors(labels),
          }]
        },
        {
          labels: labels,
          datasets: [{
            data: barData,
            backgroundColor: this.getColors(labels),
          }]
        }
      )
    }
  }

  renderCharts() {
    return (
      <Fragment>
        <div className="report-container-dough">
          <Doughnut
            data={this.props.doughChart}
            options={{maintainAspectRatio: false}}
            height={300}
            width={300}
          />
        </div>
        <div className="report-container-bar">
          <Bar
            data={this.props.barChart}
            options={{maintainAspectRatio: false}}
            height={300}
            width={300}
          />
        </div>
      </Fragment>
    )
  }

  render() {
    // console.log("ReportContainer render", this.props)
    return (
      <Fragment>
        <div className="report-container">
          <h3>Chart</h3>
          {this.props.barChart
          ? this.renderCharts()
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
    doughChart: state.doughChart,
    barChart: state.barChart,
    chartFilter: state.chartFilter,
    clients: state.clients,
    scanners: state.scanners,
    users: state.users,
    projects: state.projects,
    taskNames: state.taskNames,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    storeChartObject: (dough, bar) => dispatch(storeChartObject(dough, bar)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportContainer);
