// This Next.js template already is configured to write with this Sanity Client
import { previewClient } from 'lib/sanity.tsx'
import type { NextApiRequest, NextApiResponse } from 'next';


const verifyRecaptcha = async (token: string) => {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;

    let verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" +
        secretKey +
        "&response=" +
        token;

    const response = await fetch(verificationUrl, { method: "POST" })
    return await response.json();
}

export default async function createComment(req: NextApiRequest, res: NextApiResponse) {
    // Destructure the pieces of our request
    const { register, name, email, comment, token } = JSON.parse(req.body)
    try {
        // Use our Client to create a new document in Sanity with an object  
        await previewClient.create({
            _type: 'comment',
            post: register,
            name,
            email,
            comment
        })
        const response = await verifyRecaptcha(token)
        if (response.data.success && response.data.score >= 0.5) {
            return res.status(200).json({ status: "Success", message: "Comment submitted" })
        }
        else {
            return res.json({
                status: "Failed",
                message: "Something went wrong, please try again!"
            })
        }
    } catch (err) {
        console.error(err)
        return res.status(500).json({ message: `Couldn't submit comment`, err })
    }
}
