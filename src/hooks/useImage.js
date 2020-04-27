import { useCallback, useEffect, useState } from 'react';

const useImage = ({ numberOfImages, chosenBreed }) => {
  const [imageUrls, setImageUrls] = useState([]);
  const [error, setError] = useState(null);

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

  return { imageUrls, error };
};

export default useImage;
