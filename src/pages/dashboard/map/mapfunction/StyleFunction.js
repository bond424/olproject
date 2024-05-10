import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Circle as CircleStyle, Fill, RegularShape, Stroke, Style, Text } from 'ol/style.js';
import { LineString, Point, Circle } from 'ol/geom.js';
import { Vector as VectorSource } from 'ol/source.js';
import { getArea, getLength, getDistance } from 'ol/sphere.js';
import { updateTipPoint, getTipPoint } from './context/letpoint';

function StyleFunction(feature, drawType, tip, modify) {
    const style = new Style({
        fill: new Fill({
            color: 'rgba(255, 255, 255, 0.2)'
        }),
        stroke: new Stroke({
            color: 'rgba(0, 0, 0, 0.5)',
            lineDash: [10, 10],
            width: 2
        }),
        image: new CircleStyle({
            radius: 5,
            stroke: new Stroke({
                color: 'rgba(0, 0, 0, 0.7)'
            }),
            fill: new Fill({
                color: 'rgba(255, 255, 255, 0.2)'
            })
        })
    });

    const labelStyle = new Style({
        text: new Text({
            font: '14px Calibri,sans-serif',
            fill: new Fill({
                color: 'rgba(255, 255, 255, 1)'
            }),
            backgroundFill: new Fill({
                color: 'rgba(0, 0, 0, 0.7)'
            }),
            padding: [3, 3, 3, 3],
            textBaseline: 'bottom',
            offsetY: -15
        }),
        image: new RegularShape({
            radius: 8,
            points: 3,
            angle: Math.PI,
            displacement: [0, 10],
            fill: new Fill({
                color: 'rgba(0, 0, 0, 0.7)'
            })
        })
    });

    const tipStyle = new Style({
        text: new Text({
            font: '12px Calibri,sans-serif',
            fill: new Fill({
                color: 'rgba(255, 255, 255, 1)'
            }),
            backgroundFill: new Fill({
                color: 'rgba(0, 0, 0, 0.4)'
            }),
            padding: [2, 2, 2, 2],
            textAlign: 'left',
            offsetX: 15
        })
    });

    const segmentStyle = new Style({
        text: new Text({
            font: '12px Calibri,sans-serif',
            fill: new Fill({
                color: 'rgba(255, 255, 255, 1)'
            }),
            backgroundFill: new Fill({
                color: 'rgba(0, 0, 0, 0.4)'
            }),
            padding: [2, 2, 2, 2],
            textBaseline: 'bottom',
            offsetY: -12
        }),
        image: new RegularShape({
            radius: 6,
            points: 3,
            angle: Math.PI,
            displacement: [0, 8],
            fill: new Fill({
                color: 'rgba(0, 0, 0, 0.4)'
            })
        })
    });

    const formatLength = function (line) {
        const length = getLength(line);
        let output;
        if (length > 1000) {
            output = Math.round((length / 1000) * 100) / 100 + ' km';
        } else {
            output = Math.round(length * 100) / 100 + ' m';
        }
        return output;
    };

    const formatArea = function (polygon) {
        const area = getArea(polygon);
        let output;
        if (area > 10000) {
            output = Math.round((area / 1000000) * 100) / 100 + ' km\xB2';
        } else {
            output = Math.round(area * 100) / 100 + ' m\xB2';
        }
        return output;
    };

    const formatRadius = function (meter) {
        const radius = getDistance(meter);
        let output;
        if (radius > 100) {
            output = Math.round((radius / 1000) * 100) / 100 + ' km';
        } else {
            output = Math.round(radius * 100) / 100 + ' m';
        }
        return output;
    };

    const segmentStyles = [segmentStyle];

    const styles = [];
    const geometry = feature.getGeometry();
    const type = geometry.getType();
    let point, label, line;
    if (!drawType || drawType === type || type === 'Point') {
        styles.push(style);
        if (type === 'Polygon') {
            point = geometry.getInteriorPoint();
            label = formatArea(geometry);
            line = new LineString(geometry.getCoordinates()[0]);
        } else if (type === 'LineString') {
            point = new Point(geometry.getLastCoordinate());
            label = formatLength(geometry);
            line = geometry;
        }
        // else if (type === 'Circle') {
        //     point = new Circle(geometry.getLastCoordinate());
        //     label = formatRadius(geometry);
        //     line = geometry;
        // }
    }
    // if (segments && line) {
    //     let count = 0;
    //     line.forEachSegment(function (a, b) {
    //         const segment = new LineString([a, b]);
    //         const label = formatLength(segment);
    //         if (segmentStyles.length - 1 < count) {
    //             segmentStyles.push(segmentStyle.clone());
    //         }
    //         const segmentPoint = new Point(segment.getCoordinateAt(0.5));
    //         segmentStyles[count].setGeometry(segmentPoint);
    //         segmentStyles[count].getText().setText(label);
    //         styles.push(segmentStyles[count]);
    //         count++;
    //     });
    // }
    if (label) {
        labelStyle.setGeometry(point);
        labelStyle.getText().setText(label);
        styles.push(labelStyle);
    }
    if (tip && type === 'Point' && !modify.getOverlay().getSource().getFeatures().length) {
        updateTipPoint(geometry);
        tipStyle.getText().setText(tip);
        styles.push(tipStyle);
    }
    return styles;
}

export default StyleFunction;
