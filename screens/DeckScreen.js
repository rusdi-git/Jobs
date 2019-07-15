import React, {Component} from 'react';
import {View, Text,Platform} from 'react-native';
import {connect} from 'react-redux';
import {MapView} from 'expo';
import {Card,Button,Icon} from 'react-native-elements';
import Swipe from '../components/Swipe';
import * as actions from '../actions';

class DeckScreen extends Component {
    static navigationOptions = {
        title:'Jobs',
        tabBarIcon:({tintColor})=>{
            return <Icon name="description" size={20} color={tintColor}/>
        }
    }

    renderCard(job) {
        const initialRegion={
            longitude:job.longitude,
            latitude:job.latitude,
            latitudeDelta:0.045,
            longitudeDelta:0.02,
        }
        return (
            <Card title={job.jobtitle}>
                <View style={{height:300}}>
                    <MapView
                        scrollEnabled={false}
                        style={{flex:1}}
                        cacheEnable={Platform.OS==='android'}
                        initialRegion={initialRegion}
                    >
                    </MapView>
                </View>
                <View style={styles.detailWrapper}>
                    <Text>{job.company}</Text>
                    <Text>{job.formattedRelativeTime}</Text>
                </View>
                <Text>{job.snippet.replace(/<b>/g,'').replace(/<\/b/g,'')}</Text>
            </Card>
        )
    }

    renderNoMoreCards = ()=>{
        return (
            <Card title="No more jobs">
                <Button
                    title="Back to Map"
                    large
                    icon={{name:'my-location'}}
                    backgroundColor='#03A9F4'
                    onPress={()=>{this.props.navigation.navigate('Map')}}
                />
            </Card>
        )
    }

    render() {
        console.log('---- test_1 ----');
        console.log(this.props.jobs);
        return (
            <View style={{marginTop:10}}>
                <Swipe
                    data={this.props.jobs}
                    renderCard={this.renderCard}
                    renderNoMoreCards={this.renderNoMoreCards}
                    keyProp="jobKey"
                    onSwipeRight={job=>this.props.likeJob(job)}
                />
            </View>
        )
    }
}


const styles = {
    detailWrapper:{
        flexDirection:'row',
        justifyContent:'space-around',
        marginBottom:10,
    }   
}

function mapStateToProps({jobs}){
    console.log('--- text 4 mapStateToProps ----');
    console.log(jobs.results);
    return {jobs:jobs.results};
}

export default connect(mapStateToProps,actions)(DeckScreen);