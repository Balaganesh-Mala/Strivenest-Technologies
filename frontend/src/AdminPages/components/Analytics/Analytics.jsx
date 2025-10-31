import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from "recharts";
import "./Analytics.css";

const dataPie = [
  { name: "Clients", value: 400 },
  { name: "Projects", value: 300 },
  { name: "Pending", value: 200 },
  { name: "Completed", value: 100 },
];

const dataBar = [
  { name: "Jan", value: 120 },
  { name: "Feb", value: 180 },
  { name: "Mar", value: 240 },
  { name: "Apr", value: 320 },
  { name: "May", value: 280 },
];

const COLORS = ["#0b63f6", "#28a745", "#ffc107", "#ff4d4f"];

const Analytics = () => (
  <div className="analytics">
    <h2>Analytics Dashboard</h2>

    <div className="chart-container">
      <div className="chart-card">
        <h3>Client Overview</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={dataPie} dataKey="value" outerRadius={90} fill="#8884d8" label>
              {dataPie.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-card">
        <h3>Monthly Growth</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={dataBar}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#0b63f6" radius={[6,6,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
);

export default Analytics;
