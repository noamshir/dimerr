import { connect } from 'react-redux';
import { useState } from 'react'
import { signIn, googleLogin,signUp} from '../../store/user.action.js';
import { toggleSignInModal, toggleJoinModal } from "../../store/scss.action"
import { showErrorMsg, showSuccessMsg } from '../../services/event-bus.service';
import { GoogleLogin } from 'react-google-login';
import CloseIcon from '@mui/icons-material/Close';

function _SignIn({ toggleSignInModal, signIn, toggleJoinModal, googleLogin,signUp }) {

    const [user, setUser] = useState({ username: "", password: "" });

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        const ans = await signIn(user);
        if (ans) {
            showSuccessMsg(`user ${ans.username} signed in`);
        }
        else {
            showErrorMsg('failed to login...')
        }
        toggleSignInModal(false);
    }

    const handleChange = ({ target }) => {
        const field = target.name;
        const value = target.value;
        setUser({ ...user, [field]: value });
    }

    const onJoin = () => {
        toggleSignInModal(false);
        toggleJoinModal(true);
    }
    const responseGoogle = (response) => {
        console.log(response);
    }
    const handleLogin = async (response) => {
        const googleUser = response.profileObj;
        const ans = await googleLogin(googleUser.googleId);
        if (ans) {
            showSuccessMsg(`${ans.username} logged successfuly`);
            toggleSignInModal();
        }
        else {
            var tempUser = {
                fullname: googleUser.name,
                username: googleUser.email,
                password: "secret",
                imgUrl: googleUser.imageUrl,
                googleId: googleUser.googleId
            }
            const joinedUser = await signUp(tempUser);
            if (!joinedUser) showErrorMsg("Failed google login...");
            showSuccessMsg(`${tempUser.username} logged successfuly`);
            toggleSignInModal();
        }
    }
    return (
        <section className="sign-modal">
            <div className='btn-close-sign' onClick={() => toggleSignInModal(false)}><CloseIcon /></div>
            <div className="modal-content">
                <header >
                    <h1 className="modal-title">Sign in to dimerr</h1>
                </header>
                <div className="social-tab">
                    <GoogleLogin
                        clientId="456063964515-eet79gl529lkfkqflgfagpb3jrojruih.apps.googleusercontent.com"
                        onSuccess={handleLogin}
                        onFailure={responseGoogle}
                        // isSignedIn={true}
                        cookiePolicy={'single_host_origin'}
                        className="social-btn"
                    ><p>Continue with Google</p></GoogleLogin >
                    <div className="seperator">
                        <span>OR</span>
                    </div>
                </div>
                <form action="" className="sign-form" onSubmit={handleSubmit}>
                    <div className="form-input-div">
                        <input required type="text" name="username" placeholder="Choose a Username" onChange={handleChange} className="user-input" />
                    </div>
                    <div className="form-input-div">
                        <input required type="password" name="password" placeholder="Choose a Password" onChange={handleChange} className="user-input" />
                    </div>
                    <button className="continue-btn" type="submit">Continue</button>
                </form>
            </div>
            <footer>
                <div className="sign-in-footer flex">
                    <p>No member yet?</p>
                    <button onClick={() => { onJoin() }}>Join now</button>
                </div>
            </footer>

        </section >
    )
}

function mapStateToProps({ userModule }) {
    return {
        user: userModule.user
    }
}
const mapDispatchToProps = {
    signIn,
    toggleSignInModal,
    toggleJoinModal,
    googleLogin,
    signUp
}

export const SignIn = connect(mapStateToProps, mapDispatchToProps)(_SignIn)