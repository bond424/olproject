import React, { useState, useEffect } from 'react';
import { InputLabel, Container, MenuItem, FormControl, Select, Typography, Button } from '@mui/material';
import Box from '@mui/material/Box';

import './reportpop.css';

const Reportpop = () => {
    return (
        <Container sx={{ width: '100%', height: '100%', bgcolor: '#fff' }}>
            <Box fullWidth sx={{ height: '100px' }}>
                <table className="reportpopup" style={{ width: '100%', padding: '9.5px' }}>
                    <caption>품의서</caption>
                    <tbody>
                        <tr>
                            <th colSpan={2}>문서 종류</th>
                            <td colSpan={3}>공통 {'>'} 품의서</td>
                            <th colSpan={3}>문서 번호</th>
                            <td colSpan={3}>품의_20240305_1</td>
                        </tr>
                        <tr>
                            <th colSpan={2}>기안 부서</th>
                            <td colSpan={3}>보안실</td>
                            <th colSpan={3}>기안자</th>
                            <td colSpan={3}>시도</td>
                        </tr>
                        <tr>
                            <th colSpan={2}>보존 연한</th>
                            <td colSpan={3}>시도</td>
                            <th colSpan={3}>보안 등급</th>
                            <td colSpan={3}>시도</td>
                        </tr>
                        <tr>
                            <th colSpan={2}>기안 일시</th>
                            <td colSpan={3}>시도</td>
                            <th colSpan={3}>완료 일시</th>
                            <td colSpan={3}>시도</td>
                        </tr>
                        <tr>
                            <th className="aoth" colSpan={2} rowSpan={3}>
                                결재
                            </th>
                        </tr>
                        <tr className="aotr">
                            <th colSpan={2}>부서</th>
                            <th colSpan={2}>부서</th>
                            <th colSpan={3}>부서</th>
                            <th colSpan={3}>부서</th>
                        </tr>
                        <tr className="aotr">
                            <td colSpan={2}></td>
                            <td colSpan={2}></td>
                            <td colSpan={3}></td>
                            <td colSpan={3}></td>
                        </tr>
                        <tr>
                            <th className="aoth" colSpan={2} rowSpan={3}>
                                합의
                            </th>
                        </tr>
                        <tr className="aotr">
                            <th colSpan={2}>부서</th>
                            <th colSpan={2}>부서</th>
                            <th colSpan={3}>부서</th>
                            <th colSpan={3}>부서</th>
                        </tr>
                        <tr className="aotr">
                            <td colSpan={2}></td>
                            <td colSpan={2}></td>
                            <td colSpan={3}></td>
                            <td colSpan={3}></td>
                        </tr>
                        <tr className="botr">
                            <th>참조</th>
                            <td colSpan={10}></td>
                        </tr>
                    </tbody>
                </table>
            </Box>
        </Container>
    );
};
export default Reportpop;
