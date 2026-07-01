import { useState } from "react";
import { getProfile, getSolvedStats } from "../services/api";

function FriendCompare({ currentProfile, currentSolvedData }) {

    const [friendUsername, setFriendUsername] = useState("");
    const [friendProfile, setFriendProfile] = useState(null);
    const [friendSolvedData, setFriendSolvedData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleCompare(e) {
        e.preventDefault();

        if (friendUsername.trim() === "") return;

        try {
            setLoading(true);
            setError("");

            const profileData = await getProfile(friendUsername.trim());

            if (profileData.errors || !profileData.username) {
                setError("Friend not found");
                setFriendProfile(null);
                setFriendSolvedData(null);
                return;
            }

            setFriendProfile(profileData);

            const solved = await getSolvedStats(friendUsername.trim());
            setFriendSolvedData(solved);

        } catch (err) {
            console.log(err);
            setError("Something went wrong");
            setFriendProfile(null);
            setFriendSolvedData(null);
        } finally {
            setLoading(false);
        }
    }

    // Don't render the comparison feature at all until the main profile has loaded.
    if (!currentProfile) return null;

    return (
        <div className="friend-compare">
            <h3>Compare With a Friend</h3>

            <form className="friend-search-bar" onSubmit={handleCompare}>
                <input
                    type="text"
                    placeholder="Enter friend's LeetCode username"
                    value={friendUsername}
                    onChange={(e) => setFriendUsername(e.target.value)}
                />
                <button type="submit">Compare</button>
            </form>

            {loading && <p className="compare-status">Loading...</p>}
            {error && <p className="compare-status error">{error}</p>}

            {friendProfile && friendSolvedData && currentSolvedData && (
                <div className="compare-grid">

                    {/* Current user's column */}
                    <div className="compare-column">
                        <img src={currentProfile.avatar} alt="Avatar" className="compare-avatar" />
                        <h4>{currentProfile.username}</h4>
                        <p>Rank: {currentProfile.ranking}</p>
                        <p>Solved: {currentSolvedData.solvedProblem}</p>
                        <p>Easy: {currentSolvedData.easySolved}</p>
                        <p>Medium: {currentSolvedData.mediumSolved}</p>
                        <p>Hard: {currentSolvedData.hardSolved}</p>
                    </div>

                    <div className="compare-vs">VS</div>

                    {/* Friend's column */}
                    <div className="compare-column">
                        <img src={friendProfile.avatar} alt="Avatar" className="compare-avatar" />
                        <h4>{friendProfile.username}</h4>
                        <p>Rank: {friendProfile.ranking}</p>
                        <p>Solved: {friendSolvedData.solvedProblem}</p>
                        <p>Easy: {friendSolvedData.easySolved}</p>
                        <p>Medium: {friendSolvedData.mediumSolved}</p>
                        <p>Hard: {friendSolvedData.hardSolved}</p>
                    </div>

                </div>
            )}
        </div>
    );
}

export default FriendCompare;