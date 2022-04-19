import { IParallax, Parallax, ParallaxLayer } from '@react-spring/parallax';
import trucks from './trucks.jpg';
import boats from '../../layouts/unauthorized-layout/boats.jpg';
import { Button, Result } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import DriverApplicationForm from '../../driver-applications/driver-application-form';
import { useRef } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../routes/models/routes.enum';

function LandingPage() {
  const parallax = useRef<IParallax>(null);
  const navigate = useNavigate();

  return (
    <div>
      <Parallax pages={2} ref={parallax}>
        <ParallaxLayer
          factor={2.5}
          speed={0.5}
          style={{
            textAlign: 'center',
            backgroundImage: `url(${trucks})`,
            backgroundSize: 'cover',
          }}
        >
          <Result
            style={{ marginTop: '20px' }}
            icon={<SmileOutlined />}
            title="Sign-in to start your journey"
            extra={
              <Button
                onClick={() => navigate(`/${AppRoutes.SIGN_IN}`)}
                type="primary"
              >
                Sign In
              </Button>
            }
          />
        </ParallaxLayer>
        <ParallaxLayer
          speed={5}
          offset={1}
          style={{
            backgroundImage: `url(${boats})`,
            backgroundSize: 'cover',
          }}
        >
          <DriverApplicationForm
            onSuccess={() => parallax?.current?.scrollTo(0)}
          />
        </ParallaxLayer>
      </Parallax>
    </div>
  );
}

export default LandingPage;
