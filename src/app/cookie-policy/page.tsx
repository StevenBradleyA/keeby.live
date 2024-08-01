import Footer from "~/app/_components/Footer/mainFooter";

export default function CookiePolicy() {
    return (
        <>
            <div className="mb-40 w-2/3 text-white/40 desktop:w-1/2">
                <h1 className="flex justify-center text-5xl text-green-500 ">
                    Cookie Policy
                </h1>

                <div className="mb-5 flex items-center justify-between text-sm text-darkGray ">
                    <div>Effective on 4-2-2024</div>
                    <div>Last updated on 4-2-2024</div>
                </div>
                <p className="mb-5 rounded-md bg-keebyGray p-5 ">
                    {`This Cookie Policy explains how Keeby ("we", "us", or "our") uses cookies on our website www.keeby.live ("Site"). By using our Site, you consent to the use of cookies as described in this Cookie Policy.`}
                </p>

                <h2 className="mb-5 text-4xl text-green-500 ">
                    What are Cookies?
                </h2>
                <p className="mb-5 rounded-md bg-keebyGray p-5  ">
                    {` Cookies are small pieces of data stored on your device (computer or mobile device) when you visit a website. They are widely used to make websites work more efficiently and to provide information to the owners of the site.`}
                </p>
                <h2 className="mb-5 text-4xl text-green-500 ">
                    How We Use Cookies
                </h2>
                <h3 className="mb-2 text-xl text-darkGray ">
                    User Preferences
                </h3>

                <p className="mb-5 rounded-md bg-keebyGray p-5  ">{` We use cookies to keep you signed in and to remember your active settings. This allows us to provide you with a more personalized experience and saves you time by eliminating the need to re-enter information.`}</p>
                <h3 className="mb-2 text-xl text-darkGray ">
                    Performance and Analytics
                </h3>
                <p className="mb-5 rounded-md bg-keebyGray p-5  ">{`We use cookies to collect information about how you interact with our Site, including the pages you visit and any errors you may encounter. This helps us improve the performance and functionality of our Site and better understand how our users navigate and use our services. `}</p>
                <h3 className="mb-2 text-xl text-darkGray ">
                    Third-Party Cookies
                </h3>
                <p className="mb-5 rounded-md bg-keebyGray p-5  ">{`We may also allow third-party service providers, such as Google Analytics, to use cookies on our Site to analyze traffic and usage patterns. These cookies are subject to the privacy policies of these third parties. `}</p>

                <h2 className="mb-5 text-4xl text-green-500 ">
                    Managing Cookies
                </h2>

                <p className="mb-5 rounded-md bg-keebyGray p-5  ">{`You can control and manage cookies in various ways. Please note that disabling cookies may affect the functionality of our Site and may prevent you from accessing certain features. Most web browsers allow you to control cookies through their settings. You can usually find these settings in the "Options" or "Preferences" menu of your browser. For more information, refer to your browser's help documentation. You can opt out of certain cookies by using the opt-out tools provided by third-party analytics providers, such as Google Analytics.`}</p>

                <h2 className="mb-5 text-4xl text-green-500 ">
                    Changes to this Cookie Policy
                </h2>

                <p className="mb-5 rounded-md bg-keebyGray p-5  ">{`We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We encourage you to review this page periodically for the latest information on our use of cookies. `}</p>

                <h2 className="mb-5 text-4xl text-green-500 ">Contact Us</h2>

                <p className="mb-5 rounded-md bg-keebyGray p-5  ">{`If you have any questions about this Cookie Policy or our use of cookies, please contact us at hacktimesupport@outlook.com.`}</p>
            </div>

            <Footer />
        </>
    );
}
