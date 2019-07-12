import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import blue from '@material-ui/core/colors/blue';
import pink from '@material-ui/core/colors/pink';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: pink,
    error: red,
    tonalOffset: 0.2,
  },
});

export default theme;
