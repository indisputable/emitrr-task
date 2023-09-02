"use client"
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { QuizWithQuestions } from "@/lib/quiz";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useEffect } from "react";


export default function QuizForm({ quiz }: { quiz: QuizWithQuestions }) {
    const formObj: any = {}
    useEffect(() => {
        quiz?.questions.forEach(q => {
            formObj[q.id.toString()] = z.enum(q.options.map(op => op.id.toString()))
        })
    }, [quiz])
    const FormSchema = z.object(formObj)
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log(data)
    }
    return <div className='mt-10 flex gap-5 flex-wrap'>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                {quiz?.questions.map(question => <FormField
                    control={form.control}
                    name={question.id.toString()}
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                            <FormLabel>{question.text}</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex flex-col space-y-1"
                                >
                                    {question.options.map(option => <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value={option.id.toString()} />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            {option.text}
                                        </FormLabel>
                                    </FormItem>)}
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />)}
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    </div>
}
