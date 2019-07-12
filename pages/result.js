import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Primary from '../components/layout/Primary';

const Result = () => {
  return (
    <Primary>
      <Container>
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Import
          </Typography>
        </Box>
      </Container>
    </Primary>
  );
};

export default Result;
