import "@component/styles/globals.css";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";


export default function App({ Component, pageProps }: AppProps) {

    return (
        <GoogleReCaptchaProvider
            reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTHA_SITE_KEY!}
            scriptProps={{
                async: false, // optional, default to false,
                defer: true, // optional, default to false
                appendTo: "body", // optional, default to "head", can be "head" or "body",
                nonce: undefined
            }}>
            <ThemeProvider enableSystem={true} attribute="class">
                <Component {...pageProps} />
            </ThemeProvider>
        </GoogleReCaptchaProvider>
    );
}
