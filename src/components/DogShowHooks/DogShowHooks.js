/* eslint react/no-array-index-key: 0 */

import React, { useCallback, useEffect, useState } from 'react';

const DogShowHooks = ({ numberOfImages }) => {
  // useState returns an array where the first element is the value and the second is a function
  // that updates the value
  const [dogBreed, setDogBreed] = useState('poodle');
  const [chosenBreed, setChosenBreed] = useState('poodle');
  const [timeoutId, setTimeoutId] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [error, setError] = useState(null);

  const onChange = useCallback((event) => {
    clearTimeout(timeoutId);

    const userInput = event.target.value;

    setDogBreed(userInput);

    const newTimeoutId = setTimeout(() => setChosenBreed(userInput), 1000);
    setTimeoutId(newTimeoutId);
  }, [timeoutId]);

  const fetchImage = useCallback(async (breed) => {
    const url = `https://dog.ceo/api/breed/${breed}/images`;

    const result = await fetch(url);
    const data = await result.json();

    if (data.status === 'error') {
      setError(data.message);
      setImageUrls(null);
      return;
    }

    const images = data.message.slice(0, numberOfImages);
    setImageUrls(images);
    setError(null);
  }, [numberOfImages]);

  // The function (first argument) will run every time one of the elements
  // in the array (second argument) changes
  useEffect(() => {
    fetchImage(chosenBreed);
  }, [chosenBreed, fetchImage]);

  return (
    <>
      <h1>Dog show</h1>
      <br />
      <input value={dogBreed} onChange={onChange} />
      <br />
      <br />
      <h2>
        Chosen breed:
        {' '}
        {chosenBreed}
      </h2>
      <br />
      <br />
      {Boolean(imageUrls) && imageUrls.map((url, idx) => <img key={`dog-image-${idx}`} src={url} alt="dog" />)}
      {Boolean(error) && <span>{error}</span>}
    </>
  );
};

export default DogShowHooks;
