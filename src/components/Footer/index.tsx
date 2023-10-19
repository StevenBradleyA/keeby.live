import Link from "next/link";

export default function HomepageFooter() {
    // todo support a modal with a link to yt and a link to kofi and link to hacktime and a column that says im looking for work

    // looking for an entry level SWE role :D
    return (
        <div className="mt-96 flex gap-5 opacity-40">
            <div>
                Powered by <button>Hacktime</button>{" "}
            </div>
            <div>Support</div>
            <Link href="/privacy-policy" aria-label="Privacy Policy">
                Privacy
            </Link>
            <Link href="/terms-of-service" aria-label="Terms of Service">
                Terms
            </Link>
        </div>
    );
}
