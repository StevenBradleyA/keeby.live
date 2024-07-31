import { ResponsiveContainer, AreaChart, Area, XAxis } from "recharts";

export default function WpmThermometer({
    averageWpm,
    rank,
}: {
    averageWpm: number;
    rank: number;
}) {
    const maxWpm = rank;
    const data = Array.from({ length: maxWpm }, (_, i) => ({
        index: i + 1,
        wpm: i < averageWpm ? averageWpm : 0,
    }));

    return (
        <ResponsiveContainer width="100%" height={150}>
            <AreaChart data={data}>
                <defs>
                    <linearGradient id="colorWpm" x1="0" y1="0" x2="0" y2="1">
                        <stop
                            offset="5%"
                            stopColor="#22C55E"
                            stopOpacity={0.8}
                        />
                        <stop
                            offset="95%"
                            stopColor="#22C55E"
                            stopOpacity={0}
                        />
                    </linearGradient>
                </defs>
                <XAxis dataKey="index" hide />
                <Area
                    type="monotone"
                    dataKey="wpm"
                    stroke="#22C55E"
                    fillOpacity={1}
                    fill="url(#colorWpm)"
                />
            </AreaChart>
        </ResponsiveContainer>
    );
}
