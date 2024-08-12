import React from "react";
import { GlobalStyle } from "@/theme/GlobalStyles";

function MyApp({ Component, pageProps}) {
    return (
        <>
            <React.Fragment>
                <GlobalStyle />
                <Component {...pageProps} />
            </React.Fragment>
        </>
    )
}

export default MyApp;