// import { createContext, useEffect, useState } from "react";
// import { api } from "~/utils/api";

// interface OffersProviderProps {
//     userId: string;
//     children: React.ReactNode;
// }




// interface OffersContextType {
//     offers: Offer[];
//     setOffers: (offers: Offer[]) => void;
//     refreshOffers: () => void;
// }

// const OffersContext = createContext<OffersContextType | undefined>(undefined);

// export const useOffers = (): OffersContextType => {
//     const context = useContext(OffersContext);
//     if (!context) {
//         throw new Error("useOffers must be used within an OffersProvider");
//     }
//     return context;
// };





// const OffersProvider: React.FC<OffersProviderProps> = ({
//     userId,
//     children,
// }) => {
//     const [offers, setOffers] = useState<Offer[]>([]);

//     useEffect(() => {
//         async function fetchOffers() {
//             const {data: allOffers } = await api.offer.getAllByUserId(userId); // Adjust this line according to your actual API.
//             // setOffers(response.data.offers);
//         }
//         fetchOffers();
//     }, [userId]);

//     const refreshOffers = async () => {
//         const response = await api.offer.getAllByUserId(userId);
//         setOffers(response.data.offers);
//     };

//     const value = { offers, setOffers, refreshOffers };

//     return (
//         <OffersContext.Provider value={value}>
//             {children}
//         </OffersContext.Provider>
//     );
// };

// export default OffersProvider;
