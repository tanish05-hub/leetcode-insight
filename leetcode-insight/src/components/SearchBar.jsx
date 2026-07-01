import { useState, useEffect } from "react";

const HISTORY_KEY = "searchHistory";
const MAX_HISTORY = 5;

function SearchBar({ onSearch }) {

    const [username, setUsername] = useState("");
    const [history, setHistory] = useState([]);

    // Load saved history once when the component first mounts.
    useEffect(() => {
        const saved = localStorage.getItem(HISTORY_KEY);
        if (saved) {
            setHistory(JSON.parse(saved));
        }
    }, []);

    function saveToHistory(name) {
        setHistory((prev) => {
            // Remove the name if it already exists (so re-searching moves it
            // to the front instead of creating a duplicate), then add it at
            // the start, then cap the list at MAX_HISTORY entries.
            const withoutDupes = prev.filter((item) => item !== name);
            const updated = [name, ...withoutDupes].slice(0, MAX_HISTORY);

            localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
            return updated;
        });
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (username.trim() === "") return;

        const trimmed = username.trim();
        onSearch(trimmed);
        saveToHistory(trimmed);
        setUsername("");
    }

    function handleHistoryClick(name) {
        setUsername(name);
        onSearch(name);
        saveToHistory(name);
    }

    return (
        <div className="search-bar-wrapper">
            <form className="search-bar" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter LeetCode Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <button type="submit">Analyze</button>
            </form>

            {history.length > 0 && (
                <div className="search-history">
                    <span className="search-history-label">Recent:</span>
                    {history.map((name) => (
                        <button
                            key={name}
                            className="search-history-chip"
                            onClick={() => handleHistoryClick(name)}
                        >
                            {name}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default SearchBar;