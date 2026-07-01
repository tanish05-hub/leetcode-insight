import { useMemo } from "react";

function getIntensityClass(count) {
    if (count === 0) return "heat-0";
    if (count <= 2) return "heat-1";
    if (count <= 5) return "heat-2";
    if (count <= 9) return "heat-3";
    return "heat-4";
}

function SubmissionHeatmap({ calendarData }) {

    if (!calendarData || !calendarData.submissionCalendar) {
        return (
            <div className="submission-heatmap">
                <h3>Submission Activity</h3>
                <p className="no-data-msg">No activity data found.</p>
            </div>
        );
    }

    const calendarMap = JSON.parse(calendarData.submissionCalendar);

    // Build today's date at UTC midnight (not local midnight) so it
    // matches the UTC-based timestamps LeetCode uses as calendar keys.
    const now = new Date();
    const todayUTC = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());

    const days = [];
    for (let i = 364; i >= 0; i--) {
        // Each day's UTC midnight timestamp, in milliseconds
        const dayTimestampMs = todayUTC - i * 24 * 60 * 60 * 1000;
        const unixDay = dayTimestampMs / 1000;

        const count = calendarMap[unixDay] || 0;

        days.push({ date: new Date(dayTimestampMs), count });
    }

    const weeks = [];
    for (let i = 0; i < days.length; i += 7) {
        weeks.push(days.slice(i, i + 7));
    }

    return (
        <div className="submission-heatmap">
            <h3>Submission Activity</h3>

            <div className="heatmap-grid">
                {weeks.map((week, weekIndex) => (
                    <div className="heatmap-week" key={weekIndex}>
                        {week.map((day, dayIndex) => (
                            <div
                                key={dayIndex}
                                className={`heatmap-day ${getIntensityClass(day.count)}`}
                                title={`${day.date.toUTCString().slice(0, 16)}: ${day.count} submissions`}
                            />
                        ))}
                    </div>
                ))}
            </div>

            <p className="heatmap-stats">
                <strong>{calendarData.totalActiveDays}</strong> active days •
                Current streak: <strong>{calendarData.streak}</strong> days
            </p>
        </div>
    );
}

export default SubmissionHeatmap;