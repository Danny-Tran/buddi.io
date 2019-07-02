import React, {Component} from 'react';
import EmojiPicker from 'emoji-picker-react';
import JSEMOJI from 'emoji-js';

// new instance
const jsemoji = new JSEMOJI();
// set the style to emojione (default - apple)
jsemoji.img_set = 'emojione';
// set the storage location for all emojis
jsemoji.img_sets.emojione.path = 'https://cdn.jsdelivr.net/gh/iamcal/emoji-data@19299c91bc87374118f06b2760f1ced69d714ab1/img-emojione-64/';


// some more settings...
jsemoji.supports_css = false;
jsemoji.allow_native = false;
jsemoji.replace_mode = 'unified';

const displayEmojiInMessanger = (code, data) => {

}
 
class MyComponent extends Component {
 
    render() {
        return (
            <EmojiPicker onEmojiClick={2} emojiResolution="64"/>
        );
    }
}

export default MyComponent