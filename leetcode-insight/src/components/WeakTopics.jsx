// Combines all three tiers into one flat array, tagging each topic
// with its tier so we can still show that info later.
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

// Returns a CSS class based on how many problems were solved in that topic.
// This is a simple heuristic: fewer solved = weaker topic.
function getStrengthClass(count) {
    if (count <= 2) return "weak";
    if (count <= 10) return "moderate";
    return "strong";
}

function WeakTopics({ skillData }) {

    if (!skillData) {
        return (
            <div className="weak-topics">
                <h3>Topic Strength Analysis</h3>
                <p className="no-data-msg">No topic data found.</p>
            </div>
        );
    }

    const allTopics = flattenTopics(skillData);

    // Sort ascending by problemsSolved — weakest topics appear first.
    // We use .slice() before .sort() so we don't mutate the original array
    // (sort() modifies in place, which is a common React gotcha to avoid).
    const sortedWeakest = allTopics.slice().sort((a, b) => a.problemsSolved - b.problemsSolved);

    // Show only the 8 weakest topics — listing all 37 would be overwhelming.
    const weakestEight = sortedWeakest.slice(0, 8);

    return (
        <div className="weak-topics">
            <h3>Topic Strength Analysis</h3>
            <p className="weak-topics-subtitle">Your 8 least-practiced topics — focus here to improve</p>

            <div className="topic-list">
                {weakestEight.map((topic) => (
                    <div key={topic.tagSlug} className="topic-row">
                        <span className="topic-name">{topic.tagName}</span>
                        <span className="topic-tier">{topic.tier}</span>
                        <span className={`topic-count ${getStrengthClass(topic.problemsSolved)}`}>
                            {topic.problemsSolved} solved
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default WeakTopics;