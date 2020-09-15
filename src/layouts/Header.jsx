import React from 'react'
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom'

const Header = () => {
	return (
		<header>
		  <section>
		  	<Link to="/"><Navbar.Brand >Vigilancia Entomológica Comunitaria</Navbar.Brand></Link>
			<figure>
			  <img src="./logo-upch.png" alt="logo upch"/>
			</figure>
			<figure>
			  <img src="./logo-gerencia-aqp.png" alt="logo gerencia aqp"/>
			</figure>
		  </section>
		  <section>
		  	<Nav>
	          <Link to="#">Inicio</Link>
	          <Link to="#">Reportar chirimacha</Link>
		      <Link to="#">Conoce más sobre las chirimachas</Link>
		      <Link to="#">Agentes comunitarios virtuales</Link>
		    </Nav>
		  </section>
		</header>
	)
}

export default Header