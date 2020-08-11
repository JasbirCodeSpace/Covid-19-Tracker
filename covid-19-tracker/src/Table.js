import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import numeral from "numeral";
import "./Table.css";

const columns = [
  {
    name: "flag",
    label: "Flag",
    options: {
      filter: false,
      sort: false,
      customBodyRender: (value, meta, update) => (
        <img src={value} alt="" width="40" height="25" />
      ),
    },
  },
  {
    name: "country",
    label: "Country",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "cases",
    label: "Cases",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value, meta, update) => numeral(value).format("0,0"),
    },
  },
  {
    name: "recovered",
    label: "Recovered",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value, meta, update) => numeral(value).format("0,0"),
    },
  },
  {
    name: "deaths",
    label: "Deaths",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value, meta, update) => numeral(value).format("0,0"),
    },
  },
];

const options = {
  filterType: "dropdown",
  rowsPerPage: 5,
};

export default function Table({ countries }) {
  return (
    <MUIDataTable
      title={"Live cases by country"}
      data={countries.map((country) => {
        return [
          country.countryInfo.flag,
          country.country,
          country.cases,
          country.recovered,
          country.deaths,
        ];
      })}
      columns={columns}
      options={options}
    />
  );
}
