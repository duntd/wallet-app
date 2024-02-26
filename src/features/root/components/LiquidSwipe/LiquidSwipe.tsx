import React, {useState} from 'react';

import {Home} from 'features/root/screens/Home';
import {Manage} from 'features/root/screens/Manage';
import {Note} from 'features/root/screens/Note';
import Slider from './Slider';

const scenes = [
  {key: 'note', screen: <Note />},
  {key: 'home', screen: <Home />},
  {key: 'manage', screen: <Manage />},
];

// export const assets = slides.map(({picture}) => picture);

const LiquidSwipe = () => {
  const [index, setIndex] = useState(1);
  const prev = scenes[index - 1];
  const next = scenes[index + 1];
  return (
    <Slider
      key={index}
      index={index}
      setIndex={setIndex}
      prev={prev && prev.screen}
      next={next && next.screen}>
      {scenes[index].screen}
    </Slider>
  );
};

export default LiquidSwipe;
