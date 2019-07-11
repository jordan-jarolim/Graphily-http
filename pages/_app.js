import '../styles/style.scss';
import App, { Container } from 'next/app';

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
        <Component
          {...pageProps}
        />
      </Container>
    );
  }
}

export default MyApp;
