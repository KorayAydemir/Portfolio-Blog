import { SIGNATURE_HEADER_NAME, isValidRequest } from "@sanity/webhook"
import type { NextApiRequest, NextApiResponse } from "next"

type Data = {
  message: string
}

const secret: any = process.env.SANITY_ISR_WEBHOOK

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== "POST") {
    console.error("Must be a POST request")
    return res.status(401).json({ message: "Must be a POST request" })
  }

  const sanitysig = req.headers;
  if (!isValidRequest(req, secret)) {
    res.status(401).json({ message: `Invalid signature: ${secret}, ${sanitysig}`, })
    return
  }

  try {
    const {
      body: { email, postSlug, approved },
    } = req

    switch (approved) {
      case true:
        await res.revalidate(`/blog/${postSlug}`)
        return res.json({ message: `Revalidated "${email}"'s comment on slug "${postSlug}"` })
    }

    return res.json({ message: "No managed type" })
  } catch (err) {
    return res.status(500).send({ message: "Error revalidating" })
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
}

