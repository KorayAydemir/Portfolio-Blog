import { createClient } from '@sanity/client'
import sanityImage from '@sanity/image-url'

const options = {
    // Find your project ID and dataset in `sanity.json` in your studio project
    dataset: 'production',
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    //useCdn: process.env.NODE_ENV === 'production',
    useCdn: false,
    apiVersion: "2023-05-07"
    // useCdn == true gives fast, cheap responses using a globally distributed cache.
    // Set this to false if your application require the freshest possible
    // data always (potentially slightly slower and a bit more expensive).
}

const client = createClient(options)

export const imageBuilder = (source: any) => sanityImage(client).image(source)

export const previewClient = createClient({
    ...options,
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
    apiVersion: "2023-05-07"
})

export default client
