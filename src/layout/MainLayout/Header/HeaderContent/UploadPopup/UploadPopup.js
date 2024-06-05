import React, { useState, useRef, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Badge, Box, IconButton, Paper, Popper, useMediaQuery } from '@mui/material';
import Transitions from 'components/@extended/Transitions';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import * as shapefile from 'shapefile';

import { addSetGeojson, setDBShpFiles, getDBShpFiles } from 'store/slice/geofileSlice';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
    id: 'shpload'
});

const UploadPopup = () => {
    const dispatch = useDispatch();
    const { setshpfiles } = useSelector((state) => state.geofileRedycer);
    const { geofiles } = useSelector((state) => state.geofileRedycer);
    const [senddata, setsenddata] = useState([]);
    const [shape, setshape] = useState();

    const theme = useTheme();
    const matchesXs = useMediaQuery(theme.breakpoints.down('md'));

    const anchorRef = useRef(null);
    const [open, setOpen] = useState(false);
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const iconBackColorOpen = 'grey.300';
    const iconBackColor = 'grey.100';

    const readShpFile = async (shpFile, dbfFile) => {
        try {
            const shpReader = new FileReader();
            const dbfReader = new FileReader();
            var arr = [];
            shpReader.onload = (shpEvent) => {
                dbfReader.onload = async (dbfEvent) => {
                    try {
                        const shpBuffer = shpEvent.target.result;
                        const dbfBuffer = dbfEvent.target.result;
                        const source = await shapefile.open(shpBuffer, dbfBuffer);
                        let result;
                        while (!(result = await source.read()).done) {
                            var obj = {};
                            obj.geojson = result.value; // GeoJSON 출력
                            obj.table = result.value.properties; // 속성 테이블 출력
                            arr.push(obj);
                        }
                        dispatch(addSetGeojson({ geojsondata: arr }));
                    } catch (error) {
                        console.error('Error reading SHP/DBF files:', error);
                    }
                };
                dbfReader.readAsArrayBuffer(dbfFile);
            };
            shpReader.readAsArrayBuffer(shpFile);
        } catch (error) {
            console.error('Error reading SHP file:', error);
        }
    };

    const sendFileDb = (shpFile, dbfFile, shxFile) => {
        const formdata = new FormData();
        formdata.append('file', shpFile);
        formdata.append('file', dbfFile);
        formdata.append('file', shxFile);
        setsenddata(formdata);
    };

    const sendFile = () => {
        console.log(senddata);
        dispatch(setDBShpFiles(senddata));
    };

    const onFileChange = (e) => {
        const files = e.target.files;
        console.log(files);
        if (files.length > 0) {
            let shpFile = null;
            let dbfFile = null;
            let shxFile = null;

            var arr = [];
            for (let file of files) {
                var obj = {};
                const fileType = file.name.split('.').pop().toLowerCase();
                if (fileType === 'shp') {
                    shpFile = file;
                    obj.shp = file;
                } else if (fileType === 'dbf') {
                    dbfFile = file;
                    obj.dbf = file;
                } else if (fileType === 'shx') {
                    shxFile = file;
                    obj.shx = file;
                }
                arr.push(obj);
            }
            console.log(arr);
            if (shpFile && dbfFile) {
                sendFileDb(shpFile, dbfFile, shxFile);
                readShpFile(shpFile, dbfFile);
            } else {
                console.error('Both SHP and DBF files are required.');
            }
        }
    };

    const s2ab = (s) => {
        var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
        var view = new Uint8Array(buf); //create uint8array as viewer
        for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff; //convert to octet
        return buf;
    };

    const downloadFile = () => {
        var foption = new Object();
        foption.filename = 'euckr_table_5179.shp';
        Promise.resolve(dispatch(getDBShpFiles(foption))).then(() => {
            const blob = new Blob([geofiles]);
            handleDownload(blob);
        });
    };

    const handleDownload = (e) => {
        const url = window.URL.createObjectURL(e);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'euckr_table_5179.shp';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    };

    // useEffect(() => {
    //     console.log(geofiles);
    //     const blob = new Blob(geofiles);
    //     handleDownload(blob);
    // }, [geofiles]);

    return (
        <Box sx={{ flexShrink: 0, ml: 0.75 }}>
            <IconButton
                disableRipple
                color="secondary"
                sx={{ color: 'text.primary', bgcolor: open ? iconBackColorOpen : iconBackColor }}
                aria-label="open profile"
                ref={anchorRef}
                aria-controls={open ? 'profile-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
            >
                <Badge color="primary">
                    <FileUploadIcon />
                </Badge>
            </IconButton>
            <Popper
                placement={matchesXs ? 'bottom' : 'bottom-end'}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                popperOptions={{
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [matchesXs ? -5 : 0, 9]
                            }
                        }
                    ]
                }}
            >
                {({ TransitionProps }) => (
                    <Transitions type="fade" in={open} {...TransitionProps}>
                        <Paper
                            sx={{
                                boxShadow: theme.customShadows.z1,
                                width: '100%',
                                minWidth: 420,
                                maxWidth: 420,
                                [theme.breakpoints.down('md')]: {
                                    maxWidth: 420
                                }
                            }}
                        >
                            <Card sx={{ maxWidth: 345 }}>
                                <CardContent>
                                    <Box sx={{ display: 'flex' }}>
                                        <input id="readf2" placeholder="첨부파일" readOnly />
                                        <Button
                                            component="label"
                                            role={undefined}
                                            variant="contained"
                                            tabIndex={-1}
                                            startIcon={<CloudUploadIcon />}
                                        >
                                            Upload file
                                            <VisuallyHiddenInput id="shpload" type="file" multiple onChange={onFileChange} />
                                        </Button>
                                        <Button
                                            component="label"
                                            role={undefined}
                                            variant="contained"
                                            tabIndex={-1}
                                            startIcon={<CloudUploadIcon />}
                                        >
                                            send db
                                            <VisuallyHiddenInput id="onlo" onClick={sendFile} />
                                        </Button>
                                        <Button
                                            component="label"
                                            role={undefined}
                                            variant="contained"
                                            tabIndex={-1}
                                            startIcon={<CloudUploadIcon />}
                                        >
                                            download
                                            <VisuallyHiddenInput id="dolo" onClick={downloadFile} />
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Paper>
                    </Transitions>
                )}
            </Popper>
        </Box>
    );
};

export default UploadPopup;
