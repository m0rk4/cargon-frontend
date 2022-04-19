import React, { useEffect, useRef } from 'react';
import { Carousel, Typography } from 'antd';
import { CarouselRef } from 'antd/es/carousel';

function HomePage() {
  useEffect(() => {
    const interval = setInterval(() => {
      carousel?.current?.next();
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  const carousel = useRef<CarouselRef>(null);

  return (
    <Carousel ref={carousel}>
      <div>
        <Typography.Title
          style={{
            height: '480px',
            color: '#fff',
            lineHeight: '480px',
            textAlign: 'center',
            background: '#364d79',
          }}
        >
          Welcome
        </Typography.Title>
      </div>
      <div>
        <Typography.Title
          style={{
            height: '480px',
            color: '#fff',
            lineHeight: '480px',
            textAlign: 'center',
            background: '#364d79',
          }}
        >
          To
        </Typography.Title>
      </div>
      <div>
        <Typography.Title
          style={{
            height: '480px',
            color: '#fff',
            lineHeight: '480px',
            textAlign: 'center',
            background: '#364d79',
          }}
        >
          Cargon!
        </Typography.Title>
      </div>
    </Carousel>
  );
}

export default HomePage;
