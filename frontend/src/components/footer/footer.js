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
        <img src={insta} alt="instagram" />
        <img src={meta} alt="meta" />
        <img src={twitch} alt="twitch" />
    </div>
  )
}
