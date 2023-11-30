'use client'
import Image from 'next/image'
import ImageUploader from './components/ImageUploader'
import AccountsList from './components/AccountsList';


export default function Home() {

  return (
    <div className='py-4'>
      <AccountsList></AccountsList>
      <img className="fixed top-0 bottom-0 left-0 right-0 scale-125 -z-40" src="/anhnen.png" alt="" />
    </div>
  )
}
