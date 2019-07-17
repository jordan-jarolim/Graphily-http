import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
} from 'recharts';
import Plots from './Plots';

const Methoddist = () => {
  return (
    <Plots
      fetchUrl="/method-distribution"
      containerHeight={300}
      header="Method distribution"
    >
      {(data) => {
        const formatData = [
          { method: 'GET', req: data.get },
          { method: 'POST', req: data.post },
          { method: 'HEAD', req: data.head },
          { metdho: 'Other', req: data.other },
        ];
        return (
          <BarChart data={formatData}>
            <XAxis dataKey="method" label={{ value: 'Methods', position: 'insideBottomRight', offset: 0 }} />
            <YAxis label={{ value: 'Requests', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="req" fill="#ffc107" />
          </BarChart>
        );
      }}
    </Plots>
  );
};

export default Methoddist;
