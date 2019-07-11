import Document, { Head, Main, NextScript } from 'next/document';
import get from 'lodash/get';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    const nonce = get(ctx, 'res.locals.nonce', '');
    return {
      ...initialProps,
      nonce,
    };
  }

  render() {
    const { nonce } = this.props;
    return (
      <html>
        <Head nonce={nonce} />
        <body>
          <Main />
          <NextScript nonce={nonce} />
        </body>
      </html>
    );
  }
}

export default MyDocument;
