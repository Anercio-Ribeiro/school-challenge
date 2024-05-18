"use client"
import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import AddEscola from "./addEscola";
import ExcelPage from "./addFileUpload";
import UpdateEscola from "./updateEscola";
import DeleteEscola from "./deleteEscola";

type Escola = {
    id: number;
    nome: string;
    email: string;
    provincia: string;
    numeroDeSala: number;
}

export async function fetchEscolas(page: number, pageSize: number): Promise<{ escolas: Escola[], totalEscolas: number }> {
    const res = await fetch(`/api/getAll?page=${page}&pageSize=${pageSize}`);
    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }
    return res.json();
}

const Spinner = () => (
    <div className="flex justify-center items-center py-10">
        <div className="loader border-t-4 border-b-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
    </div>
);

export default function EscolaList() {
    const [escolas, setEscolas] = useState<Escola[]>([]);
    const [pageCount, setPageCount] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(true);
    const pageSize = 10;

    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage]);

    const fetchData = async (page: number) => {
        setLoading(true);
        try {
            const { escolas, totalEscolas } = await fetchEscolas(page, pageSize);
            setEscolas(escolas);
            setPageCount(Math.ceil(totalEscolas / pageSize));
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handlePageClick = (data: { selected: number }) => {
        const selectedPage = data.selected + 1;
        setCurrentPage(selectedPage);
    };

    const refreshData = () => {
        fetchData(currentPage);
    };

    return (
        <div className="container mx-auto">
            <div className="my-10 mx-10">
                <div className="flex justify-between items-center py-2">
                    <AddEscola refreshData={refreshData} />
                    <ExcelPage refreshData={refreshData}/>
                </div>
                {loading ? (
                    <Spinner />
                ) : (
                    <>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Nome da escola</th>
                                    <th>Email</th>
                                    <th>Número de salas</th>
                                    <th>Província</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {escolas.map((escola, index) => (
                                    <tr key={escola.id}>
                                        <td>{(currentPage - 1) * pageSize + index + 1}</td>
                                        <td>{escola.nome}</td>
                                        <td>{escola.email}</td>
                                        <td>{escola.numeroDeSala}</td>
                                        <td>{escola.provincia}</td>
                                        <td className="flex gap-4">
                                            <UpdateEscola {...escola} refreshData={refreshData} />
                                            <DeleteEscola {...escola} refreshData={refreshData} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <ReactPaginate
                            previousLabel={"anterior"}
                            nextLabel={"próximo"}
                            breakLabel={"..."}
                            pageCount={pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={handlePageClick}
                            containerClassName={"flex items-center space-x-2"}
                            activeClassName={"bg-blue-600 text-white"}
                            pageClassName={"bg-white border border-gray-300 rounded px-3 py-1"}
                            previousClassName={"bg-white border border-gray-300 rounded px-3 py-1"}
                            nextClassName={"bg-white border border-gray-300 rounded px-3 py-1"}
                            breakClassName={"bg-white border border-gray-300 rounded px-3 py-1"}
                            disabledClassName={"text-gray-400 cursor-not-allowed"}
                        />
                    </>
                )}
            </div>
        </div>
    );
}