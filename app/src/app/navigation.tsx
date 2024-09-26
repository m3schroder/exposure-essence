"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"


const galleries: { title: string; href: string; description: string }[] =
	[
		{
			"title": "Individual",
			"href": "#",
			"description": "Individual Portraits, Headshots, Graduate Session",
		},
		{
			"title": "Family/Lifestyle",
			"href": "#",
			"description": "Family Photos, Lifestyle Session, Maternity",
		},
		{
			"title": "Weddings/Engagements",
			"href": "#",
			"description": "Engagement, Weddings, Add-ons",
		},
		{
			"title": "Commercial",
			"href": "#",
			"description": "Social Media, Content Production, Consulting"
		}
	]


const services: { title: string; href: string; description: string }[] =
	[
		{
			"title": "Individual",
			"href": "#",
			"description": "Individual Portraits, Headshots, Graduate Session",
		},
		{
			"title": "Family/Lifestyle",
			"href": "#",
			"description": "Family Photos, Lifestyle Session, Maternity",
		},
		{
			"title": "Weddings/Engagements",
			"href": "#",
			"description": "Engagement, Weddings, Add-ons",
		},
		{
			"title": "Commercial",
			"href": "#",
			"description": "Social Media, Content Production, Consulting"
		}
	]

const team: { title: string; href: string; description: string }[] = [
	{
		title: "Josh",
		href: "/",
		description:
			"Owner, Photographer, Videographer",
	},

	{
		title: "Email",
		href: "#",
		description:
			"Photographer",
	},
	{
		title: "Chase",
		href: "#",
		description: "Content Production",
	},
	{
		title: "Rachel",
		href: "#",
		description:
			"Operations / Management",
	},
]

export function Navigation() {
	return (
		<NavigationMenu className="h-12 mx-auto mt-10" orientation="vertical">
			<NavigationMenuList>
				<NavigationMenuItem>
					<NavigationMenuTrigger>The Team</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
							<li className="row-span-3">
								<NavigationMenuLink asChild>
									<a
										className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
										href="/"
									>
										<div className="mb-2 mt-4 text-lg font-medium">
											shadcn/ui
										</div>
										<p className="text-sm leading-tight text-muted-foreground">
											Beautifully designed components that you can copy and
											paste into your apps. Accessible. Customizable. Open
											Source.
										</p>
									</a>
								</NavigationMenuLink>
							</li>

							{team.map((component) => (
								<ListItem
									key={component.title}
									title={component.title}
									href={component.href}
								>
									{component.description}
								</ListItem>
							))}
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem></NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuTrigger>Services</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
							{services.map((component) => (
								<ListItem
									key={component.title}
									title={component.title}
									href={component.href}
								>
									{component.description}
								</ListItem>
							))}
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuTrigger>Galleries</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
							{galleries.map((component) => (
								<ListItem
									key={component.title}
									title={component.title}
									href={component.href}
								>
									{component.description}
								</ListItem>
							))}
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>

			</NavigationMenuList>
		</NavigationMenu>
	)
}

const ListItem = React.forwardRef<
	React.ElementRef<"a">,
	React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
	return (
		<li>
			<NavigationMenuLink asChild>
				<a
					ref={ref}
					className={cn(
						"block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
						className
					)}
					{...props}
				>
					<div className="text-sm font-medium leading-none">{title}</div>
					<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
						{children}
					</p>
				</a>
			</NavigationMenuLink>
		</li>
	)
})
ListItem.displayName = "ListItem"
