import html2canvas from "html2canvas";
import { Camera, Trash } from "phosphor-react";
import { useState } from "react";
import { Loading } from "../Loading";

interface ScreenshotButtonProps {
    screenshot: string | null;
    onScreenshotTook: (screenshot: string) => void;
}

export function ScreenshotButton({screenshot,onScreenshotTook}: ScreenshotButtonProps) {
    const [isTakenScreenshot, setIsTakenScreenshot] = useState(false);
    

    async function handleTakeScreenshot() {
        setIsTakenScreenshot(true);
        console.log("Taking screenshot");
        const canvas = await html2canvas(document.querySelector('html')!);
        const base64image = canvas.toDataURL("image/png");

        console.log(base64image);
        onScreenshotTook(base64image);
        setIsTakenScreenshot(false);
    }
    if(screenshot){
        return(
            <button
            type="button"
            onClick={() => onScreenshotTook(null)}
            className="flex items-end justify-end w-10 p-1 transition-colors border-transparent rounded-md h10 text-zinc-400 hover:text-zinc-100"
            style={{
                backgroundImage: `url(${screenshot})`,
                backgroundPosition: 'right bottom',
                backgroundSize: 180,
            }}
            >
                <Trash weight="fill" />
            </button>
        )
    }
    return (
        <button
        onClick={handleTakeScreenshot}
        type="button"
        className="p-2 transition-colors border-transparent rounded-md bg-zinc-800 hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500"
        >
            {isTakenScreenshot ? <Loading /> : <Camera className="w-6 h-6"/>}
        </button>
    )
}