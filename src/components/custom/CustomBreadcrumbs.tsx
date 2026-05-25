import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Link } from "react-router"

interface IBreadcrumb {
    name: string,
    url: string
}

interface Props {
    currentPage: string,
    breadcrumbs?: IBreadcrumb[]
}

export const CustomBreadcrumbs = ({ currentPage, breadcrumbs }: Props) => {
    return (
        <Breadcrumb className="my-3">
        <BreadcrumbList>
            {
                breadcrumbs?.map(breadcrumb => (
                    <div key={breadcrumb.name} className="flex items-center gap-2">
                        <BreadcrumbItem>
                            <Link to={breadcrumb.url}>
                                {breadcrumb.name}
                            </Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                    </div>
                ))
            }
            <BreadcrumbItem>
                <Link to='#'>
                    {currentPage}
                </Link>
            </BreadcrumbItem>
        </BreadcrumbList>
        </Breadcrumb>
    )
}