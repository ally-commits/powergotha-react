import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import styles from './searchaddress.module.css' ;
 
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText'; 
import PinDropRoundedIcon from '@material-ui/icons/PinDropRounded';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton'

const searchOptions = { 
  types: ['address'],
  componentRestrictions: {country: "in"}
}

class SearchAddress extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: '' };
  } 
  handleChange = address => {
    this.props.setFormData("address",address) 
  };
 
  handleSelect = address => { 
    this.props.setFormData("address",address) 
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) => { 
        this.props.setFormData("coordinates",[lat,lng]); 
      })
      .catch(err => {
        console.log(err);
      });
  };
 
  render() {
    return (
      <PlacesAutocomplete
        value={this.props.formData.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        searchOptions={searchOptions}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Search Place or Area',
                className: styles.searchInput,
              })}
            />
            <div className={styles.autoComplete}>
              {loading && 
                <div className={styles.loader}>
                  <CircularProgress size={30} />
                </div>
              }

              {suggestions.map(suggestion => {  
                return ( 
                  <ListItem button onClick={() => console.log(suggestion)} {...getSuggestionItemProps(suggestion)} className={styles.listItem}>
                    <IconButton>
                      <PinDropRoundedIcon style={{color: "#333"}} />
                    </IconButton>
                    <ListItemText primary={suggestion.formattedSuggestion.mainText} secondary={suggestion.description} />
                  </ListItem>  
                );
              })} 
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

export default SearchAddress;