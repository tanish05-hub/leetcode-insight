function ProfileCard({ profile }) {

    return (

        <div className="profile-card">

            <img
                src={profile.avatar}
                alt="avatar"
                className="avatar"
            />

            <h1>{profile.name}</h1>

            <h3>@{profile.username}</h3>

            <p>🌍 Global Rank : {profile.ranking}</p>

        </div>

    );

}

export default ProfileCard;