import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { InputLabel, Container, MenuItem, FormControl, Select, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import 'dayjs/locale/ko';
import PropTypes from 'prop-types';

function RoadinFor() {
    const [age, setAge] = useState('');

    return (
        <Box fullWidth sx={{ width: '100%', height: 880, display: 'flex', pl: 1, pr: 1 }}>
            <Box sx={{ width: '100%', height: '100%' }}></Box>
        </Box>
    );
}

export default RoadinFor;
