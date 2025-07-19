// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { createPageUrl } from '@/utils';
// import { Home, Soup, Heart, User, PlusCircle, Bell, Settings } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { User as UserSDK } from '@/entities/User';

// const navItems = [
//     { name: 'Dashboard', icon: Home, page: 'Dashboard' },
//     { name: 'Discover', icon: Soup, page: 'Discover' },
//     { name: 'Saved Recipes', icon: Heart, page: 'Saved' },
//     { name: 'Profile', icon: User, page: 'Profile' },
// ];

// export default function Layout({ children, currentPageName }) {
//     const location = useLocation();
//     const [user, setUser] = React.useState(null);

//     React.useEffect(() => {
//         UserSDK.me().then(setUser).catch(() => setUser(null));
//     }, []);

//     return (
//         <div className="min-h-screen w-full bg-sky-50 font-sans">
//             <style jsx global>{`
//                 :root {
//                     --background: 240 249 255;
//                     --foreground: 12 74 110;
//                     --card: 255 255 255;
//                     --card-foreground: 12 74 110;
//                     --popover: 255 255 255;
//                     --popover-foreground: 12 74 110;
//                     --primary: 46 139 192; /* Main blue */
//                     --primary-foreground: 240 249 255;
//                     --secondary: 224 242 254;
//                     --secondary-foreground: 12 45 72;
//                     --muted: 224 242 254;
//                     --muted-foreground: 117 211 252;
//                     --accent: 56 189 248;
//                     --accent-foreground: 12 45 72;
//                     --destructive: 239 68 68;
//                     --destructive-foreground: 248 250 252;
//                     --border: 186 230 253;
//                     --input: 186 230 253;
//                     --ring: 46 139 192;
//                     --radius: 0.75rem;
//                 }
//                 body {
//                     background-color: #f0f9ff;
//                 }
//             `}</style>
//             <div className="flex">
//                 {/* Sidebar */}
//                 <aside className="w-64 bg-white border-r border-sky-200 p-6 flex-col hidden md:flex shadow-sm">
//                     <Link to={createPageUrl('Dashboard')} className="flex items-center gap-2 mb-10">
//                         <Soup className="h-8 w-8 text-sky-600" />
//                         <span className="text-2xl font-bold text-sky-800">KenyanChefs</span>
//                     </Link>

//                     <nav className="flex flex-col gap-2 flex-grow">
//                         {navItems.map((item) => {
//                             const isActive = currentPageName === item.page;
//                             return (
//                                 <Link
//                                     key={item.name}
//                                     to={createPageUrl(item.page)}
//                                     className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
//                                         isActive
//                                             ? 'bg-sky-500/10 text-sky-600 font-semibold'
//                                             : 'text-sky-700/70 hover:bg-sky-100 hover:text-sky-700'
//                                     }`}
//                                 >
//                                     <item.icon className="h-5 w-5" />
//                                     <span>{item.name}</span>
//                                 </Link>
//                             );
//                         })}
//                     </nav>

//                     <Button className="w-full bg-sky-600 hover:bg-sky-700 text-white">
//                         <PlusCircle className="mr-2 h-5 w-5" />
//                         Create Recipe
//                     </Button>
//                 </aside>

//                 {/* Main Content */}
//                 <main className="flex-1">
//                     <header className="bg-white/80 backdrop-blur-sm border-b border-sky-200 px-8 py-4 flex justify-between items-center sticky top-0 z-10">
//                         <div>
//                             {/* Search bar can go here */}
//                         </div>
//                         <div className="flex items-center gap-4">
//                             <Button variant="ghost" size="icon">
//                                 <Bell className="h-5 w-5 text-sky-500" />
//                             </Button>
//                             <Button variant="ghost" size="icon">
//                                 <Settings className="h-5 w-5 text-sky-500" />
//                             </Button>
//                              {user && (
//                                 <Avatar>
//                                     <AvatarImage src={user.profile?.avatar} alt={user.full_name} />
//                                     <AvatarFallback className="bg-sky-500 text-white">{user.full_name?.[0].toUpperCase()}</AvatarFallback>
//                                 </Avatar>
//                             )}
//                         </div>
//                     </header>
//                     <div className="p-4 sm:p-6 lg:p-8">
//                         {children}
//                     </div>
//                 </main>
//             </div>
//         </div>
//     );
// }
