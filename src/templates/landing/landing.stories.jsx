import React from 'react';
import { storiesOf } from '@storybook/react';

import Landing from './landing.jsx';
import { mockGameController } from '../../stories/controller';

const ctrl = () => mockGameController();

storiesOf('Templates / Landing', module)
  .add('default', () => (
    <Landing {...ctrl()} />
  ));
