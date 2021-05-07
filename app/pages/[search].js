import { useRouter } from 'next/router'
import Link from 'next/link'
import Chapter from '../components/chapter'
 

function SearchResults() {
    const router = useRouter()
    const { search } = router.query
    
    let book;
    let chapter;

    if(search){
        let tokens = search.split('+');
        book = tokens[0];
        chapter = tokens[tokens.length - 1];
        
        if(isNaN(chapter)){
            book += ' ' + chapter;
            chapter = undefined;
        }
        
    }

    return (
      <div>
        <Chapter book={book} chapter={chapter}></Chapter>
      </div>
    )
  }
  

export default SearchResults