import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { formatCurrency } from "../utils/constants";
import "./SpendingChart.css";

const chartColors = ["#0f766e", "#d97706", "#7c3aed", "#2563eb", "#db2777", "#059669", "#ea580c", "#64748b"];

const SpendingChart = ({ data, title = "Spending by Category" }) => (
  <section className="card chart-card">
    <div className="section-heading">
      <div>
        <h3>{title}</h3>
        <p>Where your expenses are going</p>
      </div>
    </div>
    {data.length ? (
      <div className="chart-layout">
        <div className="chart">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={data} dataKey="value" nameKey="name" innerRadius={68} outerRadius={96} paddingAngle={3}>
                {data.map((item, index) => <Cell key={item.name} fill={chartColors[index % chartColors.length]} />)}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(value)} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-legend">
          {data.map((item, index) => (
            <div className="legend-row" key={item.name}>
              <span className="legend-dot" style={{ background: chartColors[index % chartColors.length] }} />
              <span>{item.name}</span>
              <strong>{formatCurrency(item.value)}</strong>
            </div>
          ))}
        </div>
      </div>
    ) : (
      <div className="empty-state"><div>📊</div><h3>No spending data yet</h3><p>Add some expenses to see your spending breakdown.</p></div>
    )}
  </section>
);

export default SpendingChart;
