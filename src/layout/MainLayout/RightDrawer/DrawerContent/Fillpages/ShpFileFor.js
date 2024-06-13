import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import {
    InputLabel,
    InputAdornment,
    IconButton,
    Container,
    MenuItem,
    FormControl,
    Select,
    Typography,
    Button,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import 'dayjs/locale/ko';
import OutlinedInput from '@mui/material/OutlinedInput';
// import { Margin } from '../../../../../../node_modules/@mui/icons-material/index';
import AuthBackground from 'assets/images/auth/AuthBackground';

import * as shapefile from 'shapefile';

import {
    addSetGeojson,
    setDBShpFiles,
    getDBShpFiles,
    getAllDBFiles,
    stsetgeo,
    strdbfset,
    setalert,
    setshpvi
} from 'store/slice/geofileSlice';

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

function ShpFileFor() {
    const dispatch = useDispatch();
    const { getAllFiles } = useSelector((state) => state.geofileRedycer);
    const { geofiles } = useSelector((state) => state.geofileRedycer);
    const { setshpfiles } = useSelector((state) => state.geofileRedycer);
    const { stgeojsondata } = useSelector((state) => state.geofileRedycer);
    const { startdbfset } = useSelector((state) => state.geofileRedycer);

    const [senddata, setsenddata] = useState([]);
    const [date, setDate] = useState('');
    const [type, setType] = useState('');
    const [dfiles, setdfiles] = useState(null);
    const [showsg, setshowsg] = useState(null);
    const [shpdt, setshpdt] = useState();
    const [dbfdt, setdbfdt] = useState();

    const dateChange = (event) => {
        setDate(event.target.value);
    };

    const typeChange = (event) => {
        setType(event.target.value);
    };

    // useEffect(() => {
    //     dispatch(getAllDBFiles());
    // }, []);

    useEffect(() => {
        dispatch(getAllDBFiles());
    }, [setshpfiles]);

    const readShpFile = async (shpFile, dbfFile) => {
        try {
            const shpReader = new FileReader();
            const dbfReader = new FileReader();
            const fname = shpFile.name;
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
                            obj.name = fname;
                            arr.push(obj);
                        }
                        const updatedGeojsonData = [...stgeojsondata, ...arr];
                        dispatch(addSetGeojson({ geojsondata: arr }));
                        dispatch(stsetgeo({ stgeojsondata: updatedGeojsonData }));
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
        // readcoordinate(shpFile);
        const formdata = new FormData();
        formdata.append('file', shpFile);
        formdata.append('file2', dbfFile);
        formdata.append('file3', shxFile);
        setsenddata(formdata);
    };

    const sendFile = () => {
        dispatch(setDBShpFiles(senddata));
        var infiles = document.getElementById('innerfiles');
        infiles.placeholder = '첨부파일';
        readShpFile(shpdt, dbfdt);
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
            if (shpFile && dbfFile) {
                var infiles = document.getElementById('innerfiles');
                infiles.placeholder = shpFile.name + ', ' + dbfFile.name + ', ' + shxFile.name;
                sendFileDb(shpFile, dbfFile, shxFile);
                setshpdt(shpFile);
                setdbfdt(dbfFile);
                // readShpFile(shpFile, dbfFile);
            } else {
                console.error('Both SHP and DBF files are required.');
            }
        }
    };

    const downloadFile = (n) => {
        var foption = new Object();
        foption.filename = n;
        Promise.resolve(dispatch(getDBShpFiles(foption))).then(() => {
            setdfiles(n);
        });
    };

    useEffect(() => {
        if (dfiles !== null && geofiles !== null) {
            const blob = new Blob([geofiles], { type: 'application/zip' });
            handleDownload(blob, dfiles);
            setdfiles(null);
        }
    }, [dfiles, geofiles]);

    const handleDownload = (e, n) => {
        const url = window.URL.createObjectURL(e);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.setAttribute('download', `${n}.zip`);
        // a.download = 'euckr_table_5179.shp';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    };

    const onshpfile = (n) => {
        var filename = n;
        var obj = {};
        obj.filenm = filename;
        obj.shp = filename + '.shp';
        obj.dbf = filename + '.dbf';
        Promise.resolve(dispatch(strdbfset(obj))).then(() => {
            setshowsg(n);
        });
    };

    useEffect(() => {
        if (showsg !== null && startdbfset !== null) {
            const blob = new Blob([startdbfset], { type: 'application/zip' });
            // handleDownload(blob, showsg);
            setshowsg(null);
            dispatch(setalert({ insertalert: true }));
        }
    }, [showsg, startdbfset]);

    const shpvisible = (n) => {
        dispatch(setshpvi({ shpvi: n }));
    };

    return (
        <Box
            sx={{
                width: '549px',
                height: 1080,
                backgroundColor: '#F3F3F5'
            }}
        >
            <Box sx={{ display: 'flex', width: '100%', padding: '5px', justifyContent: 'center' }}>
                <input style={{ width: '50%' }} id="innerfiles" placeholder="첨부파일" readOnly />
                <Button sx={{ ml: '4px' }} component="label" variant="contained" tabIndex={-1} startIcon={<CloudUploadIcon />}>
                    파일 선택
                    <VisuallyHiddenInput type="file" multiple onChange={onFileChange} />
                </Button>
                <Button sx={{ ml: '4px' }} component="label" variant="contained" tabIndex={-1} startIcon={<CloudUploadIcon />}>
                    파일 업로드
                    <VisuallyHiddenInput onClick={sendFile} />
                </Button>
            </Box>
            <FormControl
                sx={{
                    minWidth: 147,
                    display: 'inline-block',
                    marginLeft: '10px',
                    backgroundColor: '#fff',
                    fontFamily: 'NotoSansKr'
                }}
            >
                <Select
                    value={date}
                    onChange={dateChange}
                    displayEmpty
                    inputProps={{
                        'aria-label': 'Without label',
                        style: {
                            padding: 0
                        }
                    }}
                    sx={{
                        borderRadius: '5px',
                        minWidth: 147,
                        height: '32px',
                        '& .MuiSelect-select': {
                            padding: 0,
                            paddingLeft: '10px'
                        },
                        fontFamily: 'NotoSansKr'
                    }}
                >
                    <MenuItem value="">전체기간</MenuItem>
                    <MenuItem value={'Date1'}>전체기간1</MenuItem>
                    <MenuItem value={'Date2'}>전체기간2</MenuItem>
                    <MenuItem value={'Date3'}>전체기간3</MenuItem>
                </Select>
            </FormControl>
            <FormControl
                sx={{
                    minWidth: 130,
                    display: 'inline-block',
                    marginLeft: '10px',
                    backgroundColor: '#fff',
                    fontFamily: 'NotoSansKr'
                }}
            >
                <Select
                    value={type}
                    onChange={typeChange}
                    displayEmpty
                    inputProps={{
                        'aria-label': 'Without label',
                        style: {
                            padding: 0
                        }
                    }}
                    sx={{
                        borderRadius: '5px',
                        minWidth: 130,
                        height: '32px',
                        '& .MuiSelect-select': {
                            padding: 0,
                            paddingLeft: '10px'
                        },
                        fontFamily: 'NotoSansKr'
                    }}
                >
                    <MenuItem value="">품종</MenuItem>
                    <MenuItem value={'고시히카리'}>고시히카리</MenuItem>
                    <MenuItem value={'샤인머스켓'}>샤인머스켓</MenuItem>
                    <MenuItem value={'폭탄수박'}>폭탄수박</MenuItem>
                </Select>
            </FormControl>
            <FormControl
                sx={{
                    width: '230px',
                    marginLeft: '10px',
                    backgroundColor: '#fff',
                    style: {
                        paddingRight: 0
                    }
                }}
            >
                <OutlinedInput
                    placeholder="검색어를 입력해주세요."
                    sx={{
                        paddingLeft: '10px',
                        paddingRight: '0px',
                        fontFamily: 'NotoSansKr'
                    }}
                    inputProps={{
                        style: {
                            padding: 0,
                            borderRadius: '5px',
                            height: '32px'
                        }
                    }}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                edge="end"
                                sx={{
                                    backgroundColor: '#6995D5',
                                    fontFamily: 'NotoSansKr',
                                    fontSize: '14px',
                                    height: '32px',
                                    color: '#fff',
                                    width: '39px',
                                    marginRight: 0,
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderRadius: '0 0 5px 5px' // 각 모서리에 개별적으로 borderRadius 설정
                                    }
                                }}
                            >
                                검색
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
            <List
                sx={{
                    width: '100%',
                    bgcolor: 'background.paper',
                    padding: 0
                }}
            >
                {getAllFiles.map((feature, index) => (
                    <ListItem key={index}>
                        <ListItemAvatar>
                            <Avatar>
                                <ImageIcon onClick={() => shpvisible(feature.fileid)} />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={feature.fileid} secondary={feature.fileid} />
                        <Button sx={{ padding: '6px 10px' }} component="label" variant="contained" tabIndex={-1}>
                            도시
                            <VisuallyHiddenInput onClick={() => onshpfile(feature.filename)} />
                        </Button>
                        <Button sx={{ padding: '6px 10px', ml: '4px' }} component="label" variant="contained" tabIndex={-1}>
                            CSV 출력
                            <VisuallyHiddenInput />
                        </Button>
                        <Button sx={{ padding: '6px 10px', ml: '4px' }} component="label" variant="contained" tabIndex={-1}>
                            파일 다운로드
                            <VisuallyHiddenInput onClick={() => downloadFile(feature.filename)} />
                        </Button>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}

export default ShpFileFor;
