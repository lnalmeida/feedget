import { CloseButton } from "../CloseButton";

import bugImageUrl from '../../assets/bug.svg'
import ideaImageUrl from '../../assets/idea.svg'
import thoughtImageUrl from '../../assets/thought.svg'
import { useState } from "react";
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";
import { FeedbackContentStep } from './Steps/FeddbackContentStep';
import { FeedbackSuccessStep } from './Steps/FeedbackSuccessStep';


export const feedbackTypes = {
    BUG: {
        title: "Problema",
        img: {
            src: bugImageUrl,
            alt: 'Imagem, de um inseto',
        }
    },
    IDEA: {
        title: "Ideia",
        img: {
            src: ideaImageUrl,
            alt: 'Imagem de uma lâmpada',
        }
    },
    OTHER: {
        title: "Outro",
        img: {
            src: thoughtImageUrl,
            alt: 'Imagem de uma nuvem de pensamento',
        }
    },
}

export type FeedbackType = keyof typeof feedbackTypes;

export function WidgetForm(){

    const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
    const [feedbackSent, setFeedbackSent] = useState(false);

    function handleRestartFeddback() {
        setFeedbackSent(false);
        setFeedbackType(null);
    }
    
    return (
        <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">

            {feedbackSent ? (
                <FeedbackSuccessStep onRestartFeedback={handleRestartFeddback} />
            ) : (
                <>
                {!feedbackType ? (   
                <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
            ) : (
                <FeedbackContentStep 
                feedbackType={feedbackType} 
                onRestartFeedback={handleRestartFeddback} 
                onFeedbackSent={() => setFeedbackSent(true)}
                />
            )}
                </>
            )}

            <footer className="text-xs text-neutral-400">
                Criado na NLW -Return por <a className="underline underline-offset-2 hover:text-neutral-200" href="https://github.com/lnalmeida/feedget" target="_blank">Luiz Júnior</a>.
            </footer>
        </div>
    )
}