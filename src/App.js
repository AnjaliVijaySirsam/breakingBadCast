import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Header from './components/ui/Header'
import CharacterGrid from './components/characters/CharacterGrid'
import Search from './components/ui/Search'
import './App.css'
import Pagination from './components/Pagination'
// 
const App = () => {
  const [profile, setProfile] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1);
  const [profilePerPage] = useState(8);
  const [query, setQuery] = useState('')

  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true)
      const result = await axios(`https://www.breakingbadapi.com/api/characters?name=${query}`)

      console.log(result.data)

      setProfile(result.data)
      setIsLoading(false)
    }

    fetchItems()
  }, [query])
  
  const queryFunction = (q) =>{
    setQuery(q)
  }
  // Get current posts
  const indexOfLastProfile = currentPage * profilePerPage;
  const indexOfFirstProfile = indexOfLastProfile - profilePerPage;
  const currentProfile = profile.slice(indexOfFirstProfile, indexOfLastProfile);


  const paginate=(pageNumber) =>{
    setCurrentPage(pageNumber)
  }
  return (
    <div className='container'>
      <Header />
      <Search getQuery={queryFunction} />
      <CharacterGrid isLoading={isLoading} items={currentProfile} />
      <Pagination profilePerPage={profilePerPage} totalProfile={profile.length} paginatee={paginate}/>
    </div>
  )
}

export default App