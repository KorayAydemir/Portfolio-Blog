// This Next.js template already is configured to write with this Sanity Client
import { previewClient } from 'lib/sanity.tsx'
import type { NextApiRequest, NextApiResponse } from 'next';


const verifyRecaptcha = async (token: string) => {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;

    let verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" +
        secretKey +
        "&response=" +
        token;

    const response: any = await fetch(verificationUrl, { method: "POST" })
    return response
}


export default async function createComment(req: NextApiRequest, res: NextApiResponse) {
    // Destructure the pieces of our request
    const { register, name, email, comment } = JSON.parse(req.body)
    const token = req.headers.authorization!
    console.log(token)
    try {
        // Use our Client to create a new document in Sanity with an object  
        const response = await verifyRecaptcha(token)
        console.log(response)
        if (response.data.success && response.data.score >= 0.5) {
            await previewClient.create({
                _type: 'comment',
                post: register,
                name,
                email,
                comment
            })
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
