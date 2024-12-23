import {useState} from "react";
import EditProfile from "./Profile/EditProfile.tsx";
import ChangePassword from "./Profile/ChangePassword.tsx";
import {UpdateMode} from '../utils/types.d';




const UpdateUser = () => {
    const [updateMode, setUpdateMode] = useState(UpdateMode.DEFAULT);

    switch (updateMode) {
        case UpdateMode.EDIT_PROFILE:
            return <EditProfile close={() => setUpdateMode(UpdateMode.DEFAULT)}/>
        case UpdateMode.CHANGE_PASSWORD:
            return <ChangePassword close={() => setUpdateMode(UpdateMode.DEFAULT)}/>
        default:
            return (
                <div>
                    <button onClick={() => setUpdateMode(UpdateMode.CHANGE_PASSWORD)}>Change password</button>
                    <button onClick={() => setUpdateMode(UpdateMode.EDIT_PROFILE)}>Edit profile</button>
                </div>
            );
    }
};

export default UpdateUser;