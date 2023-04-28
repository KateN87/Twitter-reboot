import { Searchbar } from "../components/Searchbar"
import { useState } from "react"
import { ViewTweet } from "../components/ViewTweets"

const Search = () => {

   return (
      <>
         <Searchbar />
         <ViewTweet />
      </>
   )
}

export default Search