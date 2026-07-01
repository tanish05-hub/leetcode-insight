export function SkeletonBox({ width = "100%", height = "20px", radius = "8px", style = {} }) {
    return (
        <div
            className="skeleton-box"
            style={{ width, height, borderRadius: radius, ...style }}
        />
    );
}

export function SkeletonProfile() {
    return (
        <div className="profile-card skeleton-card">
            <SkeletonBox width="140px" height="140px" radius="50%" style={{ margin: "0 auto" }} />
            <SkeletonBox width="60%" height="24px" style={{ margin: "16px auto 8px" }} />
            <SkeletonBox width="40%" height="16px" style={{ margin: "0 auto 10px" }} />
            <SkeletonBox width="50%" height="16px" style={{ margin: "0 auto" }} />
        </div>
    );
}

export function SkeletonStatsGrid() {
    return (
        <div className="stats-container">
            {[1, 2, 3, 4].map((i) => (
                <div className="stats-card skeleton-card" key={i}>
                    <SkeletonBox width="70%" height="12px" style={{ margin: "0 auto 12px" }} />
                    <SkeletonBox width="50%" height="26px" style={{ margin: "0 auto" }} />
                </div>
            ))}
        </div>
    );
}

export function SkeletonChartCard({ width = "500px", height = "280px" }) {
    return (
        <div className="skeleton-chart-card" style={{ width }}>
            <SkeletonBox width="40%" height="20px" style={{ margin: "0 auto 20px" }} />
            <SkeletonBox width="100%" height={height} radius="12px" />
        </div>
    );
}