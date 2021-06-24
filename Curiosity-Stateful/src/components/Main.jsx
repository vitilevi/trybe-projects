import React, { Component } from 'react';
import Pics from './Pics';
import '../pictures.css'

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      obj: [],
      currIndex: 0,
      maxIndex: 0,
      loading: false,
      date: '',
      passedObj: [],
      select: '',
    };
    this.fetchApi = this.fetchApi.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.filteredObj = this.filteredObj.bind(this);
  }

  fetchApi() {
    this.setState({
      loading: true,
    }, 
    () => {
      const { date } = this.state;
      const param = { headers: { Accept: 'application/JSON' } };
      fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?api_key=NnJicGrQEhHWGLinti8LBiskc6h8x923wq05HwFM&earth_date=${date}`, param)
      .then((response) => response.json())
      .then((result) => this.setState({
        obj: result.photos,
        maxIndex: result.photos.length - 1,
        passedObj: result.photos.splice(0, 15),
        loading: false,
        currIndex: 15,
      }))
      .catch((error) => console.log(error));
    });
  }

  getCameraName() {
    const { obj } = this.state;
    // const { camera } = obj;
    // const { full_name } = camera;
    console.log(obj);
  }

  handleChange({ target }) {
    const { value } = target;
    this.setState({ select: value })
    this.filteredObj(value);
  }

  handleDate({ target }) {
    const { value } = target;
    this.setState({
      date: value,
    });
    this.fetchApi();
    // this.getCameraName();
  }

  loadMoreImages() {
    // this.setState((state) => {
    //   passedObj: [...state.passedObj, state.obj]
    // })
  }

  filteredObj(value) {
    const { obj } = this.state;
    if(value === '') {
      this.setState({
        passedObj: obj,
      })
    } else {
      const result = obj.filter(({ camera }) => camera.name === value);
      console.log(result);
      this.setState({
        passedObj: result,
      });
    };
  }

  render() {
    const { obj, passedObj, currIndex, maxIndex, loading } = this.state;
    const btn = <button onClick={ this.loadMoreImages }>Carregar mais...</button>
    return (
      <div className="render">
        <div className="date-input">
          <label htmlFor="">Insira uma data:
            <input name="date" type="date" onChange={ this.handleDate }/>
          </label>
        </div>

        <div className="filters">
          <span>Filter Cameras: </span>
          <select name="cameras" onChange={ this.handleChange }>
            <option value="">All</option>
            <option value="FHAZ">FHAZ</option>
            <option value="RHAZ">RHAZ</option>
            <option value="CHEMCAM">CHEMCAM</option>
            <option value="MAST">MAST</option>
            <option value="MAHLI">MAHLI</option>
            <option value="NAVCAM">NAVMAC</option>
          </select>
        </div>

        <div className="subtitles">
          { obj.length > 0? 
          <span className="camera-name">FHAZ - Front Hazard Avoidance Camera, RHAZ - Rear Hazard Avoidance Camera, MAST - Mast Cam, NAVCAM - Navigation Camera, CHEMCAM - Chemistry and Camera Complex, MAHLI - Mars Hand Lens Imager</span> 
          : null}
        </div>

        <div className="pictures-wrapper">
          { loading? <span><h1>loading...</h1></span> : null }
          <Pics obj={ passedObj } />
        </div>

        <div>
          { obj.length > 0? <span>{ currIndex } of { maxIndex }</span> : null }
          { obj.length > 0? btn : null }
        </div>
      </div>
    );
  }
}
