/* eslint react/no-array-index-key: 0 */

import React from 'react';

import useDogBreed from '../../hooks/useDogBreed';
import useImage from '../../hooks/useImage';

const DogShowHooks2 = ({ numberOfImages }) => {
  const { dogBreed, chosenBreed, onChange } = useDogBreed();
  const { imageUrls, error } = useImage({ numberOfImages, chosenBreed });

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

export default DogShowHooks2;
