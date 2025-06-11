import type { NextApiRequest, NextApiResponse } from 'next';
import fs from "fs";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if(req.method !== "GET") {
        res.status(405).json({
            statusCode: 405,
            message: "This method is not allowed."
        });
        return;
    }

    const { route } = req.query;
    if(route == undefined) {
        res.status(400).json({});
        return;
    }

    const content_group_id = route[0];
    const image_name = route[1];

    const dir = "/home/traffic_images/content"; 
    console.log(dir + `/${content_group_id}/${content_group_id}_${image_name}`);

    fs.readFile(dir + `/${content_group_id}/${content_group_id}_${image_name}`, (error, data) => {
        if(error) {
            res.status(404).json({});
            return;
        }
        res.status(200).send(data);
        return;
    })
}
