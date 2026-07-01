// Maps LeetCode language codes to friendlier display labels
const LANG_LABELS = {
    cpp: "C++",
    python: "Python",
    python3: "Python 3",
    java: "Java",
    javascript: "JavaScript",
    bash: "Bash",
    c: "C",
    csharp: "C#",
    go: "Go",
    rust: "Rust"
};

// Converts a Unix timestamp (seconds) into a relative time string like "2h ago"
function timeAgo(timestampSeconds) {
    const now = Date.now();
    const submittedAt = Number(timestampSeconds) * 1000;
    const diffSeconds = Math.floor((now - submittedAt) / 1000);

    if (diffSeconds < 60) return `${diffSeconds}s ago`;

    const diffMinutes = Math.floor(diffSeconds / 60);
    if (diffMinutes < 60) return `${diffMinutes}m ago`;

    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours}h ago`;

    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
}

function RecentSubmissions({ submissionData }) {

    if (!submissionData || submissionData.count === 0) {
        return (
            <div className="recent-submissions">
                <h3>Recent Submissions</h3>
                <p className="no-data-msg">No recent submissions found.</p>
            </div>
        );
    }

    return (
        <div className="recent-submissions">
            <h3>Recent Submissions</h3>

            <div className="submission-list">
                {/* .map() loops over each submission and renders one row per item.
                    The "key" prop is required by React to track each row efficiently
                    when the list re-renders — we combine titleSlug + timestamp since
                    the same problem can appear twice (like "Find the Duplicate Number" above). */}
                {submissionData.submission.map((sub) => (
                    <div
                        key={`${sub.titleSlug}-${sub.timestamp}`}
                        className="submission-row"
                    >
                        <span className="submission-title">{sub.title}</span>

                        <span className={
                            sub.statusDisplay === "Accepted"
                                ? "submission-status accepted"
                                : "submission-status failed"
                        }>
                            {sub.statusDisplay}
                        </span>

                        <span className="submission-lang">
                            {LANG_LABELS[sub.lang] || sub.lang}
                        </span>

                        <span className="submission-time">
                            {timeAgo(sub.timestamp)}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RecentSubmissions;