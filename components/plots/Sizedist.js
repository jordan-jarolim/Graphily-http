import {
  XAxis, YAxis, Tooltip, Legend, LineChart, CartesianGrid, Line,
} from 'recharts';
import Plots from './Plots';

const Sizedist = () => {
  return (
    <Plots
      fetchUrl="/size-distribution"
      containerHeight={300}
      header="Size distribution"
    >
      {(data) => {
        const formatData = Object.keys(data).map((key) => {
          return { size: key, req: data[key] };
        }).sort((a, b) => parseInt(a) - parseInt(b));
        return (
          <LineChart
            data={formatData}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="size" label={{ value: 'Response body size', position: 'insideBottomRight', offset: 0 }} />
            <YAxis label={{ value: 'Requests', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="req" stroke="#8884d8" dot={false} activeDot={{ r: 8 }} />
          </LineChart>
        );
      }}
    </Plots>
  );
};

export default Sizedist;
