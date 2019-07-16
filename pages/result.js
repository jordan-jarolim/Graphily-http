import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Primary from '../components/layout/Primary';
import Reqpermin from '../components/plots/Reqpermin';
import Methoddist from '../components/plots/Methoddist';
import Codedist from '../components/plots/Codedist';
import Sizedist from '../components/plots/Sizedist';


const Result = () => {
  return (
    <Primary>
      <Container>
        <Box my={4}>
          <Typography variant="h3" component="h1" gutterBottom>
          Graphily Http Logs - Results
          </Typography>
        </Box>
        <Reqpermin />
        <Methoddist />
        <Codedist />
        <Sizedist />
      </Container>
    </Primary>
  );
};

export default Result;
