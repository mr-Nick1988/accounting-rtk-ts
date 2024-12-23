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
    const [securityAnswers, setSecurityAnswers] = useState<string[]>(['', '']); // Ответы на вопросы безопасности
    const [errorMessage, setErrorMessage] = useState('');
    const [oldPasswordConfirmed, setOldPasswordConfirmed] = useState(false);
    const dispatch = useAppDispatch();

    const securityQuestions = [
        "What is your favorite color?",
        "What city were you born in?"
    ];

    const handleChangeSecurityAnswer = (index: number, answer: string) => {
        const updatedAnswers = [...securityAnswers];
        updatedAnswers[index] = answer;
        setSecurityAnswers(updatedAnswers);
    };

    const handleClickClear = () => {
        setNewPassword('');
        setConfirmPassword('');
        setOldPassword('');
        setSecurityAnswers(['', '']);
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

        // Проверка на пустые ответы на вопросы безопасности
        if (securityAnswers.includes('')) {
            setErrorMessage('Please answer all security questions.');
            return;
        }

        setErrorMessage('');

        try {

            await dispatch(changePassword({ oldPassword, newPassword, securityAnswers }));

            close();
        } catch (error) {
            setErrorMessage('Failed to change password.');
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

            {securityQuestions.map((question, index) => (
                <div key={index}>
                    <label>{question}</label>
                    <input
                        type="text"
                        onChange={(e) => handleChangeSecurityAnswer(index, e.target.value)}
                        value={securityAnswers[index]}
                        placeholder="Answer to the security question"
                    />
                </div>
            ))}

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



