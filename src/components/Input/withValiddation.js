import React, {Component} from 'react';
import {connect} from 'react-redux';
import validator from 'validator';
import { updateValue } from '../../scenes/Survey/surveyActions';

const validateRules = {
    email: {
        test: value => validator.isEmail(value), 
        message: 'Введите корректный e-mail'
    },
    name: {
        test: value => validator.matches(value, /^[А-ЯЁ][а-яё]+(-[А-ЯЁ][а-яё]+)*\s[А-ЯЁ][а-яё]+$/),
        message: 'Введите корректное имя в формате: Имя Фамилия'
    },
    country: {
        test: value => value.length > 0,
        message: 'Выберите страну'
    },
    city: {
        test: value => value.length > 0,
        message: 'Выберите город'
    },
    socials: {
        test: value => validator.isURL(value),
        message: 'Введите правильную ссылку на социальную сеть'
    }
};

export default function withValidation (InputComponent) {
    class ValidatedInput extends Component {
        constructor () {
            super();
            this.state = {
                errorMessage: ''
            };           
            this.validateInput = this.validateInput.bind(this);
            this.addValidationClass = this.addValidationClass.bind(this);
        }   

        getObjectPropertyValue (propName, object) {
            return Array.isArray(propName) ?
            object[propName[0]] :
            object[propName];
        }     

        validateInput ({target}) {
            const {type: inputType, dependent} = this.props;
            const inputValue = target.value.trim(); 
            const validateRulesPropertyValue = this.getObjectPropertyValue(inputType, validateRules);

            if (dependent) {
                this.props.updateValue({inputType: dependent, value: '', isValid: false});
            }
            if(!validateRulesPropertyValue.test(inputValue)) {
                this.setState({
                    errorMessage: validateRulesPropertyValue.message
                });
                this.props.updateValue({inputType, value: '', isValid: false});
            }
            else {
                this.setState({
                    errorMessage: ''
                });
                this.props.updateValue({inputType, value: inputValue, isValid: true});
            }
        }

        addValidationClass (className) {
            return this.state.errorMessage.length ?
                `${className} ${className}--invalid` :
                className;
        }

        render () {         
            const {errorMessage} = this.state;
            return <InputComponent 
                        errorMessage={errorMessage}
                        validate={this.validateInput}
                        addValidationClass={this.addValidationClass}
                        {...this.props} />;
        }
    }

     const mapDispatchToProps = dispatch =>({
        updateValue: (payload) => dispatch(updateValue(payload))
    });

    const mapStateToProps = state => ({
        userInfo: state.userInfo
    });

    return connect(mapStateToProps, mapDispatchToProps)(ValidatedInput);
}