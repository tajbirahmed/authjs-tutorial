"use client";
import * as z from "zod"; 
import { useForm } from 'react-hook-form'; 
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchema } from "@/schemas";
import { 
  Form, 
  FormItem, 
  FormControl, 
  FormField, 
  FormLabel, 
  FormMessage, 
} from "@/components/ui/form"
import { useState, useTransition } from "react";

import CardWrapper from '@/components/auth/CardWrapper'; 
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/FormError";
import { FormSuccess } from "@/components/FormSuccess";
import { register } from "@/actions/register";

export const RegisterForm = () => {
  const [isPending, startTransition] = useTransition(); 
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema), 
    defaultValues: {
      email: "", 
      password: "", 
      name: "",
    }
  })
  const onSubmit = (value: z.infer<typeof RegisterSchema>) => { 
    setError(undefined)
    setSuccess(undefined)
    startTransition(() => {
      register(value)
        .then((data) => {
          setError(data.error)
          setSuccess(data.success)
        });
    })
  }
  return (
      <CardWrapper
          headerLabel='Create an Account'
          backButtonLabel="Already have an account?"
          backButtonHref='/auth/login'
          showSocial={ true }
      >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              disabled={isPending}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="John Doe"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              disabled={ isPending }
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="john.doe@example.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              disabled={isPending}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="******"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={ error } />
          <FormSuccess message={ success } />
          <Button
            disabled={isPending}
            type="submit"
            className="w-full"
          >
                Create An Account
          </Button>
        </form>
        </Form>
    </CardWrapper>
  )
}
