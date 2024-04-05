interface CreateTransactionProps {
    closeModal: () => void;
}

export default function CreateTransaction({
    closeModal,
}: CreateTransactionProps) {
    return (
        <>
            <div>Would you like purchase this keyboard?</div>
            <div>
                Purchases are final. Please read buying guide. If the seller
                does not ship out your purchase in a week you will be refunded.
            </div>
        </>
    );
}
