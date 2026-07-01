import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = {
    Easy: "#00b8a3",
    Medium: "#ffc01e",
    Hard: "#ff375f"
};

function DifficultyPieChart({ solvedData }) {

    if (!solvedData) return null;

    const chartData = [
        { name: "Easy", value: solvedData.easySolved },
        { name: "Medium", value: solvedData.mediumSolved },
        { name: "Hard", value: solvedData.hardSolved }
    ];

    return (
        <div className="difficulty-pie-chart">

            <h3>Problems Solved by Difficulty</h3>

            <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                    <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={90}
                        label={(entry) => `${entry.name}: ${entry.value}`}
                    >
                        {chartData.map((entry) => (
                            <Cell key={entry.name} fill={COLORS[entry.name]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>

            <p className="total-solved">
                Total Solved: <strong>{solvedData.solvedProblem}</strong>
            </p>

        </div>
    );
}

export default DifficultyPieChart;