"use client";
import { url } from "@/lib/api-url";
import React, { ChangeEvent, useEffect, useState } from "react";
import { DialogBoilerplate } from "@/components/dialog";
import { useSession } from "next-auth/react";

import CreateMoneyForm from "@/components/possessions/argent/create-form";
interface Devise{
    "nom": string,
    "valeurEnAriary": number,
    "t": string,
    "tauxDappréciationAnnuel": number
}

interface Argent {
    nom: string;
    t:string;
    valeurComptable: number;
    dateOuverture: string;
    devise:Devise;
  
}

const Page: React.FC = () => {
    const [possessions, setPossessions] = useState<Argent[]>([
      
    ]);
    
    const {data:session}=useSession()




   
    
    

    useEffect(()=>{
        const getPossessions=async ()=>{
            try{
                const response=await fetch(`${url}/patrimoines/argents?email=${session?.user?.email}`)
                if(!response.ok){
                    throw new Error("error while fetching data")
                }
                const data=await response.json()
                setPossessions(data)
            }catch(e){
                console.log(e);
                
            }
        }
        if(!session){
            return
        }
        getPossessions()
    },[session])
    return (
<div className="bg-gray-50 h-full">
      
        <div className="mx-4">
            <div className="flex justify-between items-center">
                <div className="font-bold text-[#0E0F2F] text-2xl mt-6">Liste des trésoreries</div>
                <DialogBoilerplate title="" key={"1"} description=""  triggerText="+ ajouter">
                    <CreateMoneyForm/>
                </DialogBoilerplate >
            </div>
            <div className="w-full space-y-4 mt-10">
                {possessions.map((possession, index) => (
                    <PossessionItem possession={possession} key={index} />
                ))}
            </div>

           
        </div>
    </div>
    );
};

const PossessionItem: React.FC<{ possession: Argent }> = ({ possession }) => {
    const {data:session}=useSession()

    /*const deletePossession = async () => {
        try {
            const response = await fetch(`${url}/patrimoines/possessions/${possession.nom}?email=${session?.user?.email}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error("Failed to delete possession");
            }
           
        } catch (error) {
            console.error("Error deleting possession:", error);
        }
    }*/
    return(
        <div key={possession.nom} className="w-full bg-white shadow-lg rounded-lg overflow-hidden p-6 flex flex-row items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">{possession.nom}</h2>
                    <p className="text-gray-700 mt-2">
                        <span className="font-semibold">Valeur Comptable:</span> {possession.valeurComptable.toLocaleString()} 
                    </p>
                    <p className="text-gray-700 mt-2">
                        <span className="font-semibold">Devise:</span> {possession.devise.nom}
                    </p>
                    
                    <p className="text-gray-700 mt-2">
                        <span className="font-semibold">Date dAcquisition:</span> {possession.t}
                    </p>
                        
                    
                </div>
                {
                    /*
                    <div className="">
                    <button onClick={deletePossession} className="text-red-500"><Trash2/></button>
                </div>
                    */
                }
        </div>
    )
}

export default Page;