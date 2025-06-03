import { useState } from "react"

const useFetch = (cb: (...args: any[]) => Promise<any>) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<object | null>(null);

    const fn = async (...args: any[]) => {
        setLoading(true);
        setError(null);

        try {
            const response = await cb(...args);
            setData(response);
            setError(null);
        } catch (error) {
            setError(error instanceof Object ? error : { message: String(error) });
        } finally {
            setLoading(false);
        }
    };

    return {data, loading, error, fn};
}

export default useFetch;