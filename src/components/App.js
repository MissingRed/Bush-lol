import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from '../Pages/Home'
import Campeones from '../Pages/Campeones'
import Lista from '../Pages/Lista'
import Bienvenida from '../Pages/Bienvenida'
import Login from '../Pages/Login'
import Register from '../Pages/Register'

const App = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/register" component={Register} />
				<Route exact path="/welcome" component={Bienvenida} />
				<Route exact path="/champions" component={Lista} />
				<Route exact path="/champions/:campeon" component={Campeones} />
			</Switch>
		</BrowserRouter>
	)
}

export default App
