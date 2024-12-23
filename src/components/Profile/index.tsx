import ProfileData from "./ProfileData.tsx";
import UpdateUser from "../UpdateUser.tsx";
import {useAppDispatch} from "../../app/hooks.ts";
import {deleteToken} from "../../features/slices/tokenSlice.ts";
import {deleteUser} from "../../features/slices/userSlice.ts";

const Profile = () => {
    const dispatch = useAppDispatch();

    const handleClickLogout = () => {
        dispatch(deleteToken());
        dispatch(deleteUser());
    }

    return (
        <div>
            <ProfileData/>
            <button onClick={handleClickLogout}>Logout</button>
            <UpdateUser/>
        </div>
    );
};

export default Profile;