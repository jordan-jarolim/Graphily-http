import '../styles/style.scss';
import { ThemeProvider } from '@material-ui/styles';
import App, { Container } from 'next/app';
import theme from '../components/theme';

class MyApp extends App {
  static async getInitialProps(context) {
    const initialProps = await App.getInitialProps(context);
    return {
      ...initialProps,
    };
  }

  // eslint-disable-next-line class-methods-use-this
  componentDidCatch(error) {
    console.log(error);
  }

  render() {
    const {
      Component,
      pageProps,
    } = this.props;
    return (
      <Container>
        <ThemeProvider theme={theme}>
          <Component
            {...pageProps}
          />
        </ThemeProvider>
      </Container>
    );
  }
}

export default MyApp;
