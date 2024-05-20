import { api } from "~/utils/api";
import EachSoldTransactionCard from "./eachSoldCard";
import EachPurchasedTransactionCard from "./eachPurchasedCard";

export default function DisplayTransactions({ userId }: { userId: string }) {
    const { data: allTransactions } =
        api.transaction.getAllByUserId.useQuery(userId);

    return (
        <div className=" w-full font-poppins">
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
        </div>
    );
}
