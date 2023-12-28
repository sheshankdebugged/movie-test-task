import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='min-h-screen max-w-1440 m-auto '>
      <div className='w-full flex flex-col items-center pt-20 notfound'>
        <div className='flex justify-center mb-11'>
          <h1 className='text-white text-5xl font-semibold'>Page Not Found</h1>
        </div>
        <div className='flex justify-center'>
          <div className="pl-5 pr-5 pt-2 pb-2 rounded bg-emerald-400 addbtn">
            <Link href="/">Return Home</Link>
          </div>
        </div>
      </div>
    </div>
  )
}