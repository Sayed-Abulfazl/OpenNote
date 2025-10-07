import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/mongoose";
import NoteModal from "../../../models/NoteModal";



// Get Method
export async function GET(){
    try{
        await connectDB();
        const notes = await NoteModal.find().sort({ createdAt : -1 });

        if(!notes || notes.length === 0){
            return NextResponse.json(
                { message : 'Not Any Note' }, { status : 200 }
            )
        }

        return NextResponse.json(notes);
    }
    catch(err){
        console.error('------------------------- Can Not Connected To DataBase', err);
        return NextResponse.json(
            {error : "Error in connection to DataBase !"}, { status : 500 }
        )
    }
}


// post method
export async function POST(req:Request){
    try{
        await connectDB();
        const content = await req.json();
        const newNote = await NoteModal.create(content);
        return NextResponse.json(newNote);
    }
    catch(err){
        console.error("------------------------- Can Not Connected To DataBase", err);
        return NextResponse.json(
            { error: 'Error in connection to DataBase !' }, { status : 500 }
        );
    }
}