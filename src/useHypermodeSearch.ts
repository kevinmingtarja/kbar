import { useEffect, useState } from "react";
import { useKBar } from "./useKBar";
import { ActionImpl } from "./action";
import { Action, ActionStore } from "./types";


export default function useHypermodeSearch(endpoint: string, apiKey: string): (string | ActionImpl)[] {
    const {search} = useKBar((state) => ({
        search: state.searchQuery,
    }));
    const [data, setData] = useState<(string | ActionImpl)[]>([]);
    useEffect(() => {
        if (!search) {
            setData([]);
            return;
        }
        const fn = async () => {
            try {
                const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    query: `query SearchDocuments {
    searchDocuments(namespaces: ["hm"], query: ${search}, numResults: 10) {
        status
        error
        objects {
            key
            text
            distance
        }
    }
}
`})
                });
                
                const data = await response.json();
                console.log("data", data);
                if (data.data.searchDocuments.status !== "success") {
                    alert("Error fetching data");
                }
                const actionsStore: ActionStore = {};
                const actions: ActionImpl[] = [];
                let a: Action;
                for (const action of data.data.searchDocuments.objects) {
                    console.log("action", action);
                    a = {
                        id: action.key,
                        name: action.key,
                        subtitle: action.text.substring(0, 50),
                        perform: () => window.open("https://docs.hypermode.com/" + action.key.slice(0, action.key.indexOf('>')).trim() , "_blank"),
                    }
                    const ai = new ActionImpl(a, {store: actionsStore});
                    actionsStore[a.id] = ai;
                    actions.push(ai);
                }
                setData(["Docs", ...actions]);
            } catch (error) {
                console.error('Error:', error);
            }
        }
        fn()
    }, [search]);
    return data
}
