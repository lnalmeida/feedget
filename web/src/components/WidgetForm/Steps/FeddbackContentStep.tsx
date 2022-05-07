import { ArrowLeft, Camera } from "phosphor-react";
import { FormEvent, useState } from "react";
import { feedbackTypes } from "..";
import { CloseButton } from "../../CloseButton";
import { FeedbackType } from '../index';
import { ScreenshotButton } from "../ScreenshotButton";

interface FeedbackContentStepProps {
    feedbackType: FeedbackType;
    onRestartFeedback: () => void;
    onFeedbackSent: () => void;
}

export function FeedbackContentStep({ feedbackType, onRestartFeedback, onFeedbackSent }: FeedbackContentStepProps) {
    const feedbackTypeInfo = feedbackTypes[feedbackType];
    const [screenshot, setScreenshot] = useState<string | null>(null);
    const[comment, setComment] = useState("");

    function handleSubmitFeedback (e: FormEvent) {
        e.preventDefault();
        console.log({
            screenshot,
            comment,
        });
        onFeedbackSent();
    }

    function setMessage():string {
        switch (feedbackType) {
            case "BUG":
                return "Conte detalhadademte o problema ocorrido.";
                break;
            case "IDEA":
                return "Conta pra gente a sua ideia!!";
                break;
            case "OTHER":
                return "Deixe aqui sua mensagem!";
                break;
        }
    }

    return(
        <>
        <header>
            <button 
                onClick={onRestartFeedback} 
                type="button" 
                className="absolute top-5 left-5 text-zinc-400 hover:text-zinc-100"
            >
                <ArrowLeft weight="bold" className="w-4 h-4" />
            </button>
            <span className="flex items-center gap-2 text-xl leading-6">
                <img src={feedbackTypeInfo.img.src} alt={feedbackTypeInfo.img.alt} className="w-6 h-6" />
                {feedbackTypeInfo.title}
            </span>
            <CloseButton />
        </header>
       <form onSubmit={handleSubmitFeedback} className="w-full my-4">
            <textarea 
                className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:ring-brand-500 focus:ring-2 resize-none scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
                placeholder={setMessage()}
                onChange={(e) => setComment(e.target.value)}
            />

            <footer className="flex gap-2 mt-2 flex-2">
                <ScreenshotButton 
                screenshot={screenshot}
                onScreenshotTook={setScreenshot} 
                />
                <button
                type="submit"
                disabled={comment.length === 0}
                className="flex items-center justify-center flex-1 p-2 text-sm transition-colors border-transparent rounded-md bg-brand-500 hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transitions-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-brand-500"
                >
                Enviar feedback
                </button>
            </footer>
       </form>
    </>
    )
}