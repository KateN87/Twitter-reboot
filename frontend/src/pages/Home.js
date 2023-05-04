import { Header } from '../components/Header';
import { ViewTweet } from '../components/ViewTweets';
import Searchbar from '../components/Searchbar';
import { RegisterLoginDialogue } from '../components/RegisterLoginDialogue';
import CreateTweet from '../components/CreateTweet';

export default function Home({ setId, id }) {
   const user = JSON.parse(localStorage.getItem('user'));
   // Lägg till isloading för att vänta på user


   return (
      <>
         <div className='middle-main-container'>
            {user && <CreateTweet />}

            <ViewTweet setId={setId} id={id} />
         </div>
         <div className='right-main-container'>
            <Searchbar />
            {!user && <RegisterLoginDialogue />}
         </div>
      </>
   );
}
