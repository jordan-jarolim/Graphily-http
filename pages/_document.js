import Document, { Head, Main, NextScript } from 'next/document';
import get from 'lodash/get';
import { Fragment } from 'react';

import { ServerStyleSheets } from '@material-ui/styles';
import theme from '../components/theme';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;
    ctx.renderPage = () => originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    });

    const initialProps = await Document.getInitialProps(ctx);
    const nonce = get(ctx, 'res.locals.nonce', '');

    return {
      ...initialProps,
      nonce,
      // Styles fragment is rendered after the app and page rendering finish.
      styles: [
        <Fragment key="styles">
          {initialProps.styles}
          {sheets.getStyleElement()}
        </Fragment>,
      ],
    };
  }

  render() {
    const { nonce } = this.props;
    return (
      <html>
        <Head nonce={nonce}>
          <meta charSet="utf-8" />
          {/* Use minimum-scale=1 to enable GPU rasterization */}
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
          />
          {/* PWA primary color */}
          <meta name="theme-color" content={theme.palette.primary.main} />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
        </Head>
        <body>
          <Main />
          <NextScript nonce={nonce} />
        </body>
      </html>
    );
  }
}

export default MyDocument;
