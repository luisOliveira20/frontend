/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useState } from "react";

export const usePostData = (url = "", pageSize, current) => {
    const [isError, setError] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [data, setData] = useState({
        data: [],
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });
    const addData = (data) => {
        setLoading(true);
        fetch(`/${url}`, {
            headers: {
                "Content-type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(data),
        })
        .then((response) => {
            if(response.ok) {
                setData(response.json());
                alert('Pedido Efetuado com sucesso');
            } else {
                alert('Error ao adicionar');
            }
        })
    }

    const fetchingData = () => {
        const querie =
            `/${url}?` +
            new URLSearchParams({
                limit: pageSize,
                skip: current - 1,
            });

            setLoading(true);

            fetch(querie, {
                headers: {Accept: "application/json"},
            })
            .then((response) => response.json())
            .then((response) => {
                const {data = [], pagination} = response;
                const auth = response.auth;

                if(auth){
                    setData({
                        data: data,
                        pagination: {
                            current: current || 1,
                            pageSize: pagination.pageSize || 10,
                            total: pagination.total || 5,
                        },
                    });
                }
            })
            .catch((error) => {
                console.error("Error ", error);
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            });
    };
    useEffect(() => {
        fetchingData();
    }, [fetchingData]);
    return {
        data,
        isError,
        isLoading,
        load: fetchingData,
    };
};