import {getStore} from '../data/database'
import React, { useState, useEffect } from "react"
import Link from 'next/link'

const Chapter = ({book, chapter}) => {

    const store = getStore();
    const [verses, setVerses] = useState(null);
    const [links, setLinks] = useState(null);

    let next = null;
    let previous = null;

    useEffect(() => {
        async function initialize(){
            await store.ready;
            
            const worker = store.worker;
            
            let results = await worker.db.query(`SELECT * FROM verses WHERE book = ? AND chapter = ?`, [book, chapter]);

            if(results.length > 0){
                setVerses(results);
            }
            else{
                setVerses(null);
            }
            
            results = await worker.db.query(`SELECT * FROM chapters WHERE name = ? AND number = ?`, [book, chapter]);

            if(results.length > 0){
                next = results[0].next;
                previous = results[0].previous;
                console.log(next, previous)
            }
        }

        initialize();
    }, []);

    if(verses == null){
        return(
            <h3></h3>
        ) 
    }

    return(
        <div>
            <h3>Chapter {chapter}</h3>
            <p>
                {verses.map((verse) => (
                    <span key={`${verse.slug}-${verse.chapter}-${verse.verse}`}>
                       {verse.text}&nbsp;
                    </span>
                ))}
            </p>
            <p>

                <Link href={`/${next}`}>
                    <a>{next}</a>
                </Link>
            </p>
            
        </div>
        
    )
}

export default Chapter;