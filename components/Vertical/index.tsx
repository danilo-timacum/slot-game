import React, { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { sample, shuffle, times } from 'lodash';
import gsap from 'gsap';

// const resultArray = times(customLength, () => sample(entries));

// console.log(resultArray);
function animateSlide(mySwiper, index, duration) {
	gsap.to(mySwiper.slides[index], {
		duration: duration,
		ease: 'power2.out',
		opacity: 1,
		scale: 1,
	});
}

const tl = gsap.timeline();

const Vertical = forwardRef(function Vertical(
	{
		index,
		choice,
		setChoices,
		verticalsCount,
		entries,
		setSelected,
		setRunning,
	},
	ref
) {
	// const [swiperInstance, setSwiperInstance] = useState(null);
	// const [choice, setChoice] = useState(undefined);
	const swiperLoop = useRef(0);
	const [slides, setSlides] = useState([]);
	// console.log(slides);

	const [lines, setLines] = useState([]);

	// const filteredEntries = useMemo(() => entries.map((entry, index) => {lines[index - 5] ? lines[index - 5] : entry})
	// , [entries, lines])

	useEffect(() => {
		if (choice) {
			const arr = choice.split(',');
			setLines(arr);
		}
	}, [choice]);

	return (
		<>
			<Swiper
				spaceBetween={0}
				grabCursor
				mousewheel
				keyboard
				noSwiping
				allowTouchMove={false}
				direction={'vertical'}
				// noSwiping
				loop
				// effect='fade'
				// fadeEffect={{
				// 	crossFade: true,
				// }}
				centeredSlides={true}
				slidesPerView={3}
				speed={35}
				autoplay={{
					delay: 35,
					disableOnInteraction: false,
				}}
				// pagination={{
				// 	clickable: true,
				// }}
				// virtual
				// enabled={spin}
				// allowSlidePrev={false}
				// navigation={true}
				// Disable default Swiper transition
				// effect='creative'
				// fadeEffect={{ crossFade: true }}
				// modules={[Autoplay, Pagination, Navigation]}
				modules={[Autoplay]}
				className='mySwiper'
				onSwiper={(swiper) => {
					swiper.autoplay.stop();
					// const slidesCount = swiper.slides.length;
					// const randomSlide = Math.floor(Math.random() * (slidesCount - 3));
					// swiper.slideTo(randomSlide);
					ref.current[index] = swiper;
				}}
				// onSlideChange={(swiper) => {
				// 	animateSlide(swiper, swiper.activeIndex, 0.05);
				// }}
				// onTransitionEnd={(swiper) => {
				// 	console.log('active', swiper.activeIndex);
				// 	console.log('real', swiper.realIndex);
				// 	console.log('snap', swiper.snapIndex);
				// 	if (swiper.realIndex === 2) {
				// 		console.log('trans');
				// 		swiper.autoplay.stop();
				// 		// swiper.autoplay.start();
				// 	}
				// }}
				// onSlideChange={(swiper) => {
				// 	console.log('active', swiper.activeIndex);
				// 	console.log('real', swiper.realIndex);
				// 	console.log('snap', swiper.snapIndex);
				// 	if (swiper.realIndex === 2) {
				// 		console.log('trans');
				// 		swiper.autoplay.stop();
				// 		// swiper.autoplay.start();
				// 	}
				// }}
				// freeMode
				// onTransitionStart={(swiper) => {
				// 	gsap.to(swiper.slides[swiper.activeIndex], {
				// 		duration: 0.5,
				// 		ease: 'power2.out', // Add an ease
				// 	});
				// }}
				// onTransitionEnd={(swiper) => {
				// 	gsap.to(swiper.slides[swiper.activeIndex], {
				// 		duration: 0.5,
				// 		ease: 'power2.in', // Add an ease
				// 	});
				// }}

				// onSlideChangeTransitionStart={(swiper) => {
				// 	// Get current and previous slide
				// 	const currentSlide = swiper.slides[swiper.activeIndex];
				// 	const prevSlide = swiper.slides[swiper.previousIndex];

				// 	// Reset slide positions
				// 	tl.set(currentSlide, { y: '100%' });
				// 	tl.set(prevSlide, { y: '0%' });

				// 	// Animate slide transition
				// 	tl.to(currentSlide, { y: '0%', duration: 1, ease: 'power3.inOut' });
				// 	tl.to(
				// 		prevSlide,
				// 		{ y: '-100%', duration: 1, ease: 'power3.inOut' },
				// 		0
				// 	);
				// }}
				onAutoplayStop={(swiper) => {
					console.log('stopped');
					console.log(swiper);
					// if (choice) swiper.slideTo(7);
					const { activeIndex, previousIndex } = swiper;
					const s1 = swiper.slides[previousIndex].dataset.key;
					const s2 = swiper.slides[activeIndex].dataset.key;
					const s3 = swiper.slides[activeIndex + 1].dataset.key;
					setRunning((curr) => {
						const newCurr = [...curr];
						newCurr[index] = false;
						return newCurr;
					});
					setSelected((curr) => {
						const newCurr = [...curr];
						newCurr[index] = [s1, s2, s3];
						return newCurr;
					});
				}}
				onAutoplayStart={(swipper) =>
					setRunning((curr) => {
						const newCurr = [...curr];
						newCurr[index] = true;
						return newCurr;
					})
				}
				onSlideChangeTransitionEnd={(swiper) => {
					// console.log('active', swiper.activeIndex);
					// console.log('real', swiper.realIndex);
					// console.log('snap', swiper.snapIndex);
					// console.log('loopedSlides', swiper.loopedSlides);
					// console.log('slides length', swiper.slides.length);
					// console.log('slides length', swiper);

					// count swiper loops
					if (choice && swiper.realIndex === 0) swiperLoop.current++;

					if (choice && swiper.realIndex === 7) {
						// console.log('trans');
						// console.log('loop:', swiperLoop.current);
						if (swiperLoop.current >= index) {
							swiper.autoplay.stop();
							// if (index === verticalsCount - 1) {
							// 	setChoices((curr) => curr.map((item) => undefined));
							// }
							swiperLoop.current = 0;
						}

						// swiper.autoplay.start();
					}
				}}
			>
				{entries.map((item, index) => {
					const realItem = lines[index - 6] ? lines[index - 6] : item;

					return (
						<SwiperSlide data-key={realItem} key={item + index}>
							<div className='inside'>{realItem}</div>
						</SwiperSlide>
					);
				})}

				{/* <SwiperSlide>Slide 10</SwiperSlide>
					<SwiperSlide>Slide 11</SwiperSlide> */}
			</Swiper>
		</>
	);
});

export default Vertical;
