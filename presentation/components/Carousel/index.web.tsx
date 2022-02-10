import React from 'react';
import {Carousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import {COLORS} from '../../resources/constants';

import {Loader} from '../Loader';
import './style.web.css';

type Props = {
  listItem: any[];
};

export default ({listItem}: Props) => {
  const carousel =
    listItem && listItem.length > 0
      ? listItem.map((item: any) => {
          const {imageUrl, nom} = item;
          return (
            <div
              key={nom}
              onClick={() => {}}
              className="carouselWeb"
              style={{
                backgroundImage: COLORS.primary,
              }}>
              <img src={imageUrl} />
            </div>
          );
        })
      : [];
  return (
    <div className="container-fluid welcome">
      {listItem && listItem.length > 0 ? (
        <Carousel swipeable infiniteLoop interval={4000} autoPlay={true}>
          {carousel}
        </Carousel>
      ) : (
        <Loader />
      )}
    </div>
  );
};
