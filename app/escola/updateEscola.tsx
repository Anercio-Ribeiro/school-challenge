import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Select from "react-select";
import provinces from '@/app/data/province.json';
import { AiOutlineEdit } from "react-icons/ai";
import { IoCloseCircleOutline } from "react-icons/io5";

type Escola = {
    id: number;
    nome: string;
    email: string;
    provincia: string;
    numeroDeSala: number;
}

type UpdateEscolaProps = {
    id: number;
    nome: string;
    email: string;
    provincia: string;
    numeroDeSala: number;
    refreshData: () => void;
}

export default function UpdateEscola({ id, nome: initialNome, email: initialEmail, provincia: initialProvincia, numeroDeSala: initialNumeroDeSala, refreshData }: UpdateEscolaProps) {
    const [nome, setNome] = useState<string>(initialNome);
    const [email, setEmail] = useState<string>(initialEmail);
    const [provincia, setProvincia] = useState<string>(initialProvincia);
    const [numeroDeSala, setNumeroDeSala] = useState<number>(initialNumeroDeSala);
    const [modal, setModal] = useState<boolean>(false);
    const [isMutating, setIsMutating] = useState<boolean>(false);
    const router = useRouter();

    async function handleUpdate(e: SyntheticEvent) {
        e.preventDefault();
        setIsMutating(true);
        await fetch(`api/update/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: nome,
                email: email,
                provincia: provincia,
                numeroDeSala: numeroDeSala
            })
        });
        setIsMutating(false);
        refreshData();
        setModal(false);
    }

    function handleChange() {
        setModal(!modal);
    }

    return (
        <div>
            <button className="btn btn-info btn-sm" onClick={handleChange}><AiOutlineEdit className="fill-white" size={16} /></button>
            <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Editar {nome}</h3>
                    <form onSubmit={handleUpdate}>
                        <div className="form-control">
                            <label className="label font-bold">Nome da escola</label>
                            <input type="text" className="input w-full input-bordered" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome da escola" />
                        </div>

                        <div className="form-control">
                            <label className="label font-bold">Email</label>
                            <input type="text" className="input w-full input-bordered" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
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
                            <input type="text" className="input w-full input-bordered" value={numeroDeSala} onChange={(e) => setNumeroDeSala(parseInt(e.target.value))} placeholder="Número de salas" />
                        </div>
                        <div className="modal-action">
                            <button type="button" onClick={handleChange} className="btn"><IoCloseCircleOutline size={16} /> Fechar</button>
                            {
                                !isMutating ? (
                                    <button type="submit" className="btn btn-primary"><AiOutlineEdit size={16} /> Editar</button>
                                ) : (
                                    <button type="button" className="btn loading">Atualizando...</button>
                                )
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
