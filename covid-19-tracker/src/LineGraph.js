import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@material-ui/core";
import { Line } from "react-chartjs-2";
import numeral from "numeral";

const casesTypeColors = {
  cases: {
    hex: "#CC1034",
    rgb: "rgb(204, 16, 52)",
    half_op: "rgb(204, 16, 52, 0.5)",
    multiplier: 800,
  },
  recovered: {
    hex: "#7dd71d",
    rgb: "rgb(125, 215, 29)",
    half_op: "rgb(125, 215, 29, 0.5)",
    multiplier: 1200,
  },
  deaths: {
    hex: "#fb4443",
    rgb: "rgb(251, 68, 67)",
    half_op: "rgb(251, 68, 67, 0.5)",
    multiplier: 2000,
  },
};
const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callback: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

const parseChartData = (data, casesType) => {
  let lastDataPoint;
  const chartData = [];
  for (let date in data) {
    if (lastDataPoint) {
      const newDataPoint = {
        x: date,
        y: data[date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[date];
  }
  return chartData;
};
const buildChartData = (data, casesType = "cases") => {
  const casesData = parseChartData(data.cases, "cases");
  const recoveredData = parseChartData(data.recovered, "recovered");
  const deathsData = parseChartData(data.deaths, "deaths");

  return [casesData, recoveredData, deathsData];
};

function LineGraph({ casesType = "cases", ...props }) {
  const [data, setData] = useState({
    cases: [],
    recovered: [],
    deaths: [],
  });
  // const [recoveredData, setRecoveredData] = useState({});
  // const [deathsData, setDeathsData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
        .then((response) => response.json())
        .then((data) => {
          const [casesData, recoveredData, deathsData] = buildChartData(
            data,
            casesType
          );

          setData({
            cases: casesData,
            recovered: recoveredData,
            deaths: deathsData,
          });
          // setDeathsData(deaths);
        });
    };
    fetchData();
  }, [casesType]);

  return (
    <div className={props.className}>
      {data.cases?.length > 0 && (
        <Card>
          <CardContent>
            <Line
              options={options}
              data={{
                datasets: [
                  {
                    data: data.cases,
                    backgroundColor: casesTypeColors[casesType].half_op,
                    borderColor: casesTypeColors[casesType].hex,
                  },
                ],
              }}
            />
          </CardContent>
          <CardContent>
            <Line
              options={options}
              data={{
                datasets: [
                  {
                    data: data.recovered,
                    backgroundColor: casesTypeColors["recovered"].half_op,
                    borderColor: casesTypeColors["recovered"].hex,
                  },
                ],
              }}
            />
          </CardContent>
          <CardContent>
            <Line
              options={options}
              data={{
                datasets: [
                  {
                    data: data.deaths,
                    backgroundColor: casesTypeColors["deaths"].half_op,
                    borderColor: casesTypeColors["deaths"].hex,
                  },
                ],
              }}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default LineGraph;
