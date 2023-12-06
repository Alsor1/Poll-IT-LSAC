import React from 'react'

//Import CSS
import './footer.css'

//Importare imagini
import insta from "../../assets/instagram.png"
import meta from "../../assets/facebook.png"
import twitch from "../../assets/twitch.png"

export default function Footer() {
  return (
    <div className="footer-style">
        <img src={insta} alt="instagram" className='footer-img' onClick={()=>window.location.replace('https://www.instagram.com/lsacbucuresti/?hl=en')}/>
        <img src={meta} alt="meta" className='footer-img'onClick={()=>window.location.replace("https://www.facebook.com/LsacBucuresti/")}/>
        <img src={twitch} alt="twitch" className='footer-img' onClick={()=>window.location.replace("https://www.twitch.tv/lsac_bucuresti")}/>
    </div>
  )
}
