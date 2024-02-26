import {Container} from 'components';
import {Star} from './Star';

const ShootingStar = () => {
  return (
    <>
      <Star delay={1000} top={-500} />
      <Star delay={2000} top={-300} />
      <Star delay={1400} top={-400} />
      <Star delay={4500} top={-100} />
      <Star delay={2800} top={-800} />
      <Star delay={2300} top={-600} />
      <Star delay={3200} top={0} />
      <Star delay={3500} top={-180} />
      <Star delay={4000} top={-350} />
    </>
  );
};

export default ShootingStar;
