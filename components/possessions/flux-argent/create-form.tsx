
"use client"
import z from "zod";
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




const formSchema = z.object({
    nom: z.string().nonempty(),
    t: z.string(),
    dateOuverture:z.string(),
    valeurComptable: z.number().min(0),
});

export default function CreateMoneyForm() {

    const {data:session}=useSession()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nom: "",
            t: "",
            valeurComptable: 0,
         
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        
        try {
            // Example: Sending data to an API endpoint
            const response = await fetch(`${url}/patrimoines/patrimoine/possessions/materiel?email=${session?.user?.email}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });
    
            console.log("io ny url ",url);
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
            console.log('Login successful:', data);
            // Handle successful login (e.g., redirect, show success message)
        } catch (error) {
            console.error('Error submitting form:', error);
            // Handle error (e.g., show error message)
        }
    }

    return (
        <div className="container h-[calc(100vh-320px)]">
            <div className="flex h-full flex-grow items-center justify-center">
                <div className="mx-auto w-full max-w-[375px]">
                    <div className="my-8">
                        <h1 className="mb-2 text-3xl text-center">patrimoine management</h1>
                    </div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-6 grid grid-cols-2"
                        >
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
                                name="t"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>date</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="date"
                                                placeholder="date"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="dateOuverture"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>date ouverture</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="date"
                                                placeholder="date"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="valeurComptable"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>valeur comptable</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             
                            <Button className="w-full" type="submit">
                                Submit
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
}

