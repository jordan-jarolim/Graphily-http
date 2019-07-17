import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';
import Plots from './Plots';

const Reqpermin = () => {
  return (
    <Plots
      fetchUrl="/req-per-min"
      containerHeight={300}
      header="Requests per minute"
    >
      {(data) => {
        return (
          <AreaChart
            data={data}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="min" label={{ value: 'Minutes', position: 'insideBottomRight', offset: 0 }} minTickGap={20} />
            <YAxis label={{ value: 'Requests', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Area type="monotone" dataKey="rpm" stroke="#007bff" fill="#007bff" />
          </AreaChart>
        );
      }}
    </Plots>
  );
};

export default Reqpermin;
