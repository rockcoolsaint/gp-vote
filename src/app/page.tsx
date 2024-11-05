'use client';

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Homepage = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to a specific page
    router.push('/admin'); // Replace '/target-page' with your desired path
  }, [router])
  
  return (
    <div className=''>Homepage</div>
  )
}

export default Homepage