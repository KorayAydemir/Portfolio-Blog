import { Collection } from "tinacms";

export const Posts: Collection = {
    name: "posts",
    label: "Posts",
    path: "content/posts",
    fields: [
        {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
        },

        {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
            required: true,
        },
        {
            type: "datetime",
            name: "date",
            label: "Date",
            isTitle: true,
            required: true,
        },
        {
            label: "Tags",
            name: "tags",
            type: "string",
            list: true,
            required: true,
        },

        {
            type: "string",
            name: "summary",
            label: "Summary",
            required: true,
        },
    ],
    ui: {
        // This is an DEMO router. You can remove this to fit your site
        router: ({ document }) => `/blog/${document._sys?.filename}`,
    },
};
