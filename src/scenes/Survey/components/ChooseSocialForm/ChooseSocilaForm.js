import React, {Component} from 'react';
import {connect} from 'react-redux';
import CommonForm from '../CommonForm/CommonForm';
import FormInput from '../../../../components/Input/FormInput/FormInput';
import withValidation from '../../../../components/Input/withValiddation';
import { removeSocial } from '../../surveyActions';
import './chooseSocialForm.css';

export const socialNetworks = {
    fb: 'Facebook',
    vk: 'Вконтакте',
    tw: 'Twitter',
    ok: 'Одноклассники'
};

class ChooseSocialForm extends Component {
    constructor (props) {
        super(props);
        this.state = {
            checked: Object.keys(this.props.socials),
        };
        this.handleCheck = this.handleCheck.bind(this);
        this.checkIfSavedInStore = this.checkIfSavedInStore.bind(this);
        this.SocialFormInput = withValidation(FormInput);
    }

    handleCheck ({target}) {
        const name = target.getAttribute('data-name');
        const checked = Object.keys(this.props.socials);
        const elementIndex = checked.indexOf(name);
        if (target.checked)
            this.setState({checked: [...checked, name]});
        else {
            this.setState({checked: [...checked.slice(0, elementIndex), 
                                    ...checked.slice(elementIndex + 1)]});
            this.props.removeSocial({name});
        }
    }

    defineFieldNames () {
        return Object.keys(this.props.socials).map(name => ['socials', name]);
    }

    checkIfSavedInStore (abbreviation) {
        return Object.keys(this.props.socials).includes(abbreviation);
    }

    render () {
        const SocialFormInput = this.SocialFormInput;
        return <CommonForm fieldNames={this.defineFieldNames()}>
                    <div className="choose-social-form">
                    {Object.keys(socialNetworks)
                        .map(abbreviation => (<div 
                            key={abbreviation}
                            className="choose-social-form__row">
                            <div className="checkbox-block">
                                <input 
                                    type="checkbox" 
                                    checked={this.state.checked.includes(abbreviation)}
                                    id={`${abbreviation}-check`} 
                                    className="checkbox-block__checkbox"
                                    data-name={`${abbreviation}`}
                                    onChange={this.handleCheck}/>
                                <label htmlFor={`${abbreviation}-check`} className="checkbox-block__label">
                                    {socialNetworks[abbreviation]}
                                </label>
                            </div>
                            {
                                (this.state.checked.includes(abbreviation)) &&
                                <SocialFormInput 
                                    placeholder={`Ваша страница в ${socialNetworks[abbreviation]}`}
                                    type={['socials', abbreviation]} />
                            }
                        </div>))
                    }
                    </div>
            </CommonForm>
    }
}

const mapStateToProps = state => ({
    socials: state.userInfo.socials
});

const mapDispatchToProps = dispatch => ({
    removeSocial: (payload) => dispatch(removeSocial(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChooseSocialForm);