import { defineConfig, defineSchema } from "tinacms";
import { Posts } from "./collections/post";

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

export default defineConfig({
    branch,
    clientId: "086c7210-2047-4bfd-9f6a-067b9622a0e8", // Get this from tina.io
    token: "8ddf24c51a3bf8095aeccd9051cdc72b1b21b65b", // Get this from tina.io

    build: {
        outputFolder: "admin",
        publicFolder: "public",
    },
    media: {
        tina: {
            mediaRoot: "uploads",
            publicFolder: "public",
        },
    },
    schema: {
        collections: [Posts],
    },
});
