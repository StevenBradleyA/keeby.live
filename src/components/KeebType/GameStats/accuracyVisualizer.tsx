import { ResponsiveContainer, AreaChart, Area, XAxis } from "recharts";

export default function AccuracyVisualizer({
    averageAccuracy,
}: {
    averageAccuracy: number;
}) {
    const maxAccuracy = 100; // Maximum scale for accuracy
    const data = Array.from({ length: maxAccuracy }, (_, i) => ({
        index: i + 1,
        accuracy: i < averageAccuracy ? averageAccuracy : 0,
    }));

    return (
        <ResponsiveContainer width="100%" height={150}>
            <AreaChart data={data}>
                <defs>
                    <linearGradient
                        id="colorAccuracy"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                    >
                        <stop
                            offset="5%"
                            stopColor="#22B5C5"
                            stopOpacity={0.8}
                        />
                        <stop
                            offset="95%"
                            stopColor="#22B5C5"
                            stopOpacity={0}
                        />
                    </linearGradient>
                </defs>
                <XAxis dataKey="index" hide />
                <Area
                    type="monotone"
                    dataKey="accuracy"
                    stroke="#22B5C5"
                    fillOpacity={1}
                    fill="url(#colorAccuracy)"
                />
            </AreaChart>
        </ResponsiveContainer>
    );
}

// import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

// export default function AccuracyVisualizer({
//     averageAccuracy,
// }: {
//     averageAccuracy: number;
// }) {
//     console.log(averageAccuracy);
//     const data = [
//         { name: "Average Accuracy", value: averageAccuracy },
//         {
//             name: "Remaining",
//             value: parseFloat((100 - averageAccuracy).toFixed(2)),
//         },
//     ];
//     const COLORS = ["#22B5C5", "#616161"]; // Green for accuracy, grey for the remaining

//     return (
//         <ResponsiveContainer width="100%" height={300}>
//             <PieChart>
//                 <Pie
//                     data={data}
//                     cx="50%"
//                     cy="50%"
//                     innerRadius={50}
//                     outerRadius={80}
//                     stroke="none"
//                     dataKey="value"
//                     label
//                 >
//                     {data.map((entry, index) => (
//                         <Cell
//                             key={`cell-${index}`}
//                             fill={COLORS[index % COLORS.length]}
//                         />
//                     ))}
//                 </Pie>
//                 <Legend/>
//             </PieChart>
//         </ResponsiveContainer>
//     );
// }
