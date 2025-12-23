import { SidebarContent, Sidebar, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar'
import { Calendar, Home, Inbox, Search, Settings } from 'lucide-react'
import React from 'react'


const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "/dashboard/products",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "/dashboard/store",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
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