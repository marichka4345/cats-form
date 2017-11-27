import React from 'react';
import {connect} from 'react-redux';
import NavButton from '../../components/NavButton/NavButton';
import { startSurvey } from '../Survey/components/Topbar/topBarActions';
import { socialNetworks } from '../Survey/components/ChooseSocialForm/ChooseSocilaForm';
import './final.css';

function Final (props) {
    const {userInfo, showFinal, startSurvey} = props;

    return  <div>
    {showFinal === true && <div className="final">
    <div className="final-screen">
        <div className="final-screen__general-info">
            <div className="final-screen__general-info__title">
                <div className="final-screen__general-info__name">
                    {userInfo.name.value}
                </div>
                <div className="final-screen__general-info__email">
                    {userInfo.email.value}
                </div>
            </div>

            <div className="final-screen__general-info__location">
                <span>{userInfo.city.value}, </span>
                <span>{userInfo.country.value}</span>
            </div>

            <div className="final-screen__general-info__socials">
                {
                    Object.entries(userInfo.socials)
                        .map(info => <div 
                                        className="social-network-info"
                                        key={info[0]}>
                        <span className="social-network-info__name">{socialNetworks[info[0]]}:&nbsp;</span>
                        <a target='_blank' href={info[1].value} className="social-network-info__link">
                            {info[1].value}
                        </a>
                    </div>)
                }
            </div>
        </div>
        <div  className="final-screen__photo">
            <img 
                src={`../../../assets/images/${userInfo.catPhotoName.value}.jpg`}
                className="final-screen__photo__image"
                alt="avatar" />
        </div>        
    </div>
    <NavButton 
        classModifier="final"
        onClick={startSurvey}>
        <span>Пройти заново</span>
    </NavButton>
    </div>
    }
    </div>
}

const mapStateToProps = state => ({
    userInfo: state.userInfo,
    showFinal: state.topBar.showFinal
});
const mapDispatchToProps = dispatch => ({
    startSurvey: () => dispatch(startSurvey())
});

export default connect(mapStateToProps, mapDispatchToProps)(Final);