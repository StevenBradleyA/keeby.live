interface EachGameResultCard {}

export default function EachGameResultCard({ gameResults }) {
    return (
        <div className="flex w-full flex-col ">
            <div className="flex w-full gap-5  bg-red-200">
                <div className="h-full w-1/4">
                    <div className="border-2 border-green-500 p-3">
                        <h2>wpm</h2>
                        {gameResults.wpm}
                        <h2>purewpm </h2>
                        {gameResults.pureWpm}
                    </div>

                    <div>
                        <h2>accuracy</h2>
                        {gameResults.accuracy}
                    </div>
                </div>

                <div className="h-full w-1/2 "> graph data</div>

                <div className="h-full w-1/4"></div>
            </div>
            {gameResults && (
                <div>
                    <div>{gameResults.mode}</div>
                    <div>{gameResults.wpm}</div>
                    <div>{gameResults.pureWpm}</div>
                    <div>{gameResults.accuracy}</div>
                </div>
            )}
            )
        </div>
    );
}
