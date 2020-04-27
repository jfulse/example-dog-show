import { useCallback, useState } from 'react';

const useDogBreed = () => {
  const [dogBreed, setDogBreed] = useState('poodle');
  const [chosenBreed, setChosenBreed] = useState('poodle');
  const [timeoutId, setTimeoutId] = useState(null);

  const onChange = useCallback((event) => {
    clearTimeout(timeoutId);

    const userInput = event.target.value;

    setDogBreed(userInput);

    const newTimeoutId = setTimeout(() => setChosenBreed(userInput), 1000);
    setTimeoutId(newTimeoutId);
  }, [timeoutId]);

  return { dogBreed, chosenBreed, onChange };
};

export default useDogBreed;
