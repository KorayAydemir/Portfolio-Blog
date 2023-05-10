import { SIGNATURE_HEADER_NAME, isValidRequest } from "@sanity/webhook";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    message: string;
};

const secret: any = process.env.SANITY_ISR_WEBHOOK;
// if (!isValidRequest(req, secret)) {
//   res.status(401).json({
//     message: `Invalid signature: ${secret}, got: ${req.body}`
//   })
//   return
// }

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method !== "POST") {
        console.error("Must be a POST request");
        return res.status(401).json({ message: "Must be a POST request" });
    }

    try {
        const {
            body: { _type, email, post },
        } = req;
        console.log(req.body);

        switch (_type) {
            case "comment":
                await res.revalidate(`/blog/${post}`);
                return res.json({
                    message: `Revalidated for "${email}"'s comment on slug "${post}"`,
                });
        }

        return res.json({ message: "No managed type: " + _type });
    } catch (err) {
        return res.status(500).send({ message: "Error revalidating: " + err });
    }
}
