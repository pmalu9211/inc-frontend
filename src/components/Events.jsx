import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion, useTransform, useScroll } from "framer-motion";
import { CanvasRevealEffect } from "./ui/canvas-reveal-effect.jsx";

import { events } from "../constants/index.js";

import { styles } from '../styles.js'
import SectionWrapper from "../hoc/SectionWrapper.jsx";
import MobileContext from "../hooks/MobileContext.js";
import SwipeCards from "./ui/SwipeCards.jsx";

function dateToWords(dateStr) {
  const [day, month, year] = dateStr.split('-');
  const date = new Date(`${year}-${month}-${day}`);

  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

function Events(){

  const isMobile = useContext(MobileContext);

  console.log('in events', isMobile)

  return (
    <>
    <motion.div 
    className='w-full flex flex-col items-center justify-evenly'>
      <motion.div 
      initial={{ y: 100, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ ease: "easeInOut", duration: 0.75}}
      >
        <h2 className={`${styles.sectionHeadText}`}>Events.</h2>
      </motion.div>
      {isMobile ? <SwipeCards events={events} /> : <EventCards />}
    </motion.div>
    </>
  )
}

function EventCards({ }) {
  const navigate = useNavigate();

  const handleViewDetails = (id) => {
    navigate(`/events/${id}`);
  };

  return (
    <div className="py-20 flex flex-col lg:flex-row items-center justify-center bg-primary w-full gap-4 mx-auto px-6">
      {events.map((event, index) => (
        <Card 
          key={event.id}
          index={index}
          title={event.title} 
          details={{
            id: event.id,
            logo: event.logo,
            description: event.description,
            team_size: event.team_size,
            type: event.type,
            date: event.date
          }}
          handleViewDetails={handleViewDetails}
        >
          <CanvasRevealEffect animationSpeed={5.0} containerClassName={event.color} />
        </Card>
      ))}
    </div>
  );
}

const Card = ({
  title,
  children,
  details,
  index,
  handleViewDetails,
}) => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <motion.div
    onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => setHovered(false)}
    initial={{opacity: 0}}
    whileInView={{opacity: 1}}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ ease: "easeInOut", duration: 0.6, delay:index*0.25}}
    className="border-2 border-white-100 border-dotted hover:border-opacity-0 transition duration-200 group/canvas-card flex flex-col items-center justify-between max-w-sm w-full mx-auto p-4 relative h-[28rem]"
    >
      <AnimatePresence>
        {(hovered) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full w-full absolute inset-0"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="h-full flex flex-col items-center justify-center">
        <div className="absolute group-hover/canvas-card:-translate-y-8 group-hover/canvas-card:opacity-0 transition duration-200">
          <img src={details.logo} alt={`${title} logo`} className="w-24 h-24" />
        </div>
        
        
        <div className={`relative inset-0 flex flex-col items-center justify-center p-6 transition-all duration-300 ${
          (hovered) ? 'opacity-100' : 'opacity-0'
        }`}>
          <img src={details.logo} alt={`${title} logo`} className="w-16 h-16 mb-4" />
          <h2 className="text-2xl font-bold text-white-100 mb-2">{title}</h2>
          <div className="flex flex-row space-x-2 mb-8">
            <p className="text-sm font-medium bg-tertiary rounded-lg px-2 py-1 text-slate-400">{details.type}</p>
            <p className="text-sm font-medium bg-tertiary rounded-lg px-2 py-1 text-slate-400">{details.team_size}</p>
          </div>
          <p className="text-white-100/90 text-md text-center mb-4">{details.description}</p>
          <span className="text-slate-400 text-sm font-medium mb-4">{dateToWords(details.date)}</span>


          <button
            className="relative group inline-block p-px font-semibold leading-6 text-white-100 bg-tertiary shadow-2xl cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95"
            onClick={() => handleViewDetails(details.id)}
          >
            <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-dark-blue via-light-blue to-orange-100 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>

            <span className="relative z-10 block px-4 py-2 rounded-xl bg-gray-950">
              <div className="relative z-10 flex items-center space-x-2">
                <span className="transition-all duration-500 group-hover:translate-x-1">View Details</span>
                <svg
                  className="w-6 h-6 transition-transform duration-500 group-hover:translate-x-1"
                  data-slot="icon"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                    fillRule="evenodd"
                  ></path>
                </svg>
              </div>
            </span>
          </button>
          
        </div>

        <h2 className={`text-white-100 absolute bottom-[10%] text-2xl z-10 font-bold transition duration-200 ${
          hovered ? 'opacity-0' : 'opacity-100'
        }`}>
          {title}
        </h2>
      </div>
    </motion.div>
  );
};


export default SectionWrapper(Events, 'events')