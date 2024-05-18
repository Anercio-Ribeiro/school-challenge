"use client"

import { useState } from "react"
import { useRouter } from "next/navigation";
import { AiOutlineEdit } from "react-icons/ai";
import { CiTrash } from "react-icons/ci";
import { IoCloseCircleOutline } from "react-icons/io5";

type Escola = {
    id: number;
    nome: string;
    email: string;
    provincia: string;
    numeroDeSala: number;
}

export default function DeleteEscola({ id, nome, refreshData }: Escola & { refreshData: () => void }) {
    const [modal, setModal] = useState(false);
    const [isMutating, setIsMutating] = useState(false);
    const router = useRouter();

    async function handleDelete(escolaId: number) {
        setIsMutating(true);
        await fetch(`api/delete/${escolaId}`, {
            method: 'DELETE',
        })
        setIsMutating(false);
        refreshData();
        setModal(false);
    }

    function handleChange() {
        setModal(!modal);
    }

    return (
        <div>
            <button className="btn btn-error btn-sm" onClick={handleChange}><CiTrash className="fill-white" size={16} /> </button>
            <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Remover a escola: {nome}?</h3>
                    <div className="modal-action">
                        <button type="button" onClick={handleChange} className="btn"><IoCloseCircleOutline size={16} />Fechar</button>
                        {
                            !isMutating ? (
                                <button type="button" onClick={() => handleDelete(id)} className="btn btn-error"> <CiTrash size={16} /> Remover</button>
                            ) : (
                                <button type="button" className="btn loading">Salvando...</button>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
