"use client"
import { Calendar, DollarSign, Clock, FileText, TrendingDown } from 'lucide-react';
import { DialogBoilerplate } from "@/components/dialog";

import CreateFuxForm from '@/components/possessions/flux-argent/create-form';
import { useEffect, useState } from 'react';
import { url } from '@/lib/api-url';
import { useSession } from 'next-auth/react';
import useSWR from 'swr';
import { Loading } from '@/components/loading';
import { jsonFetcher } from '@/lib/fetch-utls';

export default function FluxList() {

  const {data:session}=useSession()

  const {data:fluxData, error,isLoading}=useSWR<Flux[]>(
    session?.user?.email?`${url}/patrimoines/fluxArgents?email=${session?.user?.email}`:
    null,
    jsonFetcher,
    {
      onError: (error) => {
        return (<div>error while fetching data</div>)
      }
    }
  )




  return (
   <div className='bg-gray-50 h-full p-2'>
        <div className='flex justify-end'>
            <DialogBoilerplate title="créer un flux" key={"1"} description=""  triggerText="+ créer flux">
                <CreateFuxForm />
            </DialogBoilerplate>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10">
        {
        isLoading ? 
        (
          <Loading />
        ) : fluxData?.length === 0 ? ( // Utilisez "===" pour comparer
            <div>Pas de flux</div>
        ) : (
            fluxData?.map((flux, index) => (
                <FluxCard key={index} flux={flux} />
            ))
        )
    }
            
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
          {flux.fluxMensuel.toLocaleString()} 
        </span>
      </div>
       {/* Devise */}
       <div className="flex items-center space-x-2">
        <DollarSign className="text-[#0E0F2F]" />
        <span className="text-[#0E0F2F]">Devise : {flux.devise.nom} </span>
      </div>

      {/* Date de l'opération */}
      <div className="flex items-center space-x-2">
        <Clock className="text-[#0E0F2F]" />
        <span className="text-[#0E0F2F]">Jour d opération : {flux.dateOperation}</span>
      </div>

     

     
    </div>
  );
}
