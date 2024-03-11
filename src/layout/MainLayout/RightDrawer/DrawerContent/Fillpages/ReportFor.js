import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { InputLabel, Container, MenuItem, FormControl, Select, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import 'dayjs/locale/ko';
import PropTypes from 'prop-types';

import ReportTable from './ReportTable';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1
});

function ReportFor() {
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const handleOpenPopup = () => {
        const width = 930;
        const height = 958;
        const left = window.screenX + (window.outerWidth - width) / 2;
        const top = window.screenY + (window.outerHeight - height) / 2;
        const popup = window.open(
            'http://localhost:3000/value/reportpop',
            '팝업...',
            `width=${width},height=${height},left=${left},top=${top}`
        );
    };

    return (
        <Container maxWidth="sm" sx={{ height: '100%' }}>
            <Box fullWidth sx={{ height: '100px', bgcolor: '#f2f5f3' }}>
                <div style={{ width: '100%', display: 'flex' }}>
                    <Typography sx={{ p: '9.5px', mt: '5px' }}>구분</Typography>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <InputLabel id="demo-select-small-label">주요지점</InputLabel>
                        <Select labelId="demo-select-small-label" id="demo-select-small" value={age} label="Age" onChange={handleChange}>
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <InputLabel id="demo-select-small-label">전체</InputLabel>
                        <Select labelId="demo-select-small-label" id="demo-select-small" value={age} label="Age" onChange={handleChange}>
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <InputLabel id="demo-select-small-label">전체</InputLabel>
                        <Select labelId="demo-select-small-label" id="demo-select-small" value={age} label="Age" onChange={handleChange}>
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <Box
                    fullWidth
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Button onClick={handleOpenPopup} component="label" variant="contained" tabIndex={-1} startIcon={<CloudUploadIcon />}>
                        팝업 열기
                    </Button>
                </Box>
            </Box>
            <Box
                fullWidth
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100px',
                    bgcolor: '#f2f5f3',
                    mt: 1
                }}
            >
                <Box sx={{ display: 'flex' }}>
                    <Typography sx={{ p: '9.5px' }}>한글파일 업로드</Typography>
                    <Button component="label" role={undefined} variant="contained" tabIndex={-1} startIcon={<CloudUploadIcon />}>
                        Upload file
                        <VisuallyHiddenInput type="file" />
                    </Button>
                </Box>
            </Box>
            <Box fullWidth sx={{ height: '200px', bgcolor: '#d9dbdb', mt: 1 }}>
                {/* <ReportTable /> */}
            </Box>
            <Box fullWidth sx={{ height: '100px', bgcolor: '#f2f5f3', mt: 1 }}>
                <div style={{ width: '100%', display: 'flex' }}>
                    <Typography sx={{ p: '9.5px' }}>예약발송여부</Typography>
                    <FormControl>
                        <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
                            <FormControlLabel value="1" control={<Radio />} label="즉시" />
                            <FormControlLabel value="2" control={<Radio />} label="예약" />
                        </RadioGroup>
                    </FormControl>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
                        <DateTimePicker />
                    </LocalizationProvider>
                </div>
                <div style={{ width: '100%', paddingLeft: '10px', paddingRight: '10px' }}>
                    <Button fullWidth variant="contained">
                        보고서 발송
                    </Button>
                </div>
            </Box>
        </Container>
    );
}

export default ReportFor;
