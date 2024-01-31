import {useEffect, useState} from 'react';

export const useDateTimer = () => {
  const date = new Date();
  const begin = new Date('2023-08-07T00:00:00Z');
  const [time, setTime] = useState(date.getTime() - begin.getTime());

  useEffect(() => {
    var timer = setInterval(() => tick(), 1000);
    return () => clearInterval(timer);

    function tick() {
      setTime(time + 1000);
    }
  });

  let month = Math.floor(time / (1000 * 60 * 60 * 24 * 30));
  let day = Math.floor(
    (time % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24),
  );
  let hour = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minute = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
  let second = Math.floor((time % (60 * 1000)) / 1000);

  return {time, month, day, hour, minute, second};
};
