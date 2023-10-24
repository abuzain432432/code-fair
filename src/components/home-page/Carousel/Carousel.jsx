import { useState } from 'react';
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from 'react-icons/md';
import styles from './Carousel.module.css';
import Review1 from '../../../assets/review-1.jpg';
import { Box, Heading } from '@chakra-ui/react';
function Carousel() {
  const [activeSlide, setActiveSlide] = useState(0);
  const max_i = 3;
  const slides = [
    <div
      key={0}
      style={{ transform: `translateX(${(0 - activeSlide) * 100}%)` }}
      className='absolute  rounded-lg flex   duration-200 justify-center items-center  h-[80%]'
    >
      <div className='w-[90%] h-full grid sm:px-16 px:6 grid-cols-3 gap-4 bg-teal-700 rounded-lg mx-auto'>
        <img
          className='w-full h-full md:block hidden scale-110 rounded-lg '
          src={Review1}
          alt='Maria de Almeida'
        />
        <blockquote
          className={`${styles['carousel-item']}  flex flex-col justify-center ml-8 py-4`}
        >
          <p className='text-lg font-medium leading-1.5 mb-8 text-teal-100'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Officia nesciunt aliquid ex atque quibusdam. Rerum officia
            unde suscipit quo sunt hic illo fugit.
          </p>
          <p className='text-sm mb-2 font-bold text-teal-50'>
            Maria de Almeida
          </p>
          <p className='text-xs  text-teal-50'>
            Senior Product Manager at EDP Comercial
          </p>
        </blockquote>
      </div>
    </div>,
    <div
      key={1}
      style={{ transform: `translateX(${(1 - activeSlide) * 100}%)` }}
      className='absolute  rounded-lg flex   duration-200 justify-center items-center  h-[80%]'
    >
      <div className='w-[90%] h-full grid sm:px-16 px:6 grid-cols-3 gap-4 bg-teal-700 rounded-lg mx-auto'>
        <img
          className='w-full h-full md:block hidden scale-110 rounded-lg '
          src={Review1}
          alt='Maria de Almeida'
        />
        <blockquote
          className={`${styles['carousel-item']} flex flex-col justify-center ml-8 py-4`}
        >
          <p className='text-lg font-medium leading-1.5 mb-8 text-teal-100'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Officia nesciunt aliquid ex atque quibusdam. Rerum officia
            unde suscipit quo sunt hic illo fugit.
          </p>
          <p className='text-sm mb-2 font-bold text-teal-50'>
            Maria de Almeida
          </p>
          <p className='text-xs  text-teal-50'>
            Senior Product Manager at EDP Comercial
          </p>
        </blockquote>
      </div>
    </div>,
    <div
      key={2}
      style={{ transform: `translateX(${(2 - activeSlide) * 100}%)` }}
      className='absolute  rounded-lg flex   duration-200 justify-center items-center  h-[80%]'
    >
      <div className='w-[90%] h-full grid sm:px-16 px:6 grid-cols-3 gap-4 bg-teal-700 rounded-lg mx-auto'>
        <img
          className='w-full h-full md:block hidden scale-110 rounded-lg '
          src={Review1}
          alt='Maria de Almeida'
        />
        <blockquote
          className={`${styles['carousel-item']}  flex flex-col justify-center ml-8 py-4`}
        >
          <p className='text-lg font-medium leading-1.5 mb-8 text-teal-100'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Officia nesciunt aliquid ex atque quibusdam. Rerum officia
            unde suscipit quo sunt hic illo fugit.
          </p>
          <p className='text-sm mb-2 font-bold text-teal-50'>
            Maria de Almeida
          </p>
          <p className='text-xs  text-teal-50'>
            Senior Product Manager at EDP Comercial
          </p>
        </blockquote>
      </div>
    </div>,
    <div
      key={3}
      style={{ transform: `translateX(${(3 - activeSlide) * 100}%)` }}
      className='absolute  rounded-lg flex   duration-200 justify-center items-center  h-[80%]'
    >
      <div className='w-[90%] h-full grid sm:px-16 px:6 grid-cols-3 gap-4 bg-teal-700 rounded-lg mx-auto'>
        <img
          className='w-full h-full md:block hidden scale-110 rounded-lg '
          src={Review1}
          alt='Maria de Almeida'
        />
        <blockquote
          className={`${styles['carousel-item']}  flex flex-col justify-center ml-8 py-4`}
        >
          <p className='text-lg font-medium leading-1.5 mb-8 text-teal-100'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Officia nesciunt aliquid ex atque quibusdam. Rerum officia
            unde suscipit quo sunt hic illo fugit.
          </p>
          <p className='text-sm mb-2 font-bold text-teal-50'>
            Maria de Almeida
          </p>
          <p className='text-xs  text-teal-50'>
            Senior Product Manager at EDP Comercial
          </p>
        </blockquote>
      </div>
    </div>,
  ];

  const nextSlide = () => {
    setActiveSlide(activeSlide === max_i ? 0 : activeSlide + 1);
  };

  const prevSlide = () => {
    setActiveSlide(activeSlide === 0 ? max_i : activeSlide - 1);
  };

  return (
    <Box className='mx-auto  max-w-[1400px]' py={'24'}>
      <Heading
        textAlign={'center'}
        size={'2xl'}
        color={'blackAlpha.800'}
      >
        What others are saying
      </Heading>
      <div className='relative  sm:h-[350px] h-[450px] overflow-hidden flex items-center '>
        {slides}
        <button
          onClick={prevSlide}
          className={`${styles['btn--left']} bg-white border-0 h-[40px] w-[40px] rounded-full absolute shadow-md cursor-pointer flex items-center justify-center `}
        >
          <MdOutlineArrowBackIosNew />
        </button>
        <button
          onClick={nextSlide}
          className={`${styles['btn--right']} bg-white border-0 h-[40px] w-[40px] rounded-full absolute shadow-md cursor-pointer flex items-center justify-center `}
        >
          <MdOutlineArrowForwardIos />
        </button>
        <div className={`${styles['dots']}`}>
          <button
            onClick={() => setActiveSlide(0)}
            className={`${activeSlide == 0 && styles['dot--fill']} ${
              styles['dot']
            }`}
          >
            &nbsp;
          </button>
          <button
            onClick={() => setActiveSlide(1)}
            className={`${activeSlide == 1 && styles['dot--fill']} ${
              styles['dot']
            }`}
          >
            &nbsp;
          </button>
          <button
            onClick={() => setActiveSlide(2)}
            className={`${activeSlide == 2 && styles['dot--fill']} ${
              styles['dot']
            }`}
          >
            &nbsp;
          </button>
          <button
            onClick={() => setActiveSlide(3)}
            className={`${activeSlide == 3 && styles['dot--fill']} ${
              styles['dot']
            }`}
          >
            &nbsp;
          </button>
        </div>
      </div>
    </Box>
  );
}

export default Carousel;
