import { ReactNode } from "react"
interface Props {
  children: ReactNode
}
export default function Layout({ children }: Props) {
  return (
    <>
      <main className='max-w-lg mx-auto my-4 sm:mt-16'>
        {children}
      </main>
    </>
  )
}
