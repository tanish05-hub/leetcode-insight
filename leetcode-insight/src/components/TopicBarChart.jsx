import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Cell } from "recharts";

const TIER_COLORS = {
    fundamental: "#60a5fa",
    intermediate: "#3b82f6",
    advanced: "#2563eb"
};

function flattenTopics(skillData) {
    const tiers = ["fundamental", "intermediate", "advanced"];
    let allTopics = [];

    tiers.forEach((tier) => {
        const topicsInTier = skillData[tier] || [];
        topicsInTier.forEach((topic) => {
            allTopics.push({ ...topic, tier });
        });
    });

    return allTopics;
}

function TopicBarChart({ skillData }) {

    if (!skillData) {
        return (
            <div className="topic-bar-chart">
                <h3>Solved Questions by Topic</h3>
                <p className="no-data-msg">No topic data found.</p>
            </div>
        );
    }

    const allTopics = flattenTopics(skillData);

    // Sort DESCENDING (most solved first) — opposite of WeakTopics, since
    // here we want to celebrate strengths and show full variety, not gaps.
    const sorted = allTopics.slice().sort((a, b) => b.problemsSolved - a.problemsSolved);

    return (
        <div className="topic-bar-chart">
            <h3>Solved Questions by Topic</h3>
            <p className="weak-topics-subtitle">Every topic you've practiced, most to least</p>

            <ResponsiveContainer width="100%" height={Math.max(400, sorted.length * 22)}>
                <BarChart
                    data={sorted}
                    layout="vertical"
                    margin={{ left: 30, right: 20 }}
                >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" />
                    <YAxis
                        type="category"
                        dataKey="tagName"
                        width={140}
                        tick={{ fontSize: 12 }}
                    />
                    <Tooltip
                        formatter={(value, name, props) => [`${value} solved`, props.payload.tier]}
                    />
                    <Bar dataKey="problemsSolved" radius={[0, 4, 4, 0]}>
                        {sorted.map((entry) => (
                            <Cell key={entry.tagSlug} fill={TIER_COLORS[entry.tier]} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default TopicBarChart;