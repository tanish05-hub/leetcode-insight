import { Sun, Moon } from "lucide-react";

function Navbar({ darkMode, onToggleTheme }) {

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <span className="accent-dot"></span>
                <h2 style={{ margin: 0 }}>LeetCode Insight</h2>
            </div>

            <button className="theme-toggle" onClick={onToggleTheme}>
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
        </nav>
    );
}

export default Navbar;