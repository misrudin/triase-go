import ProfileUser from "@/containers/Profile/Profile";


const ProfilePage = ({ ...props }) => {
    return (
        <>
            <ProfileUser {...props} />
        </>
    );
};

export default ProfilePage;
