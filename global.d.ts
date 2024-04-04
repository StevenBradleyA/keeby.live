export {};

interface PayPalLoginOptions {
    appid: string;
    authend: string;
    scopes: string;
    containerid: string;
    responseType: string;
    locale: string;
    buttonType: string;
    buttonShape: string;
    buttonSize: string;
    fullPage: string;
    returnurl: string;
}

interface PayPalLogin {
    render: (options: PayPalLoginOptions) => void;
}

interface PayPal {
    use: (modules: string[], callback: (login: PayPalLogin) => void) => void;
}

declare global {
    interface Window {
        paypal?: PayPal;
    }
}
