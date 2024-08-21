import axios from "axios";
import { useEffect, useState } from "react";

function formatDateToIST(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };

    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-IN', options).format(date);
}

function useFetchData<T>(url: string, pageSize: number) {
    const [info, setInfo] = useState<T[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [totalPages, setTotalPages] = useState<number>(0);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`${url}?page=${page}`);
                const filteredResults = res.data.results.map((item: any) => {
                    const fileteredItem = Object.fromEntries(
                        Object.entries(item).filter(([key, value]) => typeof value === "string" && !value.startsWith("http"))
                    );
                    Object.keys(fileteredItem).forEach(key => {
                        if(key.toLowerCase().includes("created") || key.toLowerCase().includes("edited")) {
                            fileteredItem[key] = formatDateToIST(fileteredItem[key]);
                        }
                    });
                    return fileteredItem;
                });
                setInfo(filteredResults);
                
                const totalRecords = res.data.count;
                setTotalPages(Math.ceil(totalRecords / pageSize));
          
                setHasNextPage(res.data.next != null);
            } catch(err) {
                console.error("Error in fetching the data", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [url, page, pageSize]);

    const handleNextPage = () => setPage(prevPage => prevPage + 1);
    const handlePreviousPage = () => setPage(prevPage => (prevPage > 1 ? prevPage - 1 : 1));

    return {info, loading, page, totalPages, hasNextPage, handleNextPage, handlePreviousPage };
};

export default useFetchData;