"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";

interface ListItemProps {
    image: string;
    name: string;
    href: string;
}

export const ListItem:React.FC<ListItemProps> = ({
    image,
    name,
    href
}) => {
    const router = useRouter();
    
    const onClick = () => {
        //Add autnentication before push
        router.push(href);
    }

    return(
        <>
            <button className="relative group flex items-center rounded-md overflow-hidden gap-x-4 bg-neutral-100/10 pr-4 transition hover:bg-neutral-100/20"
            onClick={onClick}>
                <div className="relative min-h-[64px] min-w-[64px]">
                    <Image className="object-cover"
                    fill
                    src={image}
                    alt="Heart"/>
                </div>
                <p className="font-medium truncate py-5">   
                    {name}
                </p>
                <div className="absolute transition opacity-0 rounded-full flex items-center justify-center bg-green-500 p-4 drop-shadow-md right-5 group-hover:opacity-100 hover:scale-110">
                    <FaPlay className="text-black"/>
                </div>
            </button>
        </>
    )
}