import React from 'react';
import { storiesOf } from '@storybook/react';

import Landing from './landing.jsx';

storiesOf('Landing', module)
    .add('default', () => (
    <Landing />
));