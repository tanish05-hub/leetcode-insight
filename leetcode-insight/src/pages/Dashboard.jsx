import { useEffect, useState } from "react";
import api, { getSolvedStats, getContestHistory, getRecentSubmissions, getSubmissionCalendar, getSkillStats } from "../services/api";

import Navbar from "../components/Navbar";
import ProfileCard from "../components/ProfileCard";
import SearchBar from "../components/SearchBar";
import StatsCard from "../components/StatsCard";
import DifficultyPieChart from "../components/DifficultyPieChart";
import ContestRatingChart from "../components/ContestRatingChart";
import RecentSubmissions from "../components/RecentSubmissions";
import SubmissionHeatmap from "../components/SubmissionHeatmap";
import WeakTopics from "../components/WeakTopics";
import FriendCompare from "../components/FriendCompare";
import TopicBarChart from "../components/TopicBarChart";
import BestContestHighlight from "../components/BestContestHighlight";
import { SkeletonProfile, SkeletonStatsGrid, SkeletonChartCard } from "../components/Skeleton";

function Dashboard() {

    const [profile, setProfile] = useState(null);
    const [solvedData, setSolvedData] = useState(null);
    const [calendarData, setCalendarData] = useState(null);
    const [contestData, setContestData] = useState(null);
    const [submissionData, setSubmissionData] = useState(null);
    const [skillData, setSkillData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
        localStorage.setItem("theme", darkMode ? "dark" : "light");
    }, [darkMode]);

    function toggleTheme() {
        setDarkMode((prev) => !prev);
    }

    async function fetchUser(username) {

        try {

            setLoading(true);
            setError("");

            const response = await api.get("/" + username);

            if (response.data.errors) {
                setError("User not found");
                setProfile(null);
                setSolvedData(null);
                setContestData(null);
                setSubmissionData(null);
                setCalendarData(null);
                setSkillData(null);
                return;
            }

            if (!response.data.username) {
                setError("User not found");
                setProfile(null);
                setSolvedData(null);
                setContestData(null);
                setSubmissionData(null);
                setCalendarData(null);
                setSkillData(null);
                return;
            }

            setProfile(response.data);

            const solved = await getSolvedStats(username);
            setSolvedData(solved);

            const contest = await getContestHistory(username);
            setContestData(contest);

            const submissions = await getRecentSubmissions(username);
            setSubmissionData(submissions);

            const calendar = await getSubmissionCalendar(username);
            setCalendarData(calendar);

            const skills = await getSkillStats(username);
            setSkillData(skills);

        }
        catch (error) {

            console.log(error);

            setError("Something went wrong");
            setProfile(null);
            setSolvedData(null);
            setContestData(null);
            setSubmissionData(null);
            setCalendarData(null);
            setSkillData(null);

        }
        finally {

            setLoading(false);

        }
    }

    useEffect(() => {

        fetchUser("tanish_243");

    }, []);

    return (

        <div>

            <Navbar darkMode={darkMode} onToggleTheme={toggleTheme} />

            <SearchBar
                onSearch={fetchUser}
            />

            {loading && (
                <>
                    <SkeletonProfile />
                    <SkeletonStatsGrid />
                    <SkeletonChartCard width="500px" height="280px" />
                    <SkeletonChartCard width="700px" height="320px" />
                    <SkeletonChartCard width="700px" height="200px" />
                </>
            )}

            {error && <h2>{error}</h2>}

            {

                profile &&

                <>

                    <ProfileCard profile={profile} />

                    <div className="stats-container">

                        <StatsCard
                            title="Global Rank"
                            value={profile.ranking}
                        />

                        <StatsCard
                            title="Username"
                            value={profile.username}
                        />

                        <StatsCard
                            title="Reputation"
                            value={profile.reputation}
                        />

                        <StatsCard
                            title="Country"
                            value={profile.country || "N/A"}
                        />

                    </div>

                    <DifficultyPieChart solvedData={solvedData} />

                    <ContestRatingChart contestData={contestData} />

                    <BestContestHighlight contestData={contestData} />

                    <RecentSubmissions submissionData={submissionData} />

                    <SubmissionHeatmap calendarData={calendarData} />

                    <WeakTopics skillData={skillData} />

                    <TopicBarChart skillData={skillData} />

                    <FriendCompare currentProfile={profile} currentSolvedData={solvedData} />

                </>

            }

        </div>

    );

}

export default Dashboard;