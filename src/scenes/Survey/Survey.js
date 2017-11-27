import React, {Component} from 'react';
import Topbar from './components/Topbar/Topbar';
import Navbar from './components/Navbar/Navbar';
import ChooseNameForm from './components/ChooseNameForm/ChooseNameForm';
import ChooseCountryForm from './components/ChooseCountryForm/ChooseCountryForm';
import ChooseSocialForm from './components/ChooseSocialForm/ChooseSocilaForm';
import ChooseCatForm from './components/ChooseCatForm/ChooseCatForm';
import { connect } from 'react-redux';
import './survey.css';

class Survey extends Component {
    defineSurveyContent () {
        switch (this.props.activeStep) {
            case 1:
                return <ChooseNameForm />
            case 2:
                return <ChooseCountryForm />
            case 3:
                return <ChooseSocialForm />
            case 4:
                return <ChooseCatForm />
            default:
                return <div>Something went wrong!</div>
        }
    }

    render () {
        return <div>
                    {this.props.needShowFinal === false &&
                    <div className="survey-element">
                        <Topbar />
                        {this.defineSurveyContent()}
                        <Navbar />
                    </div>}
               </div>
    }
}

const mapStateToProps = (state) => ({
    activeStep: state.topBar.activeElementId,
    needShowFinal: state.topBar.showFinal
});

export default connect(mapStateToProps)(Survey);