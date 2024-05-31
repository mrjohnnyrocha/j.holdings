import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <script
            type="module"
            src="https://cdn.jsdelivr.net/npm/friendly-challenge@0.9.14/widget.module.min.js"
            async
            defer
          ></script>
          <script
            noModule
            src="https://cdn.jsdelivr.net/npm/friendly-challenge@0.9.14/widget.min.js"
            async
            defer
          ></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
