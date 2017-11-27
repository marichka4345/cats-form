import React, {Component} from 'react';
import CommonForm from '../CommonForm/CommonForm';
import FormInput from '../../../../components/Input/FormInput/FormInput';
import withValidation from '../../../../components/Input/withValiddation';
import './chooseNameForm.css';

export default class ChooseNameForm extends Component {       
        render() {
                const NameFormInput = withValidation(FormInput);
                const EmailFormInput = withValidation(FormInput);
                return <CommonForm fieldNames={["name", "email"]}>
                        <div className="choose-name-form-input">
                                <NameFormInput type="name" placeholder="Имя" />
                        </div>
                        <div className="choose-name-form-input">
                                <EmailFormInput type="email" placeholder="E-mail" />
                        </div>
                        </CommonForm>
        }
}