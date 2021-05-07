import { useRouter } from 'next/router'
import Link from 'next/link'
import Chapter from '../components/chapter'
 

function SearchResults() {
    const router = useRouter()
    const { search } = router.query
    
    let book;
    let chapter;

    if(search){
        if(search.trim().includes(' ')){
            let tokens = search.split(' ');
            book = tokens.slice(0, tokens.length - 1).join(' ');
            chapter = tokens[tokens.length - 1];
            
            if(isNaN(chapter)){
                book += ' ' + chapter;
                chapter = undefined;
            }
        }
        else{
            book = search;
        }
    }

    return (
      <div>
        <Chapter book={book} chapter={chapter}></Chapter>
      </div>
    )
  }
  

export default SearchResults