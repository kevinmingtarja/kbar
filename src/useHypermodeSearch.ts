import { useEffect, useState } from "react";
import { useKBar } from "./useKBar";


export default function useHypermodeSearch(): string[] {
    const {search} = useKBar((state) => ({
        search: state.searchQuery,
    }));
    const [data, setData] = useState([]);
    useEffect(() => {
        if (!search) {
            setData([]);
            return;
        }
        const fn = async () => {
            try {
                const response = await fetch("http://localhost:8686/graphql", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    query: `query Echo {
                    echo(text: "${search}")
                    }`
                })
                });
                
                const data = await response.json();
                console.log(data)
                setData([data.data.echo]);
            } catch (error) {
                console.error('Error:', error);
            }
        }
        fn()
    }, [search]);
    return data
}
