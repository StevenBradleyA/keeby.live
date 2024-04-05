import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { env } from "~/env.mjs";
import { setCookie } from "cookies-next";

export default function PayPalLogin() {
    const { data: sessionData } = useSession();

    const appId = env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

    useEffect(() => {
        let scriptLoaded = false;

        const loadPaypalScript = () => {
            if (window.paypal) {
                renderPaypalButton();
            } else {
                const script = document.createElement("script");
                script.src = "https://www.paypalobjects.com/js/external/api.js";
                script.onload = () => {
                    scriptLoaded = true;
                    renderPaypalButton();
                };
                document.body.appendChild(script);
            }
        };

        const renderPaypalButton = () => {
            if (window.paypal && sessionData) {
                setCookie("verify", sessionData.user.id.toString(), {
                    maxAge: 60 * 60 * 24 * 365,
                    path: "/",
                });

                window.paypal.use(["login"], function (login) {
                    login.render({
                        appid: appId,
                        scopes: "openid profile email",
                        containerid: "lippButton",
                        responseType: "code",
                        locale: "en-us",
                        buttonType: "LWP",
                        buttonShape: "pill",
                        buttonSize: "lg",
                        fullPage: "true",
                        returnurl: "https://www.keeby.live/verify-seller",
                    });
                });
            }
        };

        loadPaypalScript();

        return () => {
            if (scriptLoaded) {
                const script = document.querySelector(
                    "script[src='https://www.paypalobjects.com/js/external/api.js']"
                );
                if (script) {
                    document.body.removeChild(script);
                }
            }
        };
    }, []);

    return (
        <>
            <span id="lippButton"></span>
        </>
    );
}
