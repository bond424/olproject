import React, { useState, useEffect, useRef } from 'react';
import 'ol/ol.css'; //스타일
import { Grid, InputLabel, Container, MenuItem, FormControl, Select, Typography, Button } from '@mui/material';

const UpSwitch = (props) => {
    const { map } = props;
    const mapObject = map.map;

    const [selecterif, setselecterif] = useState();

    const handleChange = (event) => {
        const value = event.target.value;
        setselecterif(value);
        mapObject.map.getAllLayers().forEach((layer) => {
            if (layer.get('name') !== 'basemap') {
                // layer.setVisible(true);
                layer.setVisible(false);
            }
        });
        console.log(mapObject.map.getLayers());
        mapObject.map.getAllLayers().forEach((layer) => {
            if (layer.get('name') === value) {
                layer.setVisible(true);
            }
        });
    };

    return (
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small-label">지도선택</InputLabel>
            <Select labelId="demo-select-small-label" id="demo-select-small" value={selecterif} label="Age" onChange={handleChange}>
                <MenuItem value="B1">카자흐스탄_코스타나이_B1</MenuItem>
                <MenuItem value="B2">카자흐스탄_코스타나이_B2</MenuItem>
                <MenuItem value="B3">카자흐스탄_코스타나이_B3</MenuItem>
                <MenuItem value="B4">카자흐스탄_코스타나이_B4</MenuItem>
                <MenuItem value="B5">카자흐스탄_코스타나이_B5</MenuItem>
                <MenuItem value="B6">카자흐스탄_코스타나이_B6</MenuItem>
                <MenuItem value="B7">카자흐스탄_코스타나이_B7</MenuItem>
                <MenuItem value="S1">코스타나이_202403_식생지수</MenuItem>
                <MenuItem value="S2">코스타나이_202406_식생지수</MenuItem>
                <MenuItem value="S3">코스타나이_20231017_RGB</MenuItem>
                <MenuItem value="S4">코스타나이_위성영상</MenuItem>
            </Select>
        </FormControl>
    );
};
export default UpSwitch;
