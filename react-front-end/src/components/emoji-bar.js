import React, {Component} from 'react';
import EmojiPicker from 'emoji-picker-react';
 
class MyComponent extends Component {
 
    render() {
        return (
            <EmojiPicker onEmojiClick={2}/>
        );
    }
}

export default MyComponent