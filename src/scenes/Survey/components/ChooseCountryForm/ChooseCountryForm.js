import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import CommonForm from '../CommonForm/CommonForm';
import withValidation from '../../../../components/Input/withValiddation';
import FormSelect from '../../../../components/Input/FormSelect/FormSelect';
import '../../../../components/Input/FormInput/formInput.css';
import './chooseCountryForm.css';

class ChooseCountryForm extends Component {
    constructor () {
        super();
        this.state = {
            countries: [],
            cities: [],
            selectValue: 0
        }
        this.CountrySelect = withValidation(FormSelect);
        this.CitySelect = withValidation(FormSelect);
        this.getCountries();
        this.getCities();
        this.getCountryCities = this.getCountryCities.bind(this);
    }


    getCountries () {
        axios.get('../assets/json/countries.json')
        .then(response => this.setState({countries: Object.entries(response.data)}));
    }

    getCities () {
        axios.get('../assets/json/cities.json')
            .then(response => this.setState({cities: response.data}));
    }

    getCountryCities () {      
        const {cities} = this.state;
        const countryId = +this.findCountryId(this.props.country.value);

        const countryCities = Object.entries(cities)
                .filter(city => city[1].country === countryId)
                .map(countryCity => [
                    countryCity[0], 
                    countryCity[1].name
                    ]);
        return countryCities;
    }

    findCountryId (countryName) {
        const {countries} = this.state;
        const elementIndex = countries
            .findIndex(element => element[1] === countryName);
        return (~elementIndex) ? countries[elementIndex][0] : 0 ;
    }

    render () {
        const CountrySelect = this.CountrySelect,
            CitySelect = this.CitySelect;
        
        return <CommonForm fieldNames={["country", "city"]}>
            <CountrySelect 
                    type="country" 
                    placeholder="Страна" 
                    dataSource={this.state.countries}
                    dependent="city" />
            <CitySelect 
                    type="city" 
                    placeholder="Город" 
                    dataSource={this.getCountryCities()} />
        </CommonForm>
    }
}

const mapStateToProps = state => ({
    country: state.userInfo.country
});
export default connect(mapStateToProps)(ChooseCountryForm);