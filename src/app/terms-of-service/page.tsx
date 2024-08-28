import Link from "next/link";
import Footer from "../_components/Footer/footer";

export default function TermsOfService() {
    // the goal of keeby is to create a safe space to buy and sell mechanical keyboards and enjoy the hobby.
    // not responsible for keyboard losses during shipping. we do not guarentee that your product will arrive. we are just a middle man connecting buyers and sellers.
    // revise returns and disputes
    // i want the ability to cancel charges if peeps are getting scammed if both parties say they are getting scammed but the board looks similar in the seller and buyers video i have right to refuse. I can decide based off video evidence you agree to the terms when you purchase a keeb via keeby.

    return (
        <>
            <div className="w-full justify-center mt-40 flex">
                <div className="w-2/3 text-white/40 desktop:w-1/2">
                    <h1 className="flex justify-center text-5xl text-green-500 ">
                        Terms of Service
                    </h1>
                    <div className="mb-5 flex items-center justify-between text-sm text-mediumGray ">
                        <div>Effective on 4-2-2024</div>
                        <div>Last updated on 4-2-2024</div>
                    </div>
                    <h2 className="mb-5 text-4xl text-green-500 ">Agreement</h2>
                    <p className="mb-5 rounded-md bg-darkGray p-5 ">
                        {` Welcome to keeby.live! These Terms of Service
                    govern your use of our website located at keeby.live. 
                    Please read these Terms of Service carefully
                    before accessing or using the Website. By accessing this
                    Website, accessible from keeby.live, you are
                    agreeing to be bound by these Website Terms of Service and
                    agree that you are responsible for the agreement in
                    accordance with any applicable local laws. IF YOU DO NOT
                    AGREE TO ALL THE TERMS AND CONDITIONS OF THIS AGREEMENT, YOU
                    ARE NOT PERMITTED TO ACCESS OR USE OUR SERVICES.`}
                    </p>
                    <h2 className="mb-5 text-4xl text-green-500 ">
                        Use of the Website
                    </h2>
                    <h3 className="mb-2 text-xl">Eligibility</h3>
                    <p className="mb-5 rounded-md bg-darkGray p-5">
                        You must be at least 18 years old to use the Website. By
                        using the Website, you represent and warrant that you
                        are at least 18 years old.
                    </p>
                    <h3 className="mb-2 text-xl">Personal Information</h3>
                    <p className="mb-5 rounded-md bg-darkGray p-5">
                        You agree to provide accurate, current, and complete
                        information during the registration or appointment
                        booking process and to update such information to keep
                        it accurate, current, and complete.
                    </p>
                    <h3 className="mb-2 text-xl">Prohibited Activities</h3>
                    <p className="mb-5 rounded-md bg-darkGray p-5">
                        You may not use the Website for any illegal or
                        unauthorized purpose. You may not, in the use of the
                        Website, violate any applicable laws, regulations, or
                        rights of others.
                    </p>
                    <h3 className="mb-2 text-xl">User Content and Conduct</h3>
                    <p className="mb-5 rounded-md bg-darkGray p-5">
                        {`You are solely responsible for your account's security and
                    all activities that occur under your account. You must not
                    upload, post, host, or transmit any content that is
                    unlawful, defamatory, infringing on intellectual property
                    rights, or otherwise harmful to others. Keeby.live reserves
                    the right, but is not obligated, to remove or disable access
                    to any content that violates these provisions without prior
                    notice.`}
                    </p>
                    <h3 className="mb-2 text-xl">Rights of Keeby.live</h3>
                    <p className="mb-5 rounded-md bg-darkGray p-5">
                        Keeby.live reserves the right to remove or disable
                        access to any account or content on the Website at any
                        time and for any reason, without prior notice, if we
                        believe there has been a violation of these Terms. We
                        also reserve the right to modify or discontinue,
                        temporarily or permanently, any part of the Services
                        with or without notice.
                    </p>
                    <h3 className="mb-2 text-xl">
                        Legal Compliance and Law Enforcement
                    </h3>
                    <p className="mb-5 rounded-md bg-darkGray p-5">
                        You agree to comply with all local, state, national, and
                        international laws and regulations applicable to your
                        use of the Website. Keeby.live may disclose any
                        information about you to government or law enforcement
                        officials as we, in our sole discretion, believe
                        necessary or appropriate to respond to claims and legal
                        process, to protect the property and rights of
                        Keeby.live or a third party, to protect the safety of
                        the public or any person, or to prevent or stop any
                        activity we may consider to be, or to pose a risk of
                        being, illegal, unethical, or legally actionable.
                    </p>
                    <h3 className="mb-2 text-xl">Limitation of Liability</h3>
                    <p className="mb-5 rounded-md bg-darkGray p-5">
                        Keeby.live shall not be liable for any indirect,
                        incidental, special, consequential, or punitive damages,
                        including without limitation, loss of profits, data,
                        use, goodwill, or other intangible losses, resulting
                        from your access to or use of or inability to access or
                        use the Services; any conduct or content of any third
                        party on the Services; any content obtained from the
                        Services; and unauthorized access, use or alteration of
                        your transmissions or content, whether based on
                        warranty, contract, tort (including negligence) or any
                        other legal theory, whether or not we have been informed
                        of the possibility of such damage, and even if a remedy
                        set forth herein is found to have failed its essential
                        purpose.
                    </p>
                    <h2 className="mb-5 text-4xl text-green-500">
                        Adherence to Our Privacy Policy
                    </h2>
                    <h3 className="mb-2 text-xl">
                        Compliance with Privacy Policy
                    </h3>
                    <p className="mb-5 rounded-md bg-darkGray p-5">
                        By accessing and using our Services, you affirm that you
                        have read, understood, and agreed to the terms outlined
                        in our{" "}
                        <Link
                            href="/privacy-policy"
                            aria-label="privacy policy"
                            className="text-green-500"
                        >
                            Privacy Policy
                        </Link>
                        . Our Privacy Policy explains in detail the types of
                        information we collect from you and how we use, process,
                        and safeguard that information. It is imperative that
                        you review our Privacy Policy thoroughly before using
                        the Services to ensure you are fully informed about our
                        data practices.
                    </p>
                    <h3 className="mb-2 text-xl">
                        Responsibilities of Data Collection
                    </h3>
                    <p className="mb-5 rounded-md bg-darkGray p-5">
                        If, during your use of the Services, you collect any
                        Personal Information from other Users, you must ensure
                        that such collection is for a clear and legitimate
                        purpose consented to by the User. You are obligated to
                        adhere strictly to the guidelines set forth in our
                        Privacy Policy regarding the collection, use, and
                        safeguarding of Personal Information. Furthermore, you
                        must implement all reasonable security measures to
                        protect the stored Personal Information against
                        unauthorized access, disclosure, alteration, and
                        destruction.
                    </p>
                    <h3 className="mb-2 text-xl">
                        Protection of User Information
                    </h3>
                    <p className="mb-5 rounded-md bg-darkGray p-5">
                        The security of User Information is paramount. You agree
                        to handle all Personal Information collected from the
                        Services with the highest degree of care. This includes
                        adhering to all applicable laws and regulations
                        governing the protection of personal data. In the event
                        of any data breach or unauthorized access to User
                        Personal Information, you commit to notifying the
                        affected Users and us promptly and taking immediate
                        steps to mitigate any potential harm or loss.
                    </p>
                    <h3 className="mb-2 text-xl">Reporting and Compliance</h3>
                    <p className="mb-5 rounded-md bg-darkGray p-5">
                        {` You are expected to respond swiftly to any complaints,
                    removal requests, or 'do not contact' orders from both us
                    and the Users. In alignment with our commitment to user
                    privacy, you agree to cooperate fully with any
                    investigations or inquiries from us regarding the handling
                    of Personal Information obtained through the Services.
                    Non-compliance with our Privacy Policy, misuse of Personal
                    Information, or failure to adequately protect such
                    information may result in restricted access to the Services,
                    legal action, and other measures to enforce compliance.`}
                    </p>
                    <h2 className="mb-5 text-4xl text-green-500">
                        Marketplace Transactions
                    </h2>
                    <h3 className="mb-2 text-xl">Refunds and Returns</h3>
                    <p className="mb-5 rounded-md bg-darkGray p-5">
                        {`Keeby operates as a facilitator in the marketplace,
                    connecting buyers and sellers of keyboards without directly
                    handling the products. As such, Keeby is not responsible for
                    the condition of the items sold, their delivery, or their
                    conformity to description. Buyers are encouraged to review
                    the seller's refund and return policies before making a
                    purchase. While Keeby facilitates a platform for transaction
                    disputes, it does not guarantee refunds or returns. All
                    disputes must be accompanied by video proof of the product's
                    condition upon delivery. The decision to issue a refund lies
                    solely with the seller, under their specified terms.`}
                    </p>
                    <h3 className="mb-2 text-xl">Dispute Resolution</h3>
                    <p className="mb-5 rounded-md bg-darkGray p-5">
                        {`   In the event of a dispute, Keeby provides a platform for
                    buyers and sellers to attempt resolution. For a dispute to
                    be considered, the complaining party must submit video
                    evidence showcasing the discrepancy between the product's
                    advertised condition and its state upon delivery. Keeby will
                    facilitate communication between the buyer and seller to
                    resolve disputes but does not partake in the final
                    decision-making regarding refunds or returns. Keeby's role
                    is strictly as an intermediary platform.`}
                    </p>
                    <h3 className="mb-2 text-xl">Liability Limitation</h3>
                    <p className="mb-5 rounded-md bg-darkGray p-5">
                        Keeby aims to create a safe and trustworthy marketplace
                        for keyboard enthusiasts. However, Keeby does not assume
                        liability for the condition of items sold, the accuracy
                        of listings, or the actions of users on the platform. By
                        using the marketplace, you acknowledge that Keeby is not
                        involved in the actual transaction between buyers and
                        sellers. Any agreement for the sale of items is solely
                        between the buyer and seller. Users agree that Keeby
                        bears no responsibility for any unsatisfactory or
                        non-conforming items, delivery issues, or disputes
                        between users.
                    </p>
                    <h3 className="mb-2 text-xl">Fee Acknowledgment</h3>
                    <p className="mb-5 rounded-md bg-darkGray p-5">
                        Users acknowledge that Keeby charges a nominal fee for
                        facilitating transactions within the marketplace. This
                        fee is non-refundable and is charged to support the
                        operation of the marketplace platform. By listing or
                        purchasing an item, users agree to this fee structure
                        and understand that additional seller or buyer fees may
                        apply according to the terms set forth by individual
                        sellers.
                    </p>
                    <h2 className="mb-5 text-4xl text-green-500 ">
                        Intellectual Property
                    </h2>
                    <div className="mb-2 text-xl "> Ownership</div>
                    <p className="mb-5 rounded-md bg-darkGray p-5 ">
                        {` All content and materials available on the Website, including but not limited to text, graphics, logos, button icons, images, audio clips, data compilations, and software, are the property of keeby.live or its content suppliers and protected by copyright laws.`}
                    </p>
                    <div className="mb-2 text-xl "> Trademarks</div>
                    <p className="mb-5 rounded-md bg-darkGray p-5 ">
                        {` keeby.live and any other trademarks, service marks, graphics, and logos used in connection with the Website are trademarks or registered trademarks of keeby.live or its licensors.`}
                    </p>
                    <h2 className="mb-5 text-4xl text-green-500 ">
                        Terms of Service Modification
                    </h2>
                    <p className="mb-5 rounded-md bg-darkGray p-5 ">
                        Keeby.live may revise these Terms of Service for its
                        Website at any time without prior notice. By using this
                        Website, you are agreeing to be bound by the current
                        version of these Terms of Service.
                    </p>

                    <h2 className="mb-5 text-4xl text-green-500 ">
                        Disclaimer
                    </h2>
                    <p className="mb-5 rounded-md bg-darkGray p-5 ">
                        {`EXCLUDING THE EXPLICITLY STATED WARRANTIES WITHIN THESE TERMS, KEEBY.LIVE OFFERS ITS SERVICES ON AN 'AS-IS' AND 'AS-AVAILABLE' BASIS. YOUR ACCESS TO AND USE OF THE SERVICES OR ANY CONTENT IS AT YOUR SOLE RISK. YOU UNDERSTAND AND AGREE THAT THE SERVICES AND CONTENT ARE PROVIDED TO YOU ON AN 'AS IS,' 'WITH ALL FAULTS,' AND 'AS AVAILABLE' BASIS. WITHOUT LIMITING THE FOREGOING, TO THE FULL EXTENT PERMITTED BY LAW, KEEBY.LIVE DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT. TO THE EXTENT SUCH DISCLAIMER CONFLICTS WITH APPLICABLE LAW, THE SCOPE AND DURATION OF ANY APPLICABLE WARRANTY WILL BE THE MINIMUM PERMITTED UNDER SUCH LAW.

KEEBY.LIVE MAKES NO REPRESENTATIONS, WARRANTIES, OR GUARANTEES AS TO THE RELIABILITY, TIMELINESS, QUALITY, SUITABILITY, AVAILABILITY, ACCURACY, OR COMPLETENESS OF THE SERVICES OR ANY CONTENT. KEEBY.LIVE DOES NOT GUARANTEE THAT (A) THE SERVICES WILL BE SECURE, TIMELY, UNINTERRUPTED, OR ERROR-FREE, OR OPERATE IN COMBINATION WITH ANY OTHER HARDWARE, SOFTWARE, SYSTEM, OR DATA, (B) THE SERVICES WILL MEET YOUR REQUIREMENTS OR EXPECTATIONS, (C) ANY STORED DATA WILL BE ACCURATE OR RELIABLE, (D) THE QUALITY OF ANY PRODUCTS, SERVICES, INFORMATION, OR OTHER MATERIAL PURCHASED OR OBTAINED BY YOU THROUGH THE SERVICES WILL MEET YOUR REQUIREMENTS OR EXPECTATIONS, (E) ERRORS OR DEFECTS WILL BE CORRECTED, OR (F) THE SERVICE OR THE SERVER(S) THAT MAKE THE SERVICE AVAILABLE ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.

KEEBY.LIVE ALSO MAKES NO REPRESENTATIONS OR WARRANTIES OF ANY KIND WITH RESPECT TO CONTENT; USER CONTENT IS PROVIDED BY AND IS SOLELY THE RESPONSIBILITY OF THE USERS PROVIDING THAT CONTENT. NO ADVICE OR INFORMATION, WHETHER ORAL OR WRITTEN, OBTAINED FROM KEEBY.LIVE OR THROUGH THE SERVICES, WILL CREATE ANY WARRANTY NOT EXPRESSLY MADE HEREIN.

KEEBY.LIVE DOES NOT WARRANT, ENDORSE, GUARANTEE, OR ASSUME RESPONSIBILITY FOR ANY PRODUCT OR SERVICE ADVERTISED OR OFFERED BY A THIRD PARTY THROUGH THE KEEBY.LIVE SERVICE OR ANY HYPERLINKED WEBSITE OR SERVICE, AND KEEBY.LIVE WILL NOT BE A PARTY TO OR IN ANY WAY MONITOR ANY TRANSACTION BETWEEN YOU AND THIRD-PARTY PROVIDERS OF PRODUCTS OR SERVICES.

IN NO EVENT SHALL KEEBY.LIVE BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR EXEMPLARY DAMAGES, INCLUDING BUT NOT LIMITED TO, DAMAGES FOR LOSS OF PROFITS, GOODWILL, USE, DATA, OR OTHER INTANGIBLE LOSSES (EVEN IF KEEBY.LIVE HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES), RESULTING FROM THE USE OR THE INABILITY TO USE THE SERVICE.

IF APPLICABLE LAW DOES NOT ALLOW THE EXCLUSION OF SOME OR ALL OF THE ABOVE IMPLIED OR STATUTORY WARRANTIES TO APPLY TO YOU, THE ABOVE EXCLUSIONS WILL APPLY TO YOU TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW.`}
                    </p>
                    <div className="mb-2 text-xl ">
                        {" "}
                        Accuracy of Information
                    </div>
                    <p className="mb-5 rounded-md bg-darkGray p-5 ">
                        {`While we strive to provide accurate and up-to-date information on our Website, Keeby.live makes no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability concerning the Website or the information, products, services, or related graphics contained on the Website for any purpose. Any reliance you place on such information is therefore strictly at your own risk.`}
                    </p>
                    <div className="mb-2 text-xl ">Service Availability</div>
                    <p className="mb-5 rounded-md bg-darkGray p-5 ">
                        {` keeby.live reserves the right to modify, suspend, or discontinue any part of the Website or the services provided at any time without prior notice. We will not be liable if, for any reason, all or any part of the Website is unavailable at any time or for any period.`}
                    </p>
                    <div className="mb-2 text-xl ">Third-Party Links </div>
                    <p className="mb-5 rounded-md bg-darkGray p-5 ">
                        {`Our Website may contain links to third-party websites or services that are not owned or controlled by keeby.live. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites or services. You further acknowledge and agree that Genevieve Clare Hair shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods, or services available on or through any such websites or services.`}
                    </p>
                    <div className="mb-2 text-xl ">
                        Flashing Lights and Epilepsy Risk
                    </div>
                    <p className="mb-5 rounded-md bg-darkGray p-5 ">
                        {`Some parts of our Website may contain flashing lights or effects that could potentially trigger seizures for individuals with photosensitive epilepsy. By using our Website, you acknowledge and accept that keeby.live is not responsible for any health issues that may arise from viewing or interacting with such content. If you have a history of epilepsy or experience any symptoms while using our Website, please discontinue use immediately and consult with a healthcare professional.`}
                    </p>
                    <div className="mb-2 text-xl "> User Responsibilities</div>
                    <p className="mb-5 rounded-md bg-darkGray p-5 ">
                        {`Users are responsible for their interactions with other users and third parties. keeby.live disclaims any liability arising from such interactions. Users are also responsible for maintaining the confidentiality of their account information and for ensuring the security of their passwords.`}
                    </p>
                    <h2 className="mb-5 text-4xl text-green-500 ">
                        Contact Us
                    </h2>
                    <p className="mb-5 rounded-md bg-darkGray p-5  ">{`Please contact us at hacktimesupport@outlook.com.`}</p>
                </div>
            </div>
            <div className="w-full mt-40">
                <Footer />
            </div>
        </>
    );
}
