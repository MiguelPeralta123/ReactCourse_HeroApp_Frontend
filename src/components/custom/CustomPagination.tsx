import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '../ui/button'
import { useSearchParams } from 'react-router'

interface Props {
    pages: number
}

export const CustomPagination = ({ pages }: Props) => {
    const [ searchParams, setSearchParams ] = useSearchParams();
    let currentPage = searchParams.get('page') || 1;
    currentPage = isNaN(+currentPage) ? 1 : +currentPage;

    const handlePageChange = (page: number) => {
        setSearchParams(prev => {
            prev.set('page', `${page}`);
            return prev;
        });
    }

    return (
        <div className="flex items-center justify-center space-x-2">
            <Button
                variant="outline"
                size="sm"
                disabled={currentPage == 1}
                onClick={() => handlePageChange(currentPage - 1)}
            >
                <ChevronLeft className="h-4 w-4" />
                Previous
            </Button>

            {
                Array.from({ length: pages }).map((_, index) => (
                    <Button
                        key={index}
                        variant={currentPage == index + 1 ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </Button>
                ))
            }

            <Button
                variant="outline"
                size="sm"
                disabled={currentPage == pages}
                onClick={() => handlePageChange(currentPage + 1)}
            >
                Next
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
    )
}