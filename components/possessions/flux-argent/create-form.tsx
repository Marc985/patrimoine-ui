
"use client"
import z, { number } from "zod";
import { ErrorOption, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import { useRouter } from "next/navigation";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { url } from "@/lib/api-url";
import { useSession } from "next-auth/react";
import { useState } from "react";


import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

const formSchema = z.object({
    nom: z.string(),
    debut: z.string(),
    fin:z.string(),

    fluxMensuel: z.string().transform((val) => Number(val)),
    dateOperation:z.string().transform((val) => Number(val)),
    devise:z.string(),
    type:z.string()
});


export default function CreateMaterialForm() {
    const [isLoading,setIsLoading]=useState(false)

    const {data:session}=useSession()

    const router=useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nom: "",
            debut: "",
            fin:"",
            fluxMensuel: 0,
            dateOperation:0,
            devise:"",
            type:""
         
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        
        try {
            setIsLoading(true)

            // Récupération du type
                const { type, ...restValues } = values; // 'restValues' contient tout sauf 'type'

                // Ajuster la valeur de fluxMensuel
                if (type === "revenu") {
                    restValues.fluxMensuel = restValues.fluxMensuel;
                } else {
                    restValues.fluxMensuel = -restValues.fluxMensuel;
                }
                            
            const response = await fetch(`${url}/patrimoines/patrimoine/possessions/materiel?email=${session?.user?.email}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(restValues),
            });
    
            console.log("io ny url ",url);
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            router.push(`/dashboard/possessions`);
            setIsLoading(false)

            const data = await response.json();
            console.log('Login successful:', data);
            // Handle successful login (e.g., redirect, show success message)
        } catch (error) {
            console.error('Error submitting form:', error);
            // Handle error (e.g., show error message)
        }
    }

    return (
        <div className="container ">
            <div className="flex h-full flex-grow items-center justify-center">
                <div className="mx-auto w-full max-w-[375px]">
                   
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-6 flex-col gap-1"
                        >
                            <FormField
                                control={form.control}
                                name="type"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>type</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="devise" />
                                        </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                        <SelectItem value="revenu">revenu</SelectItem>
                                        <SelectItem value="depense">depense</SelectItem>
                                        </SelectContent>
                                    </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="nom"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>name</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="nom"
                                                placeholder="nom possession"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="debut"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>debut</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="date"
                                                placeholder="debut"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             

                            <FormField
                                control={form.control}
                                name="fin"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>fin</FormLabel>
                                        <FormControl>
                                            <Input type="date" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="devise"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>devise</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="devise" />
                                        </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                        <SelectItem value="MGA">MGA</SelectItem>
                                        <SelectItem value="EUR">EUR</SelectItem>
                                        <SelectItem value="CAD">CAD</SelectItem>
                                        </SelectContent>
                                    </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            
                              <FormField
                                control={form.control}
                                name="fluxMensuel"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>flux mensuel</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                              <FormField
                                control={form.control}
                                name="dateOperation"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>date d operation</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             
                             <Button className="w-full bg-[#0E0F2F]" type="submit">
                                {isLoading?<p className="animate-spin rounded-full h-7 w-6 border-t-4 border-b-2 border-white"></p>:"envoyer"}
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
}

