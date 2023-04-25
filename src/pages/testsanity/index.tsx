import { CommentForm } from "@component/components/blog/CommentForm";
import { Comments } from "@component/components/blog/Comments";
import { createClient } from "next-sanity";

export default function IndexPage({ pets }: any) {
  return (
    <>
      <header>
        <h1>Sanity + Next.js</h1>
      </header>
      <main>
        {!(pets.length > 0) && <p>No pets to show</p>}
        {!(pets.length > 0) && (
          <div>
            <div>¯\_(ツ)_/¯</div>
            <p>
              Your data will show up here when you've configured everything
              correctly
            </p>
          </div>
        )}
        <Comments comments={pets} /> <CommentForm _id={pets._id} />
      </main>
    </>
  );
}

const client = createClient({
  projectId: 'j13exjw5',
  dataset: "production",
  apiVersion: "2022-03-25",
  useCdn: false
});


export async function getStaticProps() {
  const postName = "FirstPost"
  const comments = `*[_type == "comment" && post == "${postName}" && approved == true]`
  const pets = await client.fetch(comments);

  return {
    props: {
      pets
    }
  };
}
