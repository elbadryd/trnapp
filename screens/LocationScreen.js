import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    Platform,
    StatusBar,
    Button,
} from "react-native";
import { Permissions, Location } from 'expo';

class Loc extends Component {
    state = {
        location: null,
        errorMessage: null,
    }
    componentWillMount() {
        this.startHeaderHeight = 80
        if (Platform.OS == 'android') {
            this.startHeaderHeight = 100 + StatusBar.currentHeight
        }
    }

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
          this.setState({
            errorMessage: 'Permission to access location was denied',
          });
        }
    
        let location = await Location.getCurrentPositionAsync({});
        this.setState({ location });
      };

    render() {
        return (
                <View style={styles.container}>
                    <Button title="Get Location" onPress={this._getLocationAsync}/>
                    {this.state.location ? <Text> lng : {this.state.location.coords.longitude} , lat:  {this.state.location.coords.longitude} </Text> : <Text> no location </Text> }
                </View>
        );
    }
}
export default Loc;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});