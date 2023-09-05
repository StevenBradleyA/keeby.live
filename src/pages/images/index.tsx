import CreateImage from "../../components/Images/Create";
import DisplayImages from "../../components/Images/Display";

export default function Images() {
    //! need to refactor this to include proper userId pass
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
            <h1>why hello weary traveler</h1>
            <CreateImage />
            <DisplayImages userId="cljyl59i90000ov93qhw2ujsd" />
        </div>
    );
}
