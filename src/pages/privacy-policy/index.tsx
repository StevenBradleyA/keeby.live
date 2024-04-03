import MainFooter from "~/components/Footer";

export default function PrivacyPolicy() {
    // todo add section about advertisements when implementing...

    return (
        <>
            <div className="mb-40 w-2/3 text-white/40 desktop:w-1/2">
                <h1 className="flex justify-center text-5xl text-green-500 ">
                    Privacy Policy
                </h1>

                <div className="mb-5 flex items-center justify-between text-sm text-darkGray ">
                    <div>Effective on 4-2-2024</div>
                    <div>Last updated on 4-2-2024</div>
                </div>
                <p className="mb-5 rounded-md bg-keebyGray p-5 ">
                    {`Thanks for trusting keeby.live
                    ("we", "us", or "our") with your personal
                    information! We take our responsibility to you very
                    seriously, and so this Privacy Statement describes how we
                    handle your data. This Privacy Statement applies to all
                    websites we own and operate and to all services we provide
                    (collectively, the 'Services'). So Please Read This Privacy Statement Carefully. By using the Services, you are
                    expressly and voluntarily accepting the terms and conditions
                    of this Privacy Statement and our Terms of Service, which
                    include allowing us to process information about you. Under
                    this Privacy Statement, we are the data controller
                    responsible for processing your personal information. Our
                    contact information appears at the end of this Privacy
                    Statement.`}
                </p>

                <h2 className="mb-5 text-4xl text-green-500 ">
                    Information We Collect
                </h2>
                <h3 className="mb-2 text-xl text-darkGray ">
                    Personal Information
                </h3>
                <p className="mb-5 rounded-md bg-keebyGray p-5  ">
                    {` We may collect personal information, such as your name, username, email address, typing game results, provided keyboard data, and other contact or identification information that you voluntarily provide to us when you interact with the Website, such as when you list a keyboard or make a post.`}
                </p>

                <h3 className="mb-2 text-xl text-darkGray ">
                    Password Security
                </h3>
                <p className="mb-5 rounded-md bg-keebyGray p-5  ">
                    {` Your security is our priority. We use OAuth, a secure authentication protocol, to ensure the confidentiality of your account credentials. We never store your passwords directly. OAuth allows us to access your account securely without having access to your password, providing an extra layer of protection for your sensitive information.`}
                </p>
                <h3 className="mb-2 text-xl text-darkGray ">Data Security</h3>
                <p className="mb-5 rounded-md bg-keebyGray p-5  ">
                    We have implemented measures designed to secure your
                    personal information from accidental loss and from
                    unauthorized access, use, alteration, and disclosure. All
                    payment transactions are conducted through our third-party
                    payment processor, PayPal, which uses its own secure and
                    encrypted channels.
                </p>
                <h2 className="mb-5 text-4xl text-green-500 ">
                    How We Use Your Information
                </h2>
                <p className="mb-5 rounded-md bg-keebyGray p-5  ">{`We use the information that we collect about you or that you provide to us, including any personal information: to present our Website and its contents to you; to provide you with information, products, or services that you request from us; to fulfill any other purpose for which you provide it; to carry out our obligations and enforce our rights arising from any contracts entered into between you and us, including for billing and collection; to notify you about changes to our Website or any products or services we offer or provide though it; in any other way we may describe when you provide the information; and for any other purpose with your consent.`}</p>

                <h3 className="mb-2 text-xl text-darkGray ">
                    Sharing Of Your Information
                </h3>

                <p className="mb-5 rounded-md bg-keebyGray p-5  ">
                    We do not sell or rent your personal information to third
                    parties. However, we may share personal information with
                    third parties for certain purposes, such as processing
                    transactions via PayPal, providing advertising on our
                    platform, for analytics and improvement of our services, and
                    as required by law.
                </p>
                <h3 className="mb-2 text-xl text-darkGray ">
                    Providing Services
                </h3>
                <p className="mb-5 rounded-md bg-keebyGray p-5  ">{`We use your personal information to provide you with the services you request, such as purchasing or selling keyboards, and communicating with you about your purchases. `}</p>

                <h3 className="mb-2 text-xl text-darkGray ">
                    Publicly Visible Information
                </h3>
                <p className="mb-5 rounded-md bg-keebyGray p-5  ">
                    Some of your activities on our Website, including posting
                    comments, keeb type game results, and creating social media
                    posts about keyboards, are public by nature. When you create
                    an account, your username and any content you post under
                    that account will be visible to other users of the Website.
                    Additionally, participating in our typing games may result
                    in your game results, including scores and rankings, being
                    publicly displayed alongside your username. Please be
                    mindful of your privacy and security when deciding what
                    information to share as part of your public profile and
                    posts.
                </p>

                <h3 className="mb-2 text-xl text-darkGray ">
                    Control Over Your Information
                </h3>
                <p className="mb-5 rounded-md bg-keebyGray p-5  ">
                    {`We provide you with the ability to control and manage the
                    personal information you share with us. This includes tools
                    to edit and delete your posts and manage your public
                    profile. It's important to understand that once you have
                    shared information publicly, it may be copied or saved by
                    other individuals or third parties outside of our control.
                    If you have concerns about any personal information you have
                    made public on our platform, please contact us for
                    assistance.`}
                </p>
                <h2 className="mb-5 text-4xl text-green-500 ">
                    Information Sharing and Disclosure
                </h2>

                <h3 className="mb-2 text-xl text-darkGray ">
                    Service Providers
                </h3>
                <p className="mb-5 rounded-md bg-keebyGray p-5  ">
                    {`We may share your personal information with third-party service providers who perform services on our behalf, such as payment processing, data analysis, email delivery, hosting services, and customer service.`}
                </p>
                <h3 className="mb-2 text-xl text-darkGray ">
                    Legal Compliance
                </h3>
                <p className="mb-5 rounded-md bg-keebyGray p-5  ">
                    {`We may disclose your information if required by law, regulation, court order, or other governmental authority or when we believe in good faith that disclosure is necessary to protect our rights, protect your safety or the safety of others, investigate fraud, or respond to a government request.`}
                </p>

                <h3 className="mb-2 text-xl text-darkGray ">
                    Your Choices About Your Information
                </h3>
                <p className="mb-5 rounded-md bg-keebyGray p-5  ">
                    {`You have choices regarding the personal information you
                    provide to us and how it's used. This includes the ability
                    to control privacy settings, manage marketing preferences,
                    and opt-out of certain data collections. You also have the
                    right to request access to, correction of, or deletion of
                    your personal information.`}
                </p>

                <h2 className="mb-5 text-4xl text-green-500 ">
                    What are Cookies?
                </h2>
                <p className="mb-5 rounded-md bg-keebyGray p-5  ">
                    {` Cookies are small pieces of data stored on your device (computer or mobile device) when you visit a website. They are widely used to make websites work more efficiently and to provide information to the owners of the site.`}
                </p>
                <h3 className="mb-2 text-xl text-darkGray ">Cookie Policy</h3>
                <p className="mb-5 rounded-md bg-keebyGray p-5 ">
                    {`This Cookie Policy explains how Keeby ("we", "us", or "our") uses cookies on our website www.keeby.live ("Site"). By using our Site, you consent to the use of cookies as described in this Cookie Policy.`}
                </p>

                <h2 className="mb-5 text-4xl text-green-500 ">
                    How We Use Cookies
                </h2>

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
                    Changes to Our Privacy Policy
                </h2>
                <p className="mb-5 rounded-md bg-keebyGray p-5  ">
                    {` keeby.live may revise this Privacy Policy at any time without prior notice. The updated
                     version will be indicated by an updated "Last Updated" date.
                     We encourage you to review the privacy policy periodically
                     to stay informed about how we use cookies and handle your data. You are responsible for ensuring we have an
                    up-to-date active and deliverable email address for you, and
                    for periodically visiting our Website and this privacy
                    policy to check for any changes.`}
                </p>
                <h2 className="mb-5 text-4xl text-green-500 ">Contact Us</h2>

                <p className="mb-5 rounded-md bg-keebyGray p-5  ">{`If you have any questions about this Cookie Policy or our use of cookies, please contact us at hacktimesupport@outlook.com.`}</p>
            </div>

            <MainFooter />
        </>
    );
}
