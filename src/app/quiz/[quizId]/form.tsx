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


const formObj: any = {}
export default function QuizForm({ quiz }: { quiz: QuizWithQuestions }) {
    useEffect(() => {
        quiz?.questions.forEach(q => {
            formObj[q.id.toString()] = z.enum(q.options.map(op => op.id.toString()))
        })
    }, [quiz])
    const FormSchema = z.object(formObj)
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log(data)
        const res = await fetch(`/api/quiz/submit/${quiz?.id}`, { method: "POST", body: JSON.stringify(data) })
        const resj = await res.json()
        console.log(resj)
    }

    return <div className='mt-10 flex gap-5 flex-wrap w-1/2'>
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 flex flex-col">
                {quiz?.questions.map((question, questionIndex) => {
                    const markedOption = quiz.results.length > 0 && quiz.results?.[0].markedOptions.find(op => op.questionId === question.id) || null
                    return <FormField
                        key={`question-${question.id}`}
                        control={form.control}
                        name={question.id.toString()}
                        render={({ field }) => (
                            <FormItem className="space-y-3 border p-6 rounded">
                                <FormLabel className="flex justify-between"><span>{questionIndex + 1}. {question.text}</span> <span className="text-sm text-zinc-500">{question.difficulty * 10} points</span></FormLabel>
                                <FormControl>
                                    <RadioGroup disabled={quiz.results.length > 0}
                                        onValueChange={field.onChange}
                                        defaultValue={markedOption?.id.toString()}
                                        className="flex flex-col space-y-1"
                                    >
                                        {question.options.map(option => {
                                            return <FormItem key={`option-${option.id}`} className={`flex p-3 rounded border items-center space-x-3 space-y-0 ${option.id === markedOption?.id && markedOption?.correct && `border-green-900 bg-green-200`} ${option.id === markedOption?.id && !markedOption?.correct && `bg-red-500`}`}>
                                                <FormControl>
                                                    <RadioGroupItem value={option.id.toString()} />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    {option.text}
                                                </FormLabel>
                                            </FormItem>
                                        })}
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                })}
                <Button className="w-1/2 mx-auto" type="submit" disabled={quiz?.results?.length! > 0}>Submit</Button>
            </form>
        </Form>
    </div>
}
