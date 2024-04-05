"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Package, ShoppingCart, Users } from "lucide-react";
import { useEffect, useState } from "react";

const navs = [
  {
    id: 1,
    title: "Dashboard",
    slug: "dashboard",
    url: "/dashboard",
    icon: Home,
    children: [],
  },
  {
    id: 2,
    title: "Orders",
    slug: "orders",
    url: "/orders",
    icon: ShoppingCart,
    children: [
      {
        id: 1,
        title: "List",
        slug: "orders",
        url: "/orders",
        children: [],
      },
      {
        id: 2,
        title: "Add Order",
        slug: "add-order",
        url: "/orders/add-order",
        children: [],
      },
    ],
  },
  {
    id: 3,
    title: "Products",
    slug: "products",
    url: "/products",
    icon: Package,
    children: [
      {
        id: 1,
        title: "List",
        slug: "products",
        url: "/products",
        children: [],
      },
      {
        id: 2,
        title: "Add Product",
        slug: "add-product",
        url: "/products/add-product",
        children: [],
      },
    ],
  },
  {
    id: 4,
    title: "Customers",
    slug: "customers",
    url: "/customers",
    icon: Users,
    children: [
      {
        id: 1,
        title: "List",
        slug: "customers",
        url: "/customers",
        children: [],
      },
      {
        id: 2,
        title: "Add Customer",
        slug: "add-customer",
        url: "/customers/add-customer",
        children: [],
      },
    ],
  },
];
export default function SidebarNav() {
  const pathname = usePathname();
  const isActive = (navUrl: string) => pathname === navUrl;
  const hasActiveChild = (children: any) =>
    children.some((child: any) => isActive(child.url));
  const [activeSlug, setActiveSlug] = useState<string>("");

  useEffect(() => {
    const activeNav =
      navs.find(({ url }) => isActive(url)) ||
      navs.find(({ children }) => hasActiveChild(children));
    if (activeNav) {
      setActiveSlug(activeNav.slug);
    }
  }, [pathname]);

  return (
    <div className="h-full w-full">
      <Accordion
        type="single"
        collapsible
        value={activeSlug}
        onValueChange={(value) => setActiveSlug(value)}
      >
        {navs.map(({ id, title, url, icon: Icon, children, slug }) => {
          const active = isActive(url) || hasActiveChild(children);
          return children.length > 0 ? (
            <AccordionItem key={id} value={slug} className="border-transparent">
              <AccordionTrigger
                className={cn([
                  "text-muted-foreground hover:no-underline",
                  active && "text-primary",
                ])}
              >
                <div className="flex items-center gap-3">
                  {Icon && <Icon className="h-4 w-4" />}
                  {title}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                  {children.map(
                    ({ id: childId, title: childTitle, url: childUrl }) => (
                      <Link
                        key={childId}
                        href={childUrl}
                        className={cn([
                          "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                          isActive(childUrl) && "text-primary",
                        ])}
                      >
                        {childTitle}
                      </Link>
                    ),
                  )}
                </nav>
              </AccordionContent>
            </AccordionItem>
          ) : (
            <Link
              key={id}
              href={url}
              className="flex flex-1 items-center justify-between py-4 font-medium"
            >
              <div
                className={cn([
                  "flex items-center gap-3 text-muted-foreground",
                  active && "text-primary",
                ])}
              >
                {Icon && <Icon className="h-4 w-4" />}
                {title}
              </div>
            </Link>
          );
        })}
      </Accordion>
    </div>
  );
}
