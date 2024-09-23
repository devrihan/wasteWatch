
"use client";
import { Button } from '@/components/ui/button';
import { useUser } from '@/contexts/usercontext';
import { jwtDecode } from 'jwt-decode';
import { Leaf } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

// client_ID of the google project
const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
const devUrl = process.env.NEXT_PUBLIC_DEV_URL;

export default function SignIn() {
  const { setUser } = useUser();
  const router = useRouter();
  const googleButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load the Google API script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = initializeGoogleSignIn;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  function initializeGoogleSignIn() {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: CLIENT_ID,
        callback: handleCredentialResponse,
      });
      if (googleButtonRef.current) {
        window.google.accounts.id.renderButton(googleButtonRef.current, {
          theme: 'filled_black', // Dark theme for the button
          size: 'large',
          text: 'signin_with', // Google text style
          shape: 'rectangular', // Adjust shape if needed
        });
      }
    } else {
      console.error('Google API not loaded');
    }
  }

  async function handleCredentialResponse(response: any) {
    const decodedUser: any = jwtDecode(response.credential);

    // Saving the user data in local storage
    localStorage.setItem(
      'user',
      JSON.stringify({
        name: decodedUser.name,
        email: decodedUser.email,
        imageUrl: decodedUser.picture,
      })
    );

    setUser({
      name: decodedUser.name,
      email: decodedUser.email,
      imageUrl: decodedUser.picture,
    });

    try {
      const res = await fetch(`${devUrl}/users/checkuser/${decodedUser.email}`, {
        method: 'GET',
      });
      if (res.ok) {
        const data = await res.json();
        if (data.user.usertype === "Trucker"){
          console.log("User is a Tucker");
          router.replace("/dashboard/trucker");
        }
        else if (data.user.usertype === "Admin"){
          console.log("User is an Admin");
          router.replace("/dashboard");
        }
        else {
          console.log("User exists but type not matched");
          router.replace("/dashboard");
        }
      } else {
        router.replace("/onboarding");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  }

  return (
    <div 
      className="min-h-screen bg-black text-white flex flex-col bg-cover bg-center relative"
      //style={{ backgroundImage: "url('https://img.freepik.com/premium-photo/3d-rendered-abstract-grid-neon-topography-green-mesh-terrain_167650-3334.jpg')" }}
    >
      {/* Optional: Adding a dark overlay for readability */}
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
      
      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center p-4 z-10 relative">
        <div className="text-center">
          <div className="flex items-center justify-center mb-6">
            <Leaf className="h-12 w-12 text-[#00ff9d] mr-2" />
            <h1 className="text-5xl font-bold text-[#00ff9d]">EcoIndia</h1>
          </div>
          <p className="text-xl mb-8 max-w-md mx-auto text-gray-300">
            Empowering India's Sustainability. Join us in creating a sustainable future.
          </p>
        </div>

        <Button className='bg-black z-10'>
          <div ref={googleButtonRef}></div>
        </Button>
      </main>

      <footer className="text-center py-4 text-gray-500 text-sm z-10 relative">
        <p>Created by syntax_snipers</p>
      </footer>
    </div>
  );
}
