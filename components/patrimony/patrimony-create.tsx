
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

import { url } from "@/lib/api-url";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const formSchema = z.object({
    nom: z.string(),
    t: z.string(),
});

export default function CreatePatrimony() {
    const {data:session}=useSession()
    const [isLoading,setIsLoading]=useState(false)

    const router=useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nom: "",
            t: new Date().toISOString(),
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        
        try {
            // Example: Sending data to an API endpoint
            setIsLoading(true)
            const response = await fetch(`${url}/patrimoines?email=${session?.user?.email}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

    
            const data = await response.json();
            router.push(`/patrimoine/create/possession`);
            console.log('Login successful:', data);
            setIsLoading(false)
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
                <div className="my-8 text-center">
                    <h1 className="text-2xl font-bold text-[#161747]">Veuillez créer votre patrimoine</h1>
                </div>

                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-6"
                        >
                            <FormField
                                control={form.control}
                                name="nom"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>nom</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="nom patrimmoine"
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
                                            <Input type="date" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button className="w-full bg-[#0E0F2F]" type="submit">
                                {isLoading?<p className="animate-spin rounded-full h-7 w-6 border-t-4 border-b-2 border-white"></p>:"connexion"}
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
}

