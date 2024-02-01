'use client'
import Image from "next/image";
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";


const formSchema = z.object({
  username: z.string().min(4, "email must be at least 4 characters."),
  password: z.string().min(1)
})

export default function Home() {
  const loginForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    }
  })

  async function onLoginSubmit(values: z.infer<typeof formSchema>) {
    console.log("values", values)
    fetch("api/authentication", {
      method: "POST",
      body: JSON.stringify(loginForm.getValues())
    })
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Card>
        <CardHeader>
          <CardTitle>VRC Keycard</CardTitle>
          <CardDescription>Please log into your account!</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...loginForm}>
            <form onSubmit={loginForm.handleSubmit(onLoginSubmit)}>
              <FormField
                control={loginForm.control}
                name="username"
                render={({ field }) => (
                  <FormItem >
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="john.doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>

                )} />
              <FormField
                control={loginForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="password" type="password"  {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>

                )} />
              <Button variant="default" type="submit">Log in</Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>

        </CardFooter>
      </Card>

    </main>
  );
}
