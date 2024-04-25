'use client';

import { ListDetailClassInfo } from '@/types/class';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import noImage from '../../assets/images/clroom_no_img_purple.png';
import { NextButton, PrevButton, usePrevNextButtons } from './EmblaCarouselArrowButtons';
import { DotButton, useDotButton } from './EmblaCarouselDotButton';
import style from './embla.module.css';
import { useEffect } from 'react';
// import style from './embla.module.css';

const ClassImageCarousel = ({ classData }: { classData: ListDetailClassInfo | null }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' }, [Autoplay({ delay: 5000 })]);
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);

  // 로딩 후 emblaApi 초기화
  useEffect(() => {
    if (emblaApi && classData?.image.length !== 0) {
      emblaApi.reInit();
    }
  }, [emblaApi, classData?.image]);
  console.log(style, 'console.log(style);');
  return (
    <div className="h-[300px] sm:h-[500px] lg:h-auto lg:w-[40%] lg:min-w-[400px]">
      <section className={`${style.embla}`}>
        <div className={`${style.embla__viewport} rounded-2xl`} ref={emblaRef}>
          <div className={style.embla__container}>
            {classData && classData.image.length !== 0 ? (
              classData?.image.map((image) => (
                <div className={style.embla__slide} key={image}>
                  <div className={style.embla__slide__inner}>
                    <Image
                      fill={true}
                      className=" h-full w-full rounded-md object-cover"
                      src={image}
                      alt={classData.title}
                    />
                  </div>
                </div>
              ))
            ) : (
              <div className="relative h-full w-full">
                <Image fill className=" h-full w-full rounded-md object-cover" src={noImage} alt="clroom no Image" />
              </div>
            )}
          </div>
          <div className={style.embla__controls}>
            <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
            <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
          </div>

          <div className={style.embla__dots}>
            {scrollSnaps.map((_, index) => (
              <DotButton
                key={index}
                onClick={() => onDotButtonClick(index)}
                className={`${style.embla__dot} ${index === selectedIndex ? style.embla__dotSelected : ''}`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ClassImageCarousel;
