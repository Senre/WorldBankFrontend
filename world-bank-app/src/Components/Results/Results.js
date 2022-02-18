import React from "react";
import Graph from "../Graph/Graph";
import Header from "../Header";

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      compareData: this.props.compareData,
      comparison: this.props.compareData.length > 0,
    };
  }

  sortIncomingData = (data) => {
    let set = -1;
    let sortedData = [];
    let checkIndicator = "";
    data.forEach((element) => {
      if (checkIndicator !== element.indicatorname) {
        set++;
        sortedData.push([]);
      }

      sortedData[set].push(element);
      checkIndicator = element.indicatorname;
    });

    sortedData = sortedData.map((set) => {
      return set.sort((a, b) => (a.year < b.year ? -1 : 1));
    });

    sortedData.sort(function (a, b) {
      return a[0].indicatorname > b[0].indicatorname ? 1 : -1;
    });

    return sortedData;
  };

  renderLineChart = (data) => {
    if (data.length > 2) {
      let altData = data.map((item) => {
        item.value = Number(item.value);
        return item;
      });
      return <Graph data={altData} />;
    } else if (data.length === 1) {
      return (
        <h3>
          {data[0].indicatorname} for {data[0].countryname} was{" "}
          {Number(data[0].value).toLocaleString()} in {data[0].year}
        </h3>
      );
    }
  };

  renderComparison = (data, compareData) => {
    if (data.length > 2) {
      let altData = data.map((item) => {
        item.value = Number(item.value);
        return item;
      });
      let altCompareData = compareData.map((item) => {
        item.value = Number(item.value);
        return item;
      });
      return <Graph data={altData} compareData={altCompareData} />;
    } else if (data.length === 1) {
      return (
        <div>
          <h3>
            {data[0].indicatorname} for {data[0].countryname} was{" "}
            {Number(data[0].value).toLocaleString()} in {data[0].year}
          </h3>
          <h3>
            {compareData[0].indicatorname} for {compareData[0].countryname} was{" "}
            {Number(compareData[0].value).toLocaleString()} in{" "}
            {compareData[0].year}
          </h3>
        </div>
      );
    }
  };

  filterTwoDataSets = (setOne, setTwo) => {
    const setTwoIndicators = setTwo.map((entry) => {
      return entry[0].indicatorname;
    });

    const setOneIndicators = setOne.map((entry) => {
      return entry[0].indicatorname;
    });

    const filteredSetOne = setOne.filter((entry) =>
      setTwoIndicators.includes(entry[0].indicatorname)
    );

    const filteredSetTwo = setTwo.filter((entry) =>
      setOneIndicators.includes(entry[0].indicatorname)
    );

    return { dataMain: filteredSetOne, dataCompare: filteredSetTwo };
  };

  renderIncomingData = () => {
    const { data, compareData, comparison } = this.state;
    const sortedData = this.sortIncomingData(data);
    if (comparison) {
      const sortedCompareData = this.sortIncomingData(compareData);

      const { dataMain, dataCompare } = this.filterTwoDataSets(
        sortedData,
        sortedCompareData
      );

      return dataMain.map((set, i) => {
        const image = this.renderComparison(set, dataCompare[i]);
        return image ? (
          <div key={i} className="rendered-data">
            {image}
          </div>
        ) : null;
      });
    } else {
      return sortedData.map((set, i) => {
        const image = this.renderLineChart(set);
        return image ? (
          <div key={i} className="rendered-data">
            {image}
          </div>
        ) : null;
      });
    }
  };

  render() {
    const { data, compareData, comparison } = this.state;
    return (
      <div className="spacing">
        <main>
          <header className="main-header">
            <Header
              setData={() => this.props.setData()}
              logIn={() => this.props.logIn()}
              admin={this.props.admin}
              exitAdmin={() => this.props.exitAdmin()}
            />
          </header>
          <h1 className="results-title">
            {comparison
              ? `${data[0].countryname} Vs. ${compareData[0].countryname}`
              : data[0].countryname}
          </h1>
          <div className="results-content">
            {this.renderIncomingData().filter((element) => element)}
          </div>
        </main>
      </div>
    );
  }
}

export default Results;
