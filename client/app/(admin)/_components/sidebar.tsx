import { SidebarContent, Sidebar, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar'

import { MdPayments, MdComment } from "react-icons/md";

import { PiShoppingBagFill } from "react-icons/pi";
import { IoStorefront,IoAnalytics } from "react-icons/io5";
import { BsFillCapslockFill, BsFillPersonFill } from "react-icons/bs";



const items = [
  {
    title: "Analysis",
    url: "/dashboard",
    icon: IoAnalytics,
  },
  {
    title: "Products",
    url: "/dashboard/products",
    icon: BsFillCapslockFill,
  },
  {
    title: "Store",
    url: "/dashboard/store",
    icon: IoStorefront,
  },
  {
    title: "Orders",
    url: "/dashboard/orders",
    icon: PiShoppingBagFill,
  },
  {
    title: "Profile",
    url: "/dashboard/profile",
    icon: BsFillPersonFill,
  },
  {
    title: "Payments",
    url: "/dashboard/payments",
    icon: MdPayments,
  },
    {
    title: "Reviews",
    url: "/dashboard/reviews",
    icon: MdComment,
  },
]

function DahboardSidebar() {
  return (
    <div>
     <Sidebar>
     <SidebarContent>
        <SidebarGroup>
        <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
        <SidebarContent>
        <SidebarGroupContent>
            <SidebarMenu>
                  {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
        </SidebarGroupContent>
        </SidebarContent>
        </SidebarGroup>
     </SidebarContent>
     </Sidebar>
        
    </div>
  )
}

export default DahboardSidebar