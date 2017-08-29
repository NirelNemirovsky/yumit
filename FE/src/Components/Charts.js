import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './Charts.css';

const data = [
  {name: 'ינואר', NumOfShips: 4000},
  {name: 'פבואר', NumOfShips: 3000},
  {name: 'מרץ', NumOfShips: 2000},
  {name: 'אפריל', NumOfShips: 2780},
  {name: 'מאי', NumOfShips: 1890},
  {name: 'יוני', NumOfShips: 2390},
  {name: 'ולי', NumOfShips: 3490},
  ];

class Charts extends React.Component {
  render () {
    return (
      <div>
        <BarChart className="chart-center" width={600} height={250} data={data}
              margin={{top: 5, right: 30, left: 20, bottom: 5}}>
         <XAxis dataKey="name"/>
         <YAxis/>
         <CartesianGrid strokeDasharray="3 3"/>
         <Tooltip/>
         <Legend />
         <Bar dataKey="NumOfShips" fill="#8884d8" />
        </BarChart>       
      </div>
    );
  }
}


export default Charts;
