import {
  PieChart, Pie, Cell, Tooltip, Legend,
} from 'recharts';
import Plots from './Plots';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#666', '#8884d8', '#FF3E27', '#6BFFA4'];
const Codedist = () => {
  return (
    <Plots
      fetchUrl="/codes-distribution"
      containerHeight={500}
      header="Return code distribution"
    >
      {(data) => {
        const formatData = Object.keys(data).map((key) => {
          return { code: key, req: data[key] };
        });
        return (
          <PieChart>
            <Pie
              data={formatData}
              fill="#8884d8"
              dataKey="req"
              nameKey="code"
              label
            >
              {
                formatData.map((entry, index) => <Cell key={`cell-${entry}`} fill={COLORS[index % COLORS.length]} />)
              }
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        );
      }}
    </Plots>
  );
};

export default Codedist;
