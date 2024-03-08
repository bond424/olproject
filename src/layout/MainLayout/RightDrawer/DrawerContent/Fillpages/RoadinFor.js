import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { InputLabel, Container, MenuItem, FormControl, Select, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import 'dayjs/locale/ko';
import PropTypes from 'prop-types';
import './roadtb.css';

function RoadinFor() {
    const [age, setAge] = React.useState('');

    return (
        <Box fullWidth sx={{ width: '100%', height: 880, display: 'flex', pl: 1, pr: 1 }}>
            <Box sx={{ width: '40%', height: '100%' }}>
                <table className="roadtb" style={{ width: '100%', padding: '9.5px' }}>
                    <caption>구간정보</caption>
                    <tbody>
                        <tr>
                            <th>도로종류</th>
                            <td>시도</td>
                        </tr>
                        <tr>
                            <th>노선명</th>
                            <td>0034호선</td>
                        </tr>
                        <tr>
                            <th>구간명</th>
                            <td>01(궁평 - 상안)구간</td>
                        </tr>
                        <tr>
                            <th>도로종류</th>
                            <td>시도</td>
                        </tr>
                        <tr>
                            <th>시점</th>
                            <td>0.000Km</td>
                        </tr>
                        <tr>
                            <th>종점</th>
                            <td>7.656Km</td>
                        </tr>
                    </tbody>
                </table>
            </Box>
            <Box sx={{ width: '60%', height: '100%' }}>
                <Box sx={{ height: '50%', bgcolor: '#d9dbdb' }}>
                    <div></div>
                </Box>
                <Box sx={{ height: '50%', bgcolor: 'f2f5f3' }}>
                    <div></div>
                </Box>
            </Box>
        </Box>
    );
}

export default RoadinFor;
