import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000"
});

export default api;

// Fetch full profile data for a username
export async function getProfile(username) {
    const response = await api.get(`/${username}`);
    return response.data;
}
// Fetch submission calendar/heatmap data for a user
export async function getSubmissionCalendar(username) {
    const response = await api.get(`/${username}/calendar`);
    return response.data;
}
// Fetch topic-wise skill stats for a user
export async function getSkillStats(username) {
    const response = await api.get(`/${username}/skill`);
    return response.data;
}
// Fetch recent submissions for a user
export async function getRecentSubmissions(username) {
    const response = await api.get(`/${username}/submission`);
    return response.data;
}
// Fetch solved-problem stats (used for difficulty pie chart)
export async function getSolvedStats(username) {
    const response = await api.get(`/${username}/solved`);
    return response.data;
}

// Fetch contest rating history for a user
export async function getContestHistory(username) {
    const response = await api.get(`/${username}/contest/history`);
    return response.data;
}