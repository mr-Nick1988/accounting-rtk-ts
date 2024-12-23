import {useState} from "react";
import {useAppDispatch} from "../../app/hooks.ts";
import {fetchUser} from "../../features/api/accountApi.ts";
import {createToken} from "../../utils/constants.ts";

const Login = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useAppDispatch();

    const handleClickLogin = () => {
        dispatch(fetchUser(createToken(login, password)));
    }

    const handelClickClear = () => {
        setLogin('');
        setPassword('');
    }

    return (
        <>
            <label>Login:
                <input
                    type="text"
                    onChange={(e) => setLogin(e.target.value)}
                    value={login}
                />
            </label>
            <label>Password:
                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
            </label>
            <button onClick={handleClickLogin}>Sign in</button>
            <button onClick={handelClickClear}>Clear</button>
        </>
    );
};

export default Login;