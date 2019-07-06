import React from 'react';
import { storiesOf } from '@storybook/react';

import Landing from './landing.jsx';

storiesOf('Templates / Landing', module)
    .add('default', () => (
        <Landing />
    ));