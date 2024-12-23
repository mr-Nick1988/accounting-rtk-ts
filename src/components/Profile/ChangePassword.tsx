import  {useState} from "react";
import {useAppDispatch} from "../../app/hooks.ts";
import {changePassword} from "../../features/api/accountApi.ts";

interface Props {
    close: () => void;
}

const ChangePassword = ({ close }: Props) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [oldPasswordConfirmed, setOldPasswordConfirmed] = useState(false);
    const dispatch = useAppDispatch();

    const handleClickClear = () => {
        setNewPassword('');
        setConfirmPassword('');
        setOldPassword('');
        setErrorMessage('');
        setOldPasswordConfirmed(false);
    };

    const handleClickSave = async () => {
        if (!oldPasswordConfirmed) {
            setErrorMessage('Please confirm your old password before changing it.');
            return;
        }

        if (newPassword !== confirmPassword) {
            setErrorMessage('New password and confirm password do not match!');
            return;
        }

        setErrorMessage('');

        try {
            await dispatch(changePassword({ oldPassword, newPassword }));
            close();
        } catch (error) {
            setErrorMessage('Failed to change password. Please try again.');
        }
    };

    return (
        <div>
            <label>Old password:
                <input
                    onChange={(e) => setOldPassword(e.target.value)}
                    value={oldPassword}
                    type="password"
                    placeholder="Enter your old password"
                />
            </label>
            <br />

            <label>New Password:
                <input
                    onChange={(e) => setNewPassword(e.target.value)}
                    value={newPassword}
                    type="password"
                    placeholder="Enter your new password"
                />
            </label>
            <br />

            <label>Confirm Password:
                <input
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                    type="password"
                    placeholder="Confirm your new password"
                />
            </label>
            <br />

            {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
            <button onClick={handleClickSave}>Save and Close</button>
            <button onClick={close}>Close without Save</button>
            <button onClick={handleClickClear}>Clear</button>
        </div>
    );
};

export default ChangePassword;

