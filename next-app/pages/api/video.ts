import { NextApiRequest, NextApiResponse } from "next";
import { get } from "lodash";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query } = req;

  switch (method) {
    case "GET":
      try {
        const tikapi = require("tikapi")("UjQlozB5hG8csuUmagHxZ15TnGkDBkVQ");
        const result = await tikapi.public.video({
          id: query.id,
          country: 'TR',
        });
        const parsedResult = JSON.parse(JSON.stringify(result.json));

        res.status(200).json({ success: true, data: parsedResult });
    } catch (error) {
        const parsedError = JSON.parse(JSON.stringify(error));

        res.status(400).json({ success: false });

      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
