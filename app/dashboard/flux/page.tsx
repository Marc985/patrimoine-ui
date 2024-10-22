import { Calendar, DollarSign, Clock, FileText, TrendingDown } from 'lucide-react';
import { DialogBoilerplate } from "@/components/dialog";

import CreateFuxForm from '@/components/possessions/flux-argent/create-form';

export default function FluxList() {
  const fluxData = [
    {
      nom: "payment_ecolage_hei",
      debut: "2024-10-20",
      fin: "2025-05-25",
      fluxMensuel: -220000,
      dateOperation: 25,
      devise: {
        nom: "ARIARY",
        valeurEnAriary: 1,
        tauxDappréciationAnnuel: 0.0
      },
      valeurComptable: 0
    },
    {
      nom: "revenu_projet_freelance",
      debut: "2024-09-01",
      fin: "2024-09-30",
      fluxMensuel: 500000,
      dateOperation: 10,
      devise: {
        nom: "ARIARY",
        valeurEnAriary: 1,
        tauxDappréciationAnnuel: 0.0
      },
      valeurComptable: 0
    },
    {
      nom: "achat_materiel_bureau",
      debut: "2024-08-01",
      fin: "2024-12-31",
      fluxMensuel: -150000,
      dateOperation: 5,
      devise: {
        nom: "ARIARY",
        valeurEnAriary: 1,
        tauxDappréciationAnnuel: 0.0
      },
      valeurComptable: 0
    }
  ];

  return (
   <div className='bg-gray-50 h-full p-2'>
        <div className='flex justify-end'>
            <DialogBoilerplate title="créer un flux" key={"1"} description=""  triggerText="+ créer flux">
                <CreateFuxForm />
            </DialogBoilerplate>
        </div>

        <div className="grid grid-cols-3 gap-6 pt-10">
            {fluxData.map((flux, index) => (
                <FluxCard key={index} flux={flux} />
            ))}
        </div>
   </div>
  );
}
// types.ts
export interface Devise {
    nom: string;
    valeurEnAriary: number;
    tauxDappréciationAnnuel: number;
  }
  
  export interface Flux {
    nom: string;
    debut: string;
    fin: string;
    fluxMensuel: number;
    dateOperation: number;
    devise: Devise;
    valeurComptable: number;
  }
  

function FluxCard({ flux }: { flux: Flux }) {
  return (
    <div className="px-3 py-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      {/* Nom */}
      <div className="flex items-center space-x-2">
        <FileText className="text-[#0E0F2F] " />
        <h2 className="text-xl text-[#0E0F2F]">{flux.nom}</h2>
      </div>

      {/* Dates de début et de fin */}
      <div className="flex space-x-4">
        <div className="flex items-center space-x-2">
          <Calendar className="text-[#0E0F2F]" />
          <span className="text-[#0E0F2F]">Début : {flux.debut}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="text-[#0E0F2F]" />
          <span className="text-[#0E0F2F]">Fin : {flux.fin}</span>
        </div>
      </div>

      {/* Flux Mensuel */}
      <div className="flex items-center space-x-2">
        <DollarSign className={`text-[#0E0F2F] ${flux.fluxMensuel < 0 ? 'text-red-500' : 'text-green-500'}`} />
        <span className={`text-lg ${flux.fluxMensuel < 0 ? 'text-red-500' : 'text-green-500'}`}>
          {flux.fluxMensuel.toLocaleString()} {flux.devise.nom}
        </span>
      </div>

      {/* Date de l'opération */}
      <div className="flex items-center space-x-2">
        <Clock className="text-[#0E0F2F]" />
        <span className="text-[#0E0F2F]">Jour d opération : {flux.dateOperation}</span>
      </div>

      {/* Devise */}
      <div className="flex items-center space-x-2">
        <DollarSign className="text-[#0E0F2F]" />
        <span className="text-[#0E0F2F]">Devise : {flux.devise.nom} </span>
      </div>

      {/* Valeur Comptable */}
      <div className="flex items-center space-x-2">
        <TrendingDown className="text-gray-500" />
        <span className="text-[#0E0F2F]">Valeur Comptable : {flux.valeurComptable}</span>
      </div>
    </div>
  );
}
