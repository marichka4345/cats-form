import React, {Component} from 'react';
import {getObjectPropertyValue} from '../../../scenes/Survey/components/CommonForm/CommonForm';
import {connect} from 'react-redux';
import './formInput.css';

class FormInput extends Component {
    constructor (props) {
        super(props);
        this.state = {
            value: (getObjectPropertyValue(this.props.type, this.props.userInfo) || {}).value || ''
        };
        this.changeValue = this.changeValue.bind(this);
    }

    changeValue ({target}) {
        this.setState({value: target.value})
    }

    render () {
        const {placeholder, errorMessage,
            addValidationClass, validate} = this.props;
        return <div className="form-input-row">
                    <input 
                        value={this.state.value}
                        onChange={this.changeValue}
                        onBlur={validate}
                        type="text" 
                        placeholder={placeholder}
                        className={addValidationClass('form-input')} />
                    {errorMessage.length > 0 && 
                    <span className="form-input-row__error"> &ndash; {errorMessage}</span>}               
                </div>
    }
}

const mapStateToProps = state => ({
    userInfo: state.userInfo
});

export default connect(mapStateToProps)(FormInput);

