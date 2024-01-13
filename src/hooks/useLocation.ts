import {useEffect, useRef, useState} from 'react';
import GetLocation, {
  Location,
  LocationErrorCode,
  isLocationError,
} from 'react-native-get-location';

const STATIC_TIMEOUT = 120000;

export const useLocation = (id: string) => {
  const [error, setError] = useState<LocationErrorCode | null>(null);

  const latestLoc = useRef<Location | null>(null);
  const location = useRef<Location | null>(null);

  console.log({location});

  GetLocation.getCurrentPosition({
    enableHighAccuracy: true,
    timeout: 30000,
    rationale: {
      title: 'Location permission',
      message: 'The app needs the permission to request your location.',
      buttonPositive: 'Ok',
    },
  })
    .then(newLocation => {
      console.log('new', newLocation);
      location.current = newLocation;
      latestLoc.current === null && (latestLoc.current = newLocation);
    })
    .catch(ex => {
      if (isLocationError(ex)) {
        const {code, message} = ex;
        console.warn(code, message);
        setError(code);
      } else {
        console.warn(ex);
      }
      location.current = null;
    });

  useEffect(() => {
    if (location !== null) {
      latestLoc.current = location.current;
    }
  }, [location.current]);

  const pushLocation = async () => {};

  useEffect(() => {
    const intervalId = setInterval(() => {
      pushLocation();
    }, STATIC_TIMEOUT);

    return () => {
      clearInterval(intervalId);
    };
  }, [useState]);
};
