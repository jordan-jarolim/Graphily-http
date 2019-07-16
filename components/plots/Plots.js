import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Fragment } from 'react';
import { ResponsiveContainer } from 'recharts';
import useFetch from '../Fetch/useFetch';

const Plots = ({ children, containerHeight, fetchUrl, header }) => {
  const { loading, error, data } = useFetch(fetchUrl, {});
  let renderProps = children;
  if (loading || !data) {
    renderProps = () => <p>Loading...</p>;
  }
  if (error) {
    renderProps = () => <p>Cannot fetch data. Try to parse input file first.</p>;
  }

  return (
    <Fragment>
      <Box my={4} mt={6}>
        <Typography variant="h5" component="h2" gutterBottom>
          {header}
        </Typography>
      </Box>
      <ResponsiveContainer width="100%" minHeight={containerHeight} height={containerHeight}>
        {renderProps(data)}
      </ResponsiveContainer>
    </Fragment>
  );
};

export default Plots;
