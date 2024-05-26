import Navbar from '../../components/Navbar/Navbar'
import { getProperties } from '../../redux/Action/action'
import PropertyCard from '../../components/PropertyCard'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
export default function BuyerHome() {
  const [props,setProps] = useState([])
  useEffect(()=>{
    const propertiesQuery = async () =>{
      const resp = await getProperties()
      setProps(resp)
    }
    if(!props) propertiesQuery()
    
  },[props])
  console.log(props)
  return (
    <div>
      <PropertyCard properties={props}/>
    </div>
  )
}
