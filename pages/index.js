import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Primary from '../components/layout/Primary';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  card: {
    minWidth: 275,
    padding: theme.spacing(2),
  },
}));

const Index = () => {
  const classes = useStyles();

  return (
    <Primary>
      <Container>
        <Box my={4} mx={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            UFirstGroup Assignment
          </Typography>
        </Box>
        <Box>
          <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12}>
              <Grid container justify="center" spacing="5">
                <Grid item>
                  <Card className={classes.card}>
                    <CardContent>
                      <Typography variant="h5" component="h2">
                        Process static file
                      </Typography>
                      <Typography variant="body2" component="p">
                        By clicking the button below, you will parse default static file.
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => console.log('clicked')}
                      >
                        Parse
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
                <Grid item>
                  <Card className={classes.card}>
                    <CardContent>
                      <Typography variant="h5" component="h2">
                        Upload your own file
                      </Typography>
                      <Typography variant="body2" component="p">
                        By clicking the button below, you will parse your custom file.
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">Learn More</Button>
                    </CardActions>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Primary>
  );
};

export default Index;
