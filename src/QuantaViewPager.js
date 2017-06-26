import React, { PureComponent } from 'react'; 
import { 
    View, 
    Dimensions 
} from 'react-native'; 
 
export default class QuantaViewPager extends PureComponent { 
 
    state = { 
        width: Dimensions.get('window').width, 
    } 
 
    constructor(props) { 
        super(props); 
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this)); 
        this.x = 0.5; 
    } 
 
    onNavigatorEvent(event) { 
        switch (event.id) { 
            case 'willAppear': 
                this.rerender(); 
                break; 
            case 'didAppear': 
                this.props.parentCallback && this.props.parentCallback(event); 
                break; 
        } 
    } 
 
    render() { 
        return ( 
            <View style={[this.props.style, {flex: 1}]}> 
                <View style={{width: this.state.width, flex: 1}}> 
                    {this.props.children} 
                </View> 
            </View> 
        ) 
    } 
 
    rerender = () => { 
        this.setState({ 
            width: this.state.width - this.x, 
        }, () => { 
            this.x *= -1; 
        }); 
    } 
}