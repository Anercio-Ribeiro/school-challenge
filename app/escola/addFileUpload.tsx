import { SyntheticEvent, useState } from 'react';
import * as XLSX from "xlsx";
import { useRouter } from 'next/navigation';
import { FaFileCirclePlus } from 'react-icons/fa6';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { IoIosSave } from 'react-icons/io';
import { SiMicrosoftexcel } from 'react-icons/si';

export interface ExcelData {
  nome: string;
  email: string;
  provincia: string;
  numeroDeSala: number;
}

interface ExcelPageProps {
  refreshData: () => void;
}

const ExcelPage = ({ refreshData }: ExcelPageProps) => {
  const [items, setItems] = useState<ExcelData[]>([]);
  const [modal, setModal] = useState(false);
  const router = useRouter();

  const readExcel = (file: File) => {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);

    fileReader.onload = (e: ProgressEvent<FileReader>) => {
      const bufferArray = e.target?.result as ArrayBuffer;

      const wb = XLSX.read(bufferArray, { type: "buffer" });

      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json<ExcelData>(ws);

      console.log(data);

      setItems(data);
      saveDataToServer(data); 
    };

    fileReader.onerror = (error) => {
      console.error('Error reading file:', error);
    };
  };

  const saveDataToServer = async (data: ExcelData[]) => {
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }), // Ensure data is sent as an object with 'data' key
      });

      if (response.ok) {
        refreshData(); // Refresh the DataTable
        setModal(false);
        console.log('Data saved successfully');
      } else {
        console.error('Failed to save data:', response.statusText);
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const handleChange = () => {
    setModal(!modal);
  };

  return (
    <div>
      <button className="btn" onClick={handleChange}><SiMicrosoftexcel size={16}/>Upload de ficheiro excel</button>
      <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle" />
      {modal && (
        <div className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Adicionar nova escola</h3>
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                type="file"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    readExcel(file);
                  }
                }}
              />
            </form>
            <div className="modal-action">
                        <button type="button" onClick={handleChange} className="btn"><IoCloseCircleOutline size={16} />Fechar</button>
                       
                    </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExcelPage;
