interface CreateOfferProps {
    closeModal: () => void;
}
export default function CreateOffer({ closeModal }: CreateOfferProps) {
    return (
        <>
            <div>Would you like to make an offer to buy this keyboard?</div>
            <div>
                Offers are final - you will be charged if the seller accepts
                your offer!.
            </div>
        </>
    );
}
