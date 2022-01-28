import { connect } from 'react-redux'
import { setExplore, setHome, setDetails,setBecomeSeller,setProfile } from '../store/scss.action';
import { useEffect } from 'react'

import { AppHero } from '../cmp/AppHero'
import { HomeCategory } from '../cmp/HomeCategory'
import { HomePageInfo } from '../cmp/HomePageInfo'
import { HomeReviews } from '../cmp/HomeReviews';

function _Home({ isHome, setExplore, setHome,setBecomeSeller,setProfile }) {

  useEffect(() => {
    onSetHome();
    return () => {
    }
  })
  const onSetHome = () => {
    if (isHome) return;
    setExplore(false);
    setHome(true);
    setDetails(false);
    setBecomeSeller(false);
    setProfile(false)
  }

  return (
    <section className="home-page-container">
      <div className="homepage">
        <AppHero />
        <HomeCategory />
        <HomePageInfo />
        <HomeReviews />
      </div>
    </section>
  )
}

function mapStateToProps({ scssModule }) {
  return {
    isHome: scssModule.isHome,
    isExplore: scssModule.isExplore
  }
}

const mapDispatchToProps = {
  setExplore,
  setHome,
  setDetails,
  setBecomeSeller,
  setProfile
}

export const Home = connect(mapStateToProps, mapDispatchToProps)(_Home);