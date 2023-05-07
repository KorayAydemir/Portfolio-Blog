// This Next.js template already is configured to write with this Sanity Client
import { previewClient } from 'lib/sanity.tsx'

const verifyRecaptcha = async (token: any) => {
    const secretKey = process.env.RECAPTHA_SECRET_KEY;

    let verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" +
        secretKey +
        "&response=" +
        token;

    return await fetch(verificationUrl, { method: 'POST' })
        .then(response => response.json())
        .then(data => { return data })
        .catch(error => { throw error })
}

export default async function createComment(req: any, res: any) {
    // Destructure the pieces of our request
    const { register, name, email, comment, token } = JSON.parse(req.body)
    try {
        const response = await verifyRecaptcha(token);
        if (response?.success && response?.score >= 0.5) {
            // Use our Client to create a new document in Sanity with an object  
            await previewClient.create({
                _type: 'comment',
                post: register,
                name,
                email,
                comment
            })

            return res.status(200).json({ message: 'Comment submitted' })
        } else {
            return res.json({
                status: "failed",
                message: "Something went wrong, please try again."
            })
        }
    } catch (err) {
        console.error(err)
        return res.status(500).json({ message: `Couldn't submit comment` })
    }

    //return res.status(200).json({ message: 'Comment submitted' })
}
