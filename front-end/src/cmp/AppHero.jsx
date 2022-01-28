// import React from 'react'
// import { connect } from 'react-redux'
// import { NavLink } from 'react-router-dom'
import { SearchBar } from './SearchBar'
import { HeroPopularCategory } from './HeroPopularCategory'
import { useState, useEffect } from 'react'

export function AppHero(props) {
    var backIdx = 1;
    const [backClass1, setBack1] = useState('active');
    const [backClass2, setBack2] = useState('');
    const [backClass3, setBack3] = useState('');
    const [backClass4, setBack4] = useState('');
    const [bgcStyle, setBgcStyle] = useState({ backgroundColor: '#7d1b01' });

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (backIdx === 4) backIdx = 1
            else backIdx++
            _switchBackClass(backIdx, setBack1, setBack2, setBack3, setBack4, setBgcStyle)

        }, 7000)
        return () => {
            clearInterval(intervalId);
        }
    }, [])

    return (
        <div className="hero-container" style={bgcStyle}>
            <div className='background-images'>
                <div className={`background ${backClass1}`}>
                    <img src="https://res.cloudinary.com/drdfrwt1d/image/upload/v1642608522/hero-portrait_2_ifwtha.png" />
                </div>
                <div className={`background ${backClass2}`}>
                    <img src="https://res.cloudinary.com/drdfrwt1d/image/upload/v1642608521/hero-portrait_4_gfsdbz.png" />
                </div>
                <div className={`background ${backClass3}`}>
                    <img src="https://res.cloudinary.com/drdfrwt1d/image/upload/v1642779088/hero-portrait_3_gl7r4m.png" />
                </div>
                <div className={`background ${backClass4}`}>
                    <img src="https://res.cloudinary.com/drdfrwt1d/image/upload/v1642608521/hero-portrait_1_kxdfkl.png" />
                </div>
            </div>
            <div className="hero-content-container max-width-container">
                <div className='hero-content'>
                    <h1>Find the perfect <i>freelance</i> services for your business</h1>
                    <SearchBar placeholder='Try "designing business logo"' />
                    <HeroPopularCategory />
                </div>
                <div className="seller-name">
                    <span className={`seller ${backClass1}`}>Elton, <span className='seller-skill'>Programmer</span></span>
                    <span className={`seller ${backClass2}`}>Cabra, <span className='seller-skill'>Tattoo Artist</span></span>
                    <span className={`seller ${backClass3}`}>Sasha, <span className='seller-skill'>Fashion Designer</span></span>
                    <span className={`seller ${backClass4}`}>Mark, <span className='seller-skill'>Illustrator</span></span>
                </div>
            </div>
        </div>
    )
}

function _switchBackClass(backIdx, setBack1, setBack2, setBack3, setBack4, setBgcStyle) {
    switch (backIdx) {
        case 1:
            setBack1('active')
            setBack2('')
            setBack3('')
            setBack4('')
            setBgcStyle({ backgroundColor: '#7d1b01' })
            break;
        case 2:
            setBack1('')
            setBack2('active')
            setBack3('')
            setBack4('')
            setBgcStyle({ backgroundColor: '#003813' })
            break;
        case 3:
            setBack1('')
            setBack2('')
            setBack3('active')
            setBack4('')
            setBgcStyle({ backgroundColor: '#550e1f' })
            break;
        case 4:
            setBack1('')
            setBack2('')
            setBack3('')
            setBack4('active')
            setBgcStyle({ backgroundColor: '#b64761' })
            break;

    }
}