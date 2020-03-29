import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from '../Pages/Home'
import Campeones from '../Pages/Campeones'
import Lista from '../Pages/Lista'

const App = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/champions" component={Lista} />
				<Route exact path="/champions/:campeon" component={Campeones} />
			</Switch>
		</BrowserRouter>
	)
}

export default App
