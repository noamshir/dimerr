import React from 'react'
import Select from 'react-select'
import { connect } from 'react-redux'


import { Loader } from "../cmp/utils/Loader";
import video from '../assets/img/video.mp4'
import { gigService } from '../services/gig.service';
import { saveSellerInfo } from '../store/user.action'
import { initialService } from '../initials/initial.service';
import { setExplore, setDetails, setHome, setBecomeSeller, setProfile, toggleSignInModal } from '../store/scss.action';

class _BecomeSeller extends React.Component {
    state = {
        sellerInfo: {
            imgUrl: '',
            sellerDesc: '',
            origin: '',
            skills: []
        },
        isImgInside: false,
        options: null
    }

    async componentDidMount() {
        await this.makeOptions()
        this.onSetSellerPage();
    }

    onSetSellerPage = () => {
        if (this.props.isSellerDetails) return;
        this.props.setExplore(false);
        this.props.setHome(false);
        this.props.setDetails(false);
        this.props.setBecomeSeller(true);
        this.props.setProfile(false);
    }

    handleChange = (ev) => {
        const { target } = ev
        const field = target.name
        const value = target.value
        if (field === 'imgUrl' && value) {
            this.uploadImg(ev)
            this.setState(prevState => ({ ...prevState, isImgInside: true }))
            return
        }
        this.setState(prevState => ({ sellerInfo: { ...prevState.sellerInfo, [field]: value } }))
    }

    handleSelectChange = (skills) => {
        this.setState((prevState) => ({ sellerInfo: { ...prevState.sellerInfo, skills } }))
    };

    makeOptions = async () => {
        const categories = await gigService.getCategories()
        var arr = []
        categories.forEach(skill => {
            arr.push({ value: skill, label: skill })
        })
        this.setState({ options: arr });
    }

    submit = (ev) => {
        ev.preventDefault()
        const { user } = this.props
        const { sellerInfo } = this.state
        if (!user) {
            this.props.toggleSignInModal(true);
            return;
        }
        this.props.saveSellerInfo(sellerInfo)
        this.props.history.push('/')
        this.setState({ sellerInfo: { imgUrl: '', sellerDesc: '', origin: '', skills: [] }, isImgInside: false })
    }

    uploadImg = (ev) => {
        const CLOUD_NAME = initialService.getName()
        const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

        const formData = new FormData();
        formData.append('file', ev.target.files[0])
        formData.append('upload_preset', initialService.getPreset());

        return fetch(UPLOAD_URL, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(res => {
                this.setState(prevState => ({ sellerInfo: { ...prevState.sellerInfo, imgUrl: res.url } }), () => { console.log('rrrr', this.state); })
            })
            .catch(err => console.error(err))
    }


    render() {
        if (!this.state.options) return <Loader />
        const { sellerInfo, isImgInside } = this.state
        return (
            <section className='become-seller'>
                <div className="hero">
                    <video src={video} autoPlay loop className="become-seller-hero"></video>
                    <div className="container equal-padding">
                        <h2>
                            Work Your Way
                        </h2>
                        <p>
                            You bring the skill. We'll make earning easy.
                        </p>
                        <a className='btn clean-link' href="#form">Become a Seller</a>
                    </div>
                </div>
                <form className='seller-form in-become-seller-nav  max-width-container equal-padding' onSubmit={this.submit} id='form'>
                    <h2>Personal Info</h2>
                    <p className='title'>Tell us a bit about yourself. This information will appear on your public profile, so that potential buyers can get to know you better.</p>

                    <p>Profile Picture (optional)</p>
                    <label className='file-image'>
                        {!isImgInside ? '+' :
                            <img src={`${sellerInfo.imgUrl}`} alt="img" />
                        }
                        <input className='file-input' type={'file'} name='imgUrl' value={''} onChange={this.handleChange} />
                    </label>
                    <div className="field">
                        <p>Description</p>
                        <label className='description'>
                            <textarea className='desc' type={'txt'} name='sellerDesc' value={sellerInfo.sellerDesc} onChange={this.handleChange} />
                        </label>
                    </div>
                    <div className="field">
                        <p>Skills</p>
                        <div className="select-wrapper">
                            <Select isMulti
                                value={sellerInfo.skills}
                                onChange={this.handleSelectChange}
                                options={this.options}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <p>Origin</p>
                        <select className='select-field' value={sellerInfo.origin} name='origin' onChange={this.handleChange}>
                            <option value=''>Origin</option>
                            <option value="israel">Israel</option>
                            <option value="USA">USA</option>
                            <option value="australia">Australia</option>
                            <option value="germany">Germany</option>
                            <option value="pakistan">Pakistan</option>
                        </select>
                    </div>
                    <button className='btn' type='submit'>Continue</button>
                </form>
            </section>
        )
    }
}


function mapStateToProps(state) {
    return {
        user: state.userModule.user,
        isBecomeSeller: state.scssModule.isBecomeSeller
    }
}

const mapDispatchToProps = {
    saveSellerInfo,
    setExplore,
    setHome,
    setDetails,
    setBecomeSeller,
    setProfile,
    toggleSignInModal
};


export const BecomeSeller = connect(mapStateToProps, mapDispatchToProps)(_BecomeSeller)