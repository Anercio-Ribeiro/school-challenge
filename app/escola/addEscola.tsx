"use client"

import { SyntheticEvent, useState } from "react"
import { useRouter } from "next/navigation";
import provinces from '@/app/data/province.json';
import Select from "react-select";
import { IoIosSave } from "react-icons/io";
import { FaFileCirclePlus } from "react-icons/fa6";
import { IoCloseCircleOutline } from "react-icons/io5";

type AddEscolaProps = {
    refreshData: () => void;
};


export default function AddEscola({ refreshData }: AddEscolaProps) {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [provincia, setProvincia] = useState("");
    const [numeroDeSala, setNumeroDeSala] = useState("");
    const [modal, setModal] = useState(false);
    const [isMutating, setIsMutating] = useState(false);
    const router = useRouter();

    async function handleSubmit(e: SyntheticEvent) {
        e.preventDefault();
        setIsMutating(true);
        const response = await fetch('/api/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: nome,
                email: email,
                provincia: provincia,
                numeroDeSala: parseInt(numeroDeSala)
            })
        })
        if (response.ok) {
            setIsMutating(false);
            setNome("");
            setEmail("");
            setProvincia("");
            setNumeroDeSala("");
            refreshData();
            setModal(false);
        }
    }

    function handleChange() {
        setModal(!modal);
    }

    return (
        <div>
            <button className="btn" onClick={handleChange}><FaFileCirclePlus size={16} /> Adicionar nova escola</button>
            <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Adicionar nova escola</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label className="label font-bold">Nome da escola</label>
                            <input type="text" className="input w-full input-bordered" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome da escola" />
                        </div>

                        <div className="form-control">
                            <label className="label font-bold">Email</label>
                            <input type="text" className="input w-full input-bordered" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email da escola" />
                        </div>

                        <div className="form-control">
                            <label className="label font-bold">Província</label>
                            <Select
                                options={provinces["Angola"]["Provincias"].map((province) => ({
                                    value: province.nome,
                                    label: province.nome
                                }))}
                                value={{ value: provincia, label: provincia }}
                                onChange={(selectedOption) => {
                                    if (selectedOption) {
                                        setProvincia(selectedOption.value);
                                    }
                                }}
                                placeholder="Selecione a província"
                                isSearchable
                            />
                        </div>

                        <div className="form-control">
                            <label className="label font-bold">Número de sala</label>
                            <input type="text" className="input w-full input-bordered" value={numeroDeSala} onChange={(e) => setNumeroDeSala(e.target.value)} placeholder="Quantas salas tem a escola" />
                        </div>
                        <div className="modal-action">
                            <button type="button" onClick={handleChange} className="btn"><IoCloseCircleOutline size={16} /> Fechar</button>
                            {
                                !isMutating ? (
                                    <button type="submit" className="btn btn-primary"><IoIosSave size={16} /> Salvar</button>
                                ) : (
                                    <button type="button" className="btn loading">Salvando...</button>
                                )
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
