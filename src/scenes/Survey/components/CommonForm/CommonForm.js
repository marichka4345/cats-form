import React, {Component} from 'react';
import { connect } from 'react-redux';
import { enableTransition, disableTransition } from './transitionInfoActions';
import './commonForm.css';


export const getObjectPropertyValue = (name, searchObj) => {
            return Array.isArray(name) ?
            name.reduce((res, item) => res[item], searchObj) :
            searchObj[name]
        };

class CommonForm extends Component {
    constructor (props) {
        super(props);
        this.checkFieldsValidity(this.props);
    }

    componentWillReceiveProps (nextProps) {
        this.checkFieldsValidity(nextProps);
    }

    checkFieldsValidity (props) {
        const {fieldNames, userInfo, 
            enableTransition, disableTransition} = props;

        const fieldsAreValid = fieldNames.length ?
                fieldNames
                        .map(name =>  getObjectPropertyValue(name, userInfo) ? 
                        getObjectPropertyValue(name, userInfo).isValid :
                        false)
                        .every(isValid => isValid) :
                false;                   
        if (fieldsAreValid)
            enableTransition();
        else disableTransition();
    }

    render () {
        return <div className="survey-form">
            {this.props.children}
        </div>
    }
}

const mapStateToProps = (state) => ({
    userInfo: state.userInfo
});

const mapDispatchToProps = (dispatch) => ({
    enableTransition: () => dispatch(enableTransition()),
    disableTransition: () => dispatch(disableTransition())
});

export default connect(mapStateToProps, mapDispatchToProps)(CommonForm)