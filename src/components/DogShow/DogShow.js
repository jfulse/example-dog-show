import React, { Component } from 'react';

class DogShow extends Component {
  constructor() {
    super();

    this.state = {
      dogBreed: 'poodle', chosenBreed: 'poodle', timeoutId: null, imageUrls: null, error: null,
    };
    this.onChange = this.onChange.bind(this);
    this.fetchImage = this.fetchImage.bind(this);
  }

  componentDidMount() {
    const { chosenBreed } = this.state;
    this.fetchImage(chosenBreed);
  }

  componentDidUpdate(prevProps, prevState) {
    const { chosenBreed } = this.state;

    if (prevState.chosenBreed !== chosenBreed) this.fetchImage(chosenBreed);
  }

  onChange(event) {
    const { timeoutId } = this.state;

    clearTimeout(timeoutId);

    const userInput = event.target.value;

    this.setState({ dogBreed: userInput });

    const newTimeoutId = setTimeout(() => this.setState({ chosenBreed: userInput }), 1000);
    this.setState({ timeoutId: newTimeoutId });
  }

  async fetchImage(breed) {
    const { numberOfImages } = this.props;
    const url = `https://dog.ceo/api/breed/${breed}/images`;

    const result = await fetch(url);
    const data = await result.json();

    if (data.status === 'error') {
      this.setState({ error: data.message, imageUrls: null });
      return;
    }

    const images = data.message.slice(0, numberOfImages);
    this.setState({ imageUrls: images, error: null });
  }

  render() {
    const {
      dogBreed, chosenBreed, imageUrls, error,
    } = this.state;

    return (
      <>
        <h1>Dog show</h1>
        <br />
        <input value={dogBreed} onChange={this.onChange} />
        <br />
        <br />
        <h2>
          Chosen breed:
          {' '}
          {chosenBreed}
        </h2>
        <br />
        <br />
        {Boolean(imageUrls) && imageUrls.map((url) => <img src={url} alt="dog" />)}
        {Boolean(error) && <span>{error}</span>}
      </>
    );
  }
}

export default DogShow;
