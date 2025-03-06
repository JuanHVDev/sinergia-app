"use client";
import { Button } from "@/components/ui/button";
import EmojiPicker from "emoji-picker-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { Input } from "../ui/input";

interface CoverComponentProps {
    cover: string | File;
    icon: string;
    setCover: (cover: string | File) => void;
    setIcon: (icon: string) => void;
}

function CoverComponent({
    cover,
    icon,
    setCover,
    setIcon,
}: CoverComponentProps) {
    const [coverPreview, setCoverPreview] = useState(cover);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const emojiRef = useRef<HTMLImageElement | null>(null);
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            if (!e.target?.result) return;
            const url = e.target.result as string;
            setCoverPreview(url);
            setCover(file);
        };
        reader.readAsDataURL(file);
    };
    const onEmojiClick = (data: { imageUrl: string }) => {
        setShowEmojiPicker(false);
        const newIcon = data.imageUrl;
        setIcon(newIcon);
    };
    return (
        <div className="h-48 rounded mx-10 relative group">
            <Image
                fill
                src={coverPreview as string}
                alt="Cover preview"
                className="object-cover rounded group-hover:brightness-75"
            />
            <div className="absolute inset-0 flex justify-end items-end p-5">
                <Button type="button" onClick={() => inputRef.current?.click()}>
                    Cambiar imagen de portada
                </Button>
                <Input
                    type="file"
                    accept="image/*"
                    ref={inputRef}
                    className="hidden"
                    onChange={handleFileChange}
                />
            </div>
            {showEmojiPicker && (
                <>
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-10"
                        onClick={() => setShowEmojiPicker(false)}
                    ></div>
                    <div
                        className="absolute z-20"
                        style={{
                            top: emojiRef.current
                                ? emojiRef.current.offsetTop +
                                  emojiRef.current.offsetHeight +
                                  42
                                : 0,
                            left: emojiRef.current
                                ? emojiRef.current.offsetLeft
                                : 0,
                        }}
                    >
                        <EmojiPicker onEmojiClick={onEmojiClick} />
                    </div>
                </>
            )}
            <Image
                src={icon}
                alt="Emoji"
                width={60}
                height={60}
                ref={emojiRef}
                className="absolute left-0 bottom-0 translate-y-1/2 cursor-pointer"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            />
        </div>
    );
}

export default CoverComponent;
