import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

function ContestRatingChart({ contestData }) {

    if (!contestData || contestData.count === 0) {
        return (
            <div className="contest-rating-chart">
                <h3>Contest Rating History</h3>
                <p className="no-data-msg">No contest history yet. Participate in a LeetCode contest to see your rating trend here!</p>
            </div>
        );
    }

    const chartData = contestData.contestHistory.map((entry) => ({
        title: entry.contest.title,
        rating: Math.round(entry.rating),
        ranking: entry.ranking,
        date: new Date(entry.contest.startTime * 1000).toLocaleDateString("en-US", {
            month: "short",
            year: "2-digit"
        })
    }));

    return (
        <div className="contest-rating-chart">
            <h3>Contest Rating History</h3>

            <ResponsiveContainer width="100%" height={320}>
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis
                        dataKey="date"
                        tick={{ fontSize: 11 }}
                        interval="preserveStartEnd"
                    />

                    <YAxis domain={["dataMin - 50", "dataMax + 50"]} />

                    <Tooltip
                        formatter={(value, name, props) => [
                            `${value} (Rank ${props.payload.ranking})`,
                            props.payload.title
                        ]}
                    />

                    <Line
                        type="monotone"
                        dataKey="rating"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>

            <p className="current-rating">
                Current Rating: <strong>{Math.round(contestData.contestHistory[contestData.contestHistory.length - 1].rating)}</strong>
                {" "}• Contests Attended: <strong>{contestData.contestHistory.length}</strong>
            </p>
        </div>
    );
}

export default ContestRatingChart;