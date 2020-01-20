import { Polyline } from "./Polyline";
import { Vector3 } from "../../math/Vector3";
import { vectorCompare } from "../../alg/points";
import { Line } from "./Line";
import { Point } from "./Point";

export class Polygon extends Polyline {
    constructor() {
        super();

    }

    offset() {

    }


}

/**
 * robust 识别出点集或者多边形的法线
 * @param {Polygon|Array<Point|Vector3>} points 
 * @returns {Vector3} 法线
 */
export function recognitionPolygonNormal(points) {
    var len = points.length

    var minV = +Infinity
    var minVIndex = -1
    for (let i = 0; i < len + 2; i++)
    {
        var p0 = points[i % len];
        var p1 = points[(i + 1) % len];
        var p2 = points[(i + 2) % len];
        var dotv = Math.abs(p1.clone().sub(p0).normalize().dot(p2.clone().sub(p1).normalize()));
        if (minV > dotv)
        {
            dotv = minV;
            minVIndex = i;
        }
    }
    var p0 = points[(minVIndex - 1 + len) % len];
    var p1 = points[(minVIndex) % len];
    var p2 = points[(minVIndex + 1) % len];
    return p1.clone().sub(p0).cross(p2.clone().sub(p1)).normalize();

    //
    // const newPoints = [...points];
    // newPoints.sort(vectorCompare);
    // var line = new Line(newPoints[0], newPoints.get(-1));
    // var point = new Point();
    // var maxDistance = -Infinity;
    // var maxDistanceP = null;
    // for (let i = 0; i < len; i++)
    // {
    //     point.copy(points[i]);
    //     var distance = point.distanceLinePureSq(line);
    //     if (distance > maxDistance)
    //     {
    //         maxDistance = distance;
    //         maxDistanceP = points[i];
    //     }
    // }
    // var d1 = maxDistanceP.clone().sub(newPoints[0])
    // var d2 = maxDistanceP.clone().sub(newPoints.get(-1))

    // var normal = d1.cross(d2);
}