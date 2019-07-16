import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Modal from '@material-ui/core/Modal';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useRouter } from 'next/router';
import get from 'lodash/get';
import Primary from '../components/layout/Primary';
import Fetch from '../components/Fetch';
import useFetch from '../components/Fetch/useFetch';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  card: {
    minWidth: 275,
    padding: theme.spacing(2),
  },
  modalLoader: {
    justifyContent: 'center',
  },
  actions: {
    justifyContent: 'space-between',
  },
}));

const Index = () => {
  const classes = useStyles();
  const Router = useRouter();
  const { loading: isParsedLoading, error: isParsedError, data: isParsedData } = useFetch('/is-parsed', {});

  return (
    <Fetch>
      {({ fetch, error, loading }) => {
        return (
          <Primary>
            {/* <Modal open={loading || false}>
              <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={{ minHeight: '100vh' }}
              >
                <CircularProgress className={classes.modalLoader} />
              </Grid>
            </Modal> */}
            <Container>
              <Box my={4} mt={6}>
                <Typography variant="h3" component="h1" gutterBottom>
                  Graphily Http Logs - File parse
                </Typography>
              </Box>
              <Box>
                <Grid container className={classes.root} spacing={2}>
                  <Grid item xs={12}>
                    <Grid container justify="center" spacing={5}>
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
                          <CardActions
                            className={classes.actions}
                          >
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => fetch('/parse-static', { method: 'post' }, () => Router.push('/result'))}
                            >
                              Parse
                            </Button>
                            {loading && <CircularProgress />}
                            <Button
                              variant="contained"
                              color="secondary"
                              disabled={isParsedLoading || isParsedError || !get(isParsedData, 'isParsed', false)}
                              onClick={() => fetch('/delete-parsed', { method: 'post' }, () => window.location.reload())}
                            >
                              Delete
                            </Button>
                          </CardActions>
                          <Typography variant="body2" component="p">
                            {error}
                            {isParsedError}
                          </Typography>
                        </Card>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Container>
          </Primary>
        );
      }}
    </Fetch>
  );
};

export default Index;
