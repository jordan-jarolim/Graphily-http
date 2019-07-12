import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import links from './linksEnum';
import LinkTab from './components/LinkTab';
import getActiveTab from './utils';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const Primary = ({ children }) => {
  const classes = useStyles();
  const router = useRouter();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs variant="fullWidth" value={getActiveTab(router.pathname)}>
          {links.map(({ label, href }) => (
            <LinkTab key={href} {...{ label, href }} />
          ))}
        </Tabs>
      </AppBar>
      {children}
    </div>
  );
};

export default Primary;
