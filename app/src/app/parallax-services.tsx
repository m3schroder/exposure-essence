'use client'
import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import {
	motion,
	useTransform,
	useScroll,
	useInView
} from 'framer-motion';

export function Services() {
	const { scrollY } = useScroll();
	const y1 = useTransform(scrollY, [0, 300], [0, 200]);
	const y2 = useTransform(scrollY, [0, 300], [0, -100]);

	const ref = useRef(null)
	const inView = useInView(ref);

	const variants = {
		visible: { opacity: 1, scale: 1, y: 0 },
		hidden: {
			opacity: .8,
			y: 50
		}
	};

	return (
		<div className='bg-black py-12 w-[100vw] h-[200vh] overflow-clip'>
			<motion.div className="box" style={{ y: y1, x: -50 }} />
			<div style={{ height: 500 }} />
			{['/josh.jpg', '/emily.jpg'].map((src, idx) => (

				<motion.div
					key={src}
					animate={inView ? 'visible' : 'hidden'}
					variants={variants}
					transition={{ duration: 2, ease: 'easeOut' }}
					style={{ x: 200 * idx }}
					ref={ref}
					className="magic"
				>
					<img src={src} width={400} height={300} className='rounded-md' />
				</motion.div>
			))}
		</div>
	);
}