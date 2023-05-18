import { writeClient } from "lib/sanity.tsx";
import { NextApiRequest, NextApiResponse } from "next";

import crypto from "crypto";

const verifyRecaptcha = async (token: any) => {
    const secretKey = process.env.RECAPTHA_SECRET_KEY;

    let verificationUrl =
        "https://www.google.com/recaptcha/api/siteverify?secret=" +
        secretKey +
        "&response=" +
        token;

    return await fetch(verificationUrl, { method: "POST" })
        .then((response) => response.json())
        .then((data) => {
            return data;
        })
        .catch((error) => {
            throw error;
        });
};

export default async function createComment(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // Destructure the pieces of our request
    const { postId, name, email, comment, token, parentId } = JSON.parse(
        req.body
    );

    try {
        const response = await verifyRecaptcha(token);
        if (response.success && response.score >= 0.5) {
            const randomId = crypto.randomBytes(20).toString("hex");

            const mutations = [
                {
                    create: {
                        _id: randomId,
                        _type: "comment",
                        post: postId,
                        name,
                        email,
                        comment,
                        parent: {
                            _type: "reference",
                            _ref: parentId,
                            _weak: true,
                        },
                    },
                },
                {
                    patch: {
                        query: `*[_id == "${parentId}" || _id == "drafts.${parentId}"]`,
                        setIfMissing: { replies: [] },
                    },
                },
                {
                    patch: {
                        query: `*[_id == "${parentId}" || _id == "drafts.${parentId}"]`,
                        insert: {
                            before: "replies[0]",
                            items: [
                                {
                                    _type: "reference",
                                    _ref: randomId,
                                    _key: randomId,
                                    _weak: true,
                                },
                            ],
                        },
                    },
                },
            ];

            const response = await writeClient.mutate(mutations);
            console.log(response);

            return res.status(200).json({ message: "Comment submitted" });
        } else {
            return res.json({
                status: "failed",
                message: "Something went wrong, please try again.",
            });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: `Couldn't submit comment` });
    }
}
