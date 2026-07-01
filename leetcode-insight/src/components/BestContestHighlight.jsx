function BestContestHighlight({ contestData }) {

    if (!contestData || contestData.count === 0) {
        return (
            <div className="best-contest-highlight">
                <h3>Contest Highlights</h3>
                <p className="no-data-msg">No contest history yet.</p>
            </div>
        );
    }

    const history = contestData.contestHistory;

    // Best (lowest) rank across all attended contests with a valid ranking.
    // We filter ranking > 0 because the API can return 0 for unrated/glitched entries.
    const validRankings = history.filter((c) => c.ranking > 0);
    const bestRankEntry = validRankings.reduce((best, current) =>
        current.ranking < best.ranking ? current : best
    , validRankings[0]);

    // Peak rating ever achieved.
    const peakRatingEntry = history.reduce((best, current) =>
        current.rating > best.rating ? current : best
    , history[0]);

    // Biggest single-contest rating jump (current contest's rating minus the previous one).
    let biggestJump = { delta: -Infinity, contest: null };
    for (let i = 1; i < history.length; i++) {
        const delta = history[i].rating - history[i - 1].rating;
        if (delta > biggestJump.delta) {
            biggestJump = { delta, contest: history[i].contest.title };
        }
    }

    // Contests where the user didn't solve every problem — we only know
    // the COUNT of unsolved problems per contest, not which specific ones
    // (the API doesn't expose per-problem solve status).
    const incompleteContests = history
        .filter((c) => c.problemsSolved < c.totalProblems)
        .map((c) => ({
            title: c.contest.title,
            unsolved: c.totalProblems - c.problemsSolved,
            solved: c.problemsSolved,
            total: c.totalProblems
        }))
        .slice(-5) // most recent 5 incomplete contests
        .reverse();

    return (
        <div className="best-contest-highlight">
            <h3>Contest Highlights</h3>

            <div className="highlight-grid">
                <div className="highlight-box">
                    <span className="highlight-label">Best Rank</span>
                    <span className="highlight-value">#{bestRankEntry.ranking}</span>
                    <span className="highlight-sub">{bestRankEntry.contest.title}</span>
                </div>

                <div className="highlight-box">
                    <span className="highlight-label">Peak Rating</span>
                    <span className="highlight-value">{Math.round(peakRatingEntry.rating)}</span>
                    <span className="highlight-sub">{peakRatingEntry.contest.title}</span>
                </div>

                <div className="highlight-box">
                    <span className="highlight-label">Biggest Jump</span>
                    <span className="highlight-value">+{Math.round(biggestJump.delta)}</span>
                    <span className="highlight-sub">{biggestJump.contest}</span>
                </div>
            </div>

            {incompleteContests.length > 0 && (
                <div className="incomplete-section">
                    <h4>Recent Contests with Unsolved Problems</h4>
                    {/* Note: the API only tells us HOW MANY problems went unsolved
                        per contest, not which specific ones — that data isn't
                        exposed by the backend. */}
                    <div className="topic-list">
                        {incompleteContests.map((c) => (
                            <div key={c.title} className="topic-row">
                                <span className="topic-name">{c.title}</span>
                                <span className="topic-tier">{c.solved}/{c.total} solved</span>
                                <span className="topic-count weak">{c.unsolved} unsolved</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default BestContestHighlight;