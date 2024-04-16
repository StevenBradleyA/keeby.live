import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

export default function AccuracyVisualizer({
    averageAccuracy,
}: {
    averageAccuracy: number;
}) {
    console.log(averageAccuracy);
    const data = [
        { name: "Average Accuracy", value: averageAccuracy },
        {
            name: "Remaining",
            value: parseFloat((100 - averageAccuracy).toFixed(2)),
        },
    ];
    const COLORS = ["#22C55E", "#616161"]; // Green for accuracy, grey for the remaining






    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    stroke="none"
                    dataKey="value"
                    label
                >
                    {data.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                        />
                    ))}
                </Pie>
                <Legend/>
            </PieChart>
        </ResponsiveContainer>
    );
}
