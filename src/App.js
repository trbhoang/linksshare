import { HashRouter as Router, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";

import "semantic-ui-css/semantic.min.css";
import "./styles/App.css";

import { AuthProvider } from "./context/auth";
import MenuBar from "./components/MenuBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SingleLink from "./pages/SingleLink";
import Tag from "./pages/Tag";
import CreateTag from "./pages/CreateTag";

import AuthRoute from "./utils/AuthRoute";

function App() {
	return (
		<AuthProvider>
			<Router>
				<Container>
					<MenuBar />
					<Route exact path="/" component={Home} />
					<AuthRoute exact path="/login" component={Login} />
					<AuthRoute exact path="/register" component={Register} />
					<AuthRoute exact path="/logout" component={Home} />
					<Route exact path="/tags" component={CreateTag} />
					<Route exact path="/links/:linkId" component={SingleLink} />
					<Route exact path="/tags/:tagId" component={Tag} />
				</Container>
			</Router>
		</AuthProvider>
	);
}

export default App;
