import { api } from "~/utils/api";
import EachPendingTransactionCard from "./eachPendingCard";
import EachSoldTransactionCard from "./eachSoldCard";
import EachPurchasedTransactionCard from "./eachPurchasedCard";
// import EachOfferCard from "./eachOfferCard";
// import EachOfferViewCard from "./eachOfferViewCard";

export default function DisplayTransactions({ userId }: { userId: string }) {
    const { data: allTransactions } =
        api.transaction.getAllByUserId.useQuery(userId);

    // LETS WALK THROUGH THIS

    // OFFER
    // BUYER can make an offer to seller if seller accepts Buyer has to pay --- PENDING OFFER

    // SELLER SHOULD SEE WHO BOUGHT THERE KEEB AND FOR WHAT PRICE...
    // will show agreed price.

    // pending shouldn't really exist anymore

    return (
        <div className="mt-5 w-full font-poppins">
            {/* <h2 className="mb-2">
                Pending ( {allTransactions ? allTransactions.pending.length : 0}{" "}
                )
            </h2>
            <div className="flex w-full flex-wrap gap-10">
                {allTransactions?.pending.map((transaction) => (
                    <div key={transaction.id}>
                        <EachPendingTransactionCard transaction={transaction} />
                    </div>
                ))}
            </div> */}

            <h2 className="mb-2 mt-5">
                Purchased ({" "}
                {allTransactions ? allTransactions.purchased.length : 0} )
            </h2>
            <div className="flex w-full flex-wrap gap-10">
                {allTransactions?.purchased.map((transaction) => (
                    <div key={transaction.id}>
                        <EachPurchasedTransactionCard
                            transaction={transaction}
                        />
                    </div>
                ))}
            </div>

            <h2 className="mb-2 mt-5">
                Sold ( {allTransactions ? allTransactions.sold.length : 0} )
            </h2>

            <div className="flex w-full flex-wrap gap-10">
                {allTransactions?.sold.map((transaction) => (
                    <div key={transaction.id}>
                        <EachSoldTransactionCard transaction={transaction} />
                    </div>
                ))}
            </div>
        </div>
    );
}
