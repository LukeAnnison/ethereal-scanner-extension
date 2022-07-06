import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query } = req;

  switch (method) {
    case "GET":
      try {
        const tikapi = require("tikapi")("UjQlozB5hG8csuUmagHxZ15TnGkDBkVQ");
        const result = await tikapi.public.likes({
          id: query.id,
        });
        const parsedResult = JSON.parse(JSON.stringify(result.json));

        res.status(200).json({ success: true, data: parsedResult });
    } catch (error) {
        console.log({ error });
        const parsedError = JSON.parse(JSON.stringify(error));

        res.status(400).json({ success: false });

      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
