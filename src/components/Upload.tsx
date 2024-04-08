'use client';

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ParsePdf } from "@/app/action";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";



export default function Upload() {
    const [selectedFile, setSelectedFile] = useState();

    const handleFileChange = (e: any) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleFileUpload = async (e: any) => {
        e.preventDefault();
        console.log('submitted')
        if (selectedFile) {
            const data = await ParsePdf(selectedFile);
            // console.log("data",data );
            // const loader = new PDFLoader(selectedFile);

        }
    };

    return (
        <div>
            <form onSubmit={handleFileUpload}>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="picture">Picture</Label>
                    <Input id="picture" type="file" onChange={handleFileChange} />
                </div>
                <Button type="submit" className="my-5">Upload</Button>
            </form>
        </div>
    );
}