import React, {Component} from 'react';
import { connect } from 'react-redux';
import NavButton from '../../../../components/NavButton/NavButton';
import {showFinal, incrementActiveId, decrementActiveId} from '../Topbar/topBarActions';
import './navbar.css';

class Navbar extends Component {
    constructor (props) {
        super(props);
        this.decrementStep = this.decrementStep.bind(this);
        this.incrementStep = this.incrementStep.bind(this);
        this.defineNextButtonClass = this.defineNextButtonClass.bind(this);
        this.defineClickHandler = this.defineClickHandler.bind(this);
        this.definePrevButtonClass = this.definePrevButtonClass.bind(this);
        this.completeSurvey = this.completeSurvey.bind(this);
    }

    decrementStep () {
        if (this.props.activeStep > 1)
            this.props.decrementActiveId();
    }
    incrementStep () {
        if (this.props.isTransitionAllowed)
            this.props.incrementActiveId();
    }
    defineNextButtonClass () {
        if (this.props.activeStep === this.props.stepsNumber) return 'final';
        if (!this.props.isTransitionAllowed) return 'inactive';
        return 'active';
    }
    definePrevButtonClass () {
        if (this.props.activeStep === 1) return 'inactive';
        return 'active';
    }
    defineClickHandler () {
        return this.props.activeStep === this.props.stepsNumber
            ? this.completeSurvey
            : this.incrementStep;
    }
    completeSurvey () {
        if (this.props.isTransitionAllowed) this.props.showFinal();
    }
    
    render() {
        return <div className="navbar">
            <NavButton onClick={this.decrementStep}
                    classModifier={this.definePrevButtonClass()}>
                <div>
                    <span className="navbutton__link">&lt;</span>
                    <span className="navbutton__text">Предыдущий</span>
                </div>
            </NavButton>
            
            <NavButton onClick={this.defineClickHandler()}
                    classModifier={this.defineNextButtonClass()}>
                            {this.props.activeStep === this.props.stepsNumber ?
                                <span className="navbutton__text">Завершить</span> :
                                <div>
                                    <span className="navbutton__text">Следующий</span>
                                    <span className="navbutton__link">&gt;</span>
                                </div>
                            }
            </NavButton>
                
        </div>
    }
}

const mapStateToProps = (state) => ({
    activeStep: state.topBar.activeElementId,
    stepsNumber: state.topBar.stepsNumber,
    isTransitionAllowed: state.transitionInfo.isTransitionAllowed
});

const mapDispatchToProps = (dispatch) => ({
    incrementActiveId: () => dispatch(incrementActiveId()), 
    decrementActiveId: () => dispatch(decrementActiveId()),
    showFinal: () => dispatch(showFinal())
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);