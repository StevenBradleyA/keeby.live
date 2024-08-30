export default function ListingPageTitle({ title }: { title: string }) {
    const currentListingNameArr = title.split(" ");
    let smallTitle = "";
    let bigTitle = "";

    if (currentListingNameArr.length > 1) {
        smallTitle = currentListingNameArr.pop() || "";
        bigTitle = currentListingNameArr.join(" ");
    } else {
        bigTitle = title;
    }

    return (
        <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 flex gap-1 ">
            <div className=" listing-page-title-big  font-titillium text-5xl ">
                {bigTitle}
            </div>
            {smallTitle && (
                <div className="listing-page-title-small relative -bottom-5 font-yellowTail text-4xl">
                    {smallTitle}
                </div>
            )}
        </div>
    );
}
