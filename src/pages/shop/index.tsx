import { useState } from "react";

export default function KeebShop() {
    // big cards like bring a trailer  or like this
    // https://codepen.io/TurkAysenur/pen/BavLzPj

    // search by linear or tactile tags
    // budget or ballin  under or above 250

    const [filter, setFilter] = useState<string>("hot");

    return (
        <div className="mx-5 flex w-full">
            <div className="flex w-1/5 justify-center">Search here</div>

            <div className="mr-20 flex w-full flex-col">
                <div className="flex w-full justify-between">
                    <div className="flex gap-5 text-white/40">
                        <button
                            className={`${
                                filter === "hot" ? "text-white" : ""
                            }`}
                            onClick={() => setFilter("hot")}
                        >
                            Hot
                        </button>
                        <button
                            className={`${
                                filter === "new" ? "text-white" : ""
                            }`}
                            onClick={() => setFilter("new")}
                        >
                            New
                        </button>
                    </div>
                    <div>plus</div>
                </div>

                <div className="mt-36 flex flex-col">
                    <div>cool listing cards here</div>
                </div>
            </div>
        </div>
    );
}
