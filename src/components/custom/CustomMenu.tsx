import { Link, useLocation } from 'react-router'
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from '../ui/navigation-menu'
import { cn } from '@/lib/utils';

export const CustomMenu = () => {
    const { pathname } = useLocation();

    const isActivePath = (path: string) => pathname == path ? 'bg-blue-500 text-white' : '';
    const menuItemStyle = 'px-3 py-1 rounded-md';

    return (
        <NavigationMenu className={'py-2'}>
            <NavigationMenuList>

                <NavigationMenuItem className={cn(isActivePath('/'), menuItemStyle)}>
                    <Link to="/">Home</Link>
                </NavigationMenuItem>

                <NavigationMenuItem className={cn(isActivePath('/search'), menuItemStyle)}>
                    <Link to="/search">Search</Link>
                </NavigationMenuItem>

            </NavigationMenuList>
        </NavigationMenu>
    )
}
