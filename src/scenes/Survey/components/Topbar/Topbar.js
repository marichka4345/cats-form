import React from 'react';
import { connect } from 'react-redux';
import './topbar.css';

const headerTitleMap = [
    "Введите имя и e-mail",
    "Выберите страну и город",
    "Отметьте социальные сети",
    "Выберите любимого котика"
];

function Topbar ({stepsNumber, activeStep}) {
    const defineClass = (itemId) => {
        if (itemId < activeStep) return 'passed';
        if (itemId === activeStep) return 'active';
        if (itemId > activeStep) return 'inactive';
    }
    const generateList = (elementsNumber) => {
        return Array.from(
            Array(elementsNumber).keys(),
            item => <li key={item + 1} 
                        className={`topbar__item topbar__item--${defineClass(item + 1)}`}>
                            {item + 1}
                    </li>);
    }

    return <header className="survey-header">
        <ul className="topbar">
            {generateList(stepsNumber)}
        </ul>
        <p className="survey-header__title">
           {activeStep}.{headerTitleMap[activeStep  - 1]}
        </p>
    </header>

}

const mapStateToProps = (state) => ({
    activeStep: state.topBar.activeElementId,
    stepsNumber: state.topBar.stepsNumber
});

export default connect(mapStateToProps)(Topbar);