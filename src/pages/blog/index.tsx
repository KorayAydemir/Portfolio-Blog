export default function test() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">


      <main className="mb-auto">

        <div className="divide-y divide-gray-200 dark:divide-gray-700">

          <div className="space-y-2 pt-6 pb-8 md:space-y-5">

            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
              Latest</h1>
            <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
              A blog of me talking about anything and tutorials.
            </p>

          </div>
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            <li className="py-12">
              <article>
                <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                  <dl>
                    <dt className="sr-only">
                      Published on</dt>
                    <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                      <time dateTime="2021-08-07T15:32:14.000Z">
                        August 7, 2021</time>
                    </dd>
                  </dl>
                  <div className="space-y-5 xl:col-span-3">
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl font-bold leading-8 tracking-tight">
                          <a className="text-gray-900 dark:text-gray-100" href="/blog/new-features-in-v1">
                            How I used TinaCMS to give my blog superpowers</a>
                        </h2>
                        <div className="flex flex-wrap">
                          <a className="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400" href="/tags/next-js">
                            next-js</a>
                          <a className="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400" href="/tags/tailwind">
                            tailwind</a>
                          <a className="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400" href="/tags/tailwind">
                            tinacms</a>
                          <a className="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400" href="/tags/guide">
                            guide</a>
                        </div>
                      </div>
                      <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                        An overview of how I used TinaCMS, a WSIWYG editor, to manage my blog from anywhere. And the roadblocks I have encountered.</div>
                    </div>
                    <div className="text-base font-medium leading-6">
                      <a className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400" aria-label="Read &quot;New features in v1&quot;" href="/blog/new-features-in-v1">
                        Read more →</a>
                    </div>
                  </div>
                </div>
              </article>
            </li>
          </ul>
        </div>
        <div className="flex justify-end text-base font-medium leading-6">
          <a className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400" aria-label="all posts" href="/blog">
            All Posts →</a>
        </div>
        <div className="flex items-center justify-center pt-4">
          <div>
          </div>
        </div>
      </main>


    </div>

  )
}
