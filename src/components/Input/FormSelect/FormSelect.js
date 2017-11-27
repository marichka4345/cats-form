import React from 'react';
import {connect} from 'react-redux';
import './formSelect.css';

function FormSelect (props) {
    const {placeholder, errorMessage, dataSource, validate, addValidationClass} = props;
    return <div className="form-input-row">
                <select 
                    value={props.userInfo[props.type].value}
                    className={`form-input ${addValidationClass('form-select')}`}
                    onChange={validate}>
                    <option value="">{placeholder}</option>
                    {dataSource
                        .map(item => <option 
                                            data-key={item[0]}
                                            value={item[1]}
                                            key={item[0]}>
                        {item[1]}
                    </option>)}
                </select>
                {errorMessage.length > 0 && 
                <span className="form-input-row__error"> &ndash; {errorMessage}</span>}
            </div>
}

const mapStateToProps = state => ({
    userInfo: state.userInfo
});
export default connect(mapStateToProps)(FormSelect);