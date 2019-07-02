import React, {Component} from 'react';


class Cam extends Component {
  componentDidMount(){}
 
  render() {

      return (
        <div class="container-fluid">
        <div class="row h-10 w-100">
            <div class="col">
                <select id="filter" class="w-100 bg-dark text-light ml-2 mt-2 select font-weight-bold border">
                    <option value="none">Normal</option>
                    <option value="grayscale(100%)">B & W</option>
                    <option value="sepia(100%)">Old School</option>
                    <option value="contrast(150%)">Lumination</option>
                    <option value="blur(20px)">Hidden Mist</option>
                    <option value="invert(100%)">Dracula</option>
                    <option value="hue-rotate(180deg">X-men Beast</option>
                    <option value="saturate(25)">Super Saiyan God</option>
                </select>
            </div>
            <div class="col">
                <div class="float-right mt-3">
                    <input class="form-check-input" type="checkbox" id="theme"></input>
                    <label class="form-check-label" for="theme">
                        Dark Theme
                    </label>
                </div>
            </div>
        </div>
        <div class="row h-50 w-50">
            <div class="col-12 col-sm-6 d-flex justify-content-center">
                <div class="embed-responsive embed-responsive-16by9">
                    <video class="embed-responsive-item" muted></video>
                </div>
            </div>
            <div class="col-12 col-sm-6 d-flex justify-content-center">
                <div id="peerDiv" class="embed-responsive embed-responsive-16by9">
                </div>
            </div>
        </div>
    </div>
      );
  }
}

export default Cam