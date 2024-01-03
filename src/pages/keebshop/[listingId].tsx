import { useRouter } from "next/router";




export default function EachListingPage() {

const router = useRouter()

const {listingId} = router.query

// how do we query for a specific listing stevem? 





    return (
        <>
            <div>hey there big boi</div>
        </>
    );
}
