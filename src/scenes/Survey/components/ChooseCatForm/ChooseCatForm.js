import React, {Component} from 'react';
import {connect} from 'react-redux';
import CommonForm from '../CommonForm/CommonForm';
import { updateValue } from '../../surveyActions';
import './chooseCatForm.css'

const fileNames = ['cat1', 'cat2', 'cat3', 'dog4'];

class ChooseCatForm extends Component {
    constructor () {
        super();
        this.state = {
            chosenPhotoName: '',
            errorMessage: ''
        }
        this.defineClass = this.defineClass.bind(this);
    }
    handleClick (name) {
        const errorMessage = ~name.indexOf('dog') ?
        'Вы выбрали собачку. А надо котика.' :
        '';
        this.setState({
            chosenPhotoName: name,
            errorMessage
        });
        this.props.updateValue({
            inputType: 'catPhotoName',
            value: name,
            isValid: !errorMessage.length
        })
    }

    defineClass (currentPhotoName, className) {
        return this.state.chosenPhotoName === currentPhotoName ?
        `${className} ${className}--active`:
        className
    }

    render () {
    return <CommonForm fieldNames={["catPhotoName"]}>
            <div className="cats-images">
                    {fileNames.map(name => <img src={`../../../../assets/images/${name}.jpg`}
                                            key={name}
                                            onClick={() => this.handleClick(name)}
                                            className={this.defineClass(name, 'cats-images__item')}
                                            alt={name}
                    />)}
                {this.state.errorMessage.length > 0 ? <p className="cats-images__error">{this.state.errorMessage}</p> : null}             
            </div>
            
    </CommonForm>
    }
}

const mapDispatchToProps = dispatch => ({
    updateValue: (payload) => dispatch(updateValue(payload))
});

export default connect(null, mapDispatchToProps)(ChooseCatForm);