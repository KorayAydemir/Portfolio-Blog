import { useTina } from "tinacms/dist/react";
import client from "tina/__generated__/client";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import ToggleTheme from "@component/components/shared/ToggleTheme";
import WideLayout from "@component/components/shared/layout_wide";


export default function Post(props: any) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });




  return (
    <WideLayout>
      <div className="flex justify-end mr-4">
        <ToggleTheme />
      </div>
      <div className="flex h-screen flex-col justify-between">
        <main className="mb-auto">
          <div className="mx-auto max-w-3x1 px-4 sm:px-6 xl:max-w-5xl xl:px-0">
            <header>
              <div className="space-y-1 border-b border-gray-200 pb-10 text-center dark:border-gray-700">
                <dl>
                  <div>
                    <dt className="sr-only">Published on</dt>
                    <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                      <time dateTime="2021-08-07T15:32:14.000Z">
                        {data.post.date?.split("T")[0]}
                      </time>
                    </dd>
                  </div>
                </dl>
                <div>
                  <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
                    {data.post.title}
                  </h1>
                </div>
              </div>
            </header>
            <div className="prose prose-slate prose-lg dark:prose-invert dark:prose-pre:bg-white dark:prose-pre:text-neutral-800">
              <TinaMarkdown content={data.post.body}></TinaMarkdown>
            </div>
          </div>
        </main>
      </div>
    </WideLayout >
  );
}

export const getStaticPaths = async () => {
  const { data } = await client.queries.postConnection();
  const paths = data.postConnection.edges?.map((post) => {
    return { params: { postSlug: post?.node?._sys.filename } };
  });

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async (ctx: any) => {
  const { data, query, variables } = await client.queries.post({
    relativePath: ctx.params.postSlug + ".md",
  });

  return {
    props: {
      data,
      query,
      variables,
    },
  };
};
