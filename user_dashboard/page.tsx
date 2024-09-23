'use client';


import { DarkThemeAiChatbot } from "@/components/dark-theme-ai-chatbot";
import LitterLogsTable from "@/components/litterlogs/page";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { useUser } from "@/contexts/usercontext";
import { Bell, Calendar, ChevronDown, LogOut, Mail, Menu, Settings } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'



const DonutChart = ({ value, color, size = 80 }) => {
  const data = [
    { value: value, color: color },
    { value: 100 - value, color: '#111112FF' },
  ]

  return (
    <ResponsiveContainer width={size} height={size}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={size / 3}
          outerRadius={size / 2}
          fill="#FFFFFFFF"
          dataKey="value"
          startAngle={90}
          endAngle={-270}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  )
}



export default function Dashboard() {
  const devUrl = process.env.NEXT_PUBLIC_DEV_URL;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { user, setUser } = useUser();
  const router = useRouter();

  const [isActionEnabled, setIsActionEnabled] = useState(false);

  // useEffect(() => {
  //   const checkUser = async () => {
  //     if (!user) {
  //       const storedUser = localStorage.getItem('user');
  //       if (storedUser) {
  //         setUser(JSON.parse(storedUser));
  //         console.log(user)
  //         // Check if the user exists in the backend
  //         const response = await fetch(`${devUrl}/users/checkuser/${JSON.parse(user)?.email}`, {
  //           method: 'GET',
  //         });

  //         if (!response.ok) {
  //           // Redirect if the user is not valid
  //           router.replace("/signin");
  //         }
  //       } else {
  //         // Redirect if no user is found
  //         router.replace("/signin");
  //       }
  //     }
  //   };
  //   checkUser();
  // }, [user, setUser, router, devUrl]);
  
  if (!user) {
    return <p>Loading...</p>;
  }

  function signOut(){
    if (window.google && window.google.accounts && window.google.accounts.id){
      window.google.accounts.id.disableAutoSelect();
    }
    localStorage.removeItem('user');
    setUser(null);
    router.replace('/signin');
  }

  const handleClick = async () => {
    // Replace with your actual user ID
    setIsActionEnabled((prev) => !prev);
      console.log(user.email);
    try {
      const response = await fetch(`https://ecoindia-backend.onrender.com/bins/create-bin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log(data);
      
    } catch (error) {
      console.error('Error making the request:', error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between p-4 bg-black border-b border-white/10">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-semibold">DASHBOARD</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="h-6 w-6" />
          </Button>
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2 hover:text-black">
                <img src={user?.imageUrl || "/placeholder.svg?height=32&width=32"} className="w-8 h-8 rounded-full" />
                <ChevronDown className="h-4 w-4" />
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80 bg-[#2c2d2e] border-none shadow-lg mr-5">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold text-[#00ff9d]">{user?.name}</h4>
                  <p className="text-sm text-gray-400">Pro Environmentalist</p>
                  <div className="flex items-center pt-2">
                    <Mail className="mr-2 h-4 w-4 opacity-70" />
                    <span className="text-xs text-gray-400">{user?.email}</span>
                  </div>
                  <div className="flex items-center pt-2">
                    <Calendar className="mr-2 h-4 w-4 opacity-70" />
                    <span className="text-xs text-gray-400">Joined December 2021</span>
                  </div>
                </div>
                <img src={user?.imageUrl || "/tree.jpg"} className="w-[50px] h-[50px] rounded-full" />
              </div>
              <div className="mt-4 pt-4 border-t border-gray-600">
                <Button variant="destructive" className="w-full bg-red-600 hover:bg-red-700 text-white" onClick={signOut} >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      </nav>

      {/* Main Content */}
      <main className="p-6 grid grid-cols-3 gap-6">
        {/* Cards Row */}
        
        {/*Map section*/}
        <Card className=" col-span-2 bg-black border border-white/10 shadow-lg overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-semibold text-[#00ff9d]">Location Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-grow">
              <div className="aspect-video w-full">
                <iframe
                src="https://google-maps-component.vercel.app/"
                width="100%"
                height="100%"
                style={{border: 0}}
                allowFullScreen
                loading="lazy"
                ></iframe>
              </div>
            </div>
            </div>
            </CardContent>
            </Card>

            
            <Card className="bg-black border border-white/10 shadow-lg flex flex-col justify-center align-middle">
          <CardContent className="p-6">
            <h2 className="text-5xl font-bold mb-2">Hello, {user.name}</h2>
            <h2 className="text-3xl font-bold mb-4 text-gray-400">Let&apos;s roll</h2>
            <p className="text-sm text-gray-400 mb-6">Waste Less, Live More: Together, We Can Make a Difference!</p>
            <div className="bg-emerald-950 p-8 rounded-3xl">
              <Button
                  className={`w-full font-bold py-7 text-lg rounded-full mb-5 transition-colors ${
                    isActionEnabled
                      ? 'bg-red-600 hover:bg-red-700 text-white'
                      : 'bg-green-600 hover:bg-green-700 text-white'
                  }`}
                  onClick={handleClick}
                >
                  {isActionEnabled ? 'Cancel Pickup' : 'Call for Pickup'}
                </Button>
                <Button variant="outline" className="w-full bg-white text-black hover:bg-yellow-400 font-bold py-7 text-lg rounded-full hover:text-black">
                Schedule a Truck
              </Button>
            </div>
          </CardContent>
        </Card>
        </main>
        <main className="p-6 flex gap-y-0 gap-x-6">
        {/*Log Table*/}
        <LitterLogsTable />
        <Card className="bg-yellow-400 border-none shadow-lg flex flex-col">
            <CardContent className="p-6 h-5/6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-black p-4">Upcoming Event</h3>
                  <p className="text-sm text-gray-700 font-semibold px-4">Clean VIT (24/05/24)</p>
                </div>
                <img src="https://static.vecteezy.com/system/resources/previews/024/467/586/original/cartoon-tree-isolated-on-a-white-background-simple-modern-style-cute-green-plants-forest-flat-illustration-summer-spring-trees-vector.jpg" alt="Event" className="w-16 h-16 rounded-full" />
              </div>
              </CardContent>
              <CardContent className="justify-end">
              <Button variant="outline" className="w-full border-black text-white hover:bg-black hover:text-yellow-400 ">
                Join Event
              </Button>
            </CardContent>
          </Card>
          <Card className="bg-black border border-white/10 shadow-lg w-2/12">
            <CardContent className="p-4">
              <div className="flex flex-col justify-center align-middle">
                <div className="flex-1 flex flex-col items-center pb-4">
                  <DonutChart value={66} color="#22c55e" label="66%" />
                  <span className="text-sm font-medium mt-2">Visitors</span>
                  <p className="text-xl font-bold">1,125</p>
                </div>
                <div className="flex-1 flex flex-col items-center">
                  <DonutChart value={33} color="#22c55e" label="33%" />
                  <span className="text-sm font-medium mt-2">Views</span>
                  <p className="text-xl font-bold">200</p>
                </div>
              </div>
            </CardContent>
          </Card>
        <DarkThemeAiChatbot />
      </main>
    </div>
  )
}