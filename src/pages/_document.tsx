import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <noscript>
                    <link rel="stylesheet" type="text/css" href="/noscript.css" />
                </noscript>
            </Head>
            <body className='bg-[#fff] dark:bg-black'>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
